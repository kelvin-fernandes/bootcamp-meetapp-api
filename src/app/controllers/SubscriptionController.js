import Meetup from '../models/Meetup';
import User from '../models/User';
import Subscription from '../models/Subscription';

import NewSubscriptionMail from '../jobs/NewSubscriptionMail';
import Queue from '../../lib/Queue';

class SubscriptionController {
    async store(req, res) {
        const { id } = req.params;

        const meetup = await Meetup.findByPk(id, {
            include: [
                { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
            ]
        });

        if (!meetup) {
            return res
                .status(404)
                .json({ error: 'There is no meetup with id informed' });
        }

        if (req.userId === meetup.user_id) {
            return res.status(401).json({
                error:
                    'You can subscribe only to meetups that you are not organizer'
            });
        }

        if (meetup.past) {
            return res.status(401).json({
                error: 'You cannot subscribe to meetups that have ocurred'
            });
        }

        const alreadySubscribed = await Subscription.findOne({
            where: { meetup_id: id, user_id: req.userId }
        });

        if (alreadySubscribed) {
            return res.status(401).json({
                error: 'You cannot subscribe twice in the same meetup'
            });
        }

        const meetupInSameDate = await Subscription.findOne({
            where: { user_id: req.userId },
            include: [
                {
                    model: Meetup,
                    as: 'meetup',
                    required: true,
                    where: { date: meetup.date }
                }
            ]
        });

        if (meetupInSameDate) {
            return res.status(401).json({
                error: 'You are subscribed in another meetup in the same date'
            });
        }

        const subscription = await Subscription.create({
            user_id: req.userId,
            meetup_id: id
        });

        const subscriber = await User.findByPk(req.userId, {
            attributes: ['id', 'name', 'email']
        });

        await Queue.add(NewSubscriptionMail.key, { subscriber, meetup });

        return res.json(subscription);
    }
}

export default new SubscriptionController();
