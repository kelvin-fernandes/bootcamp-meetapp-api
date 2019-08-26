import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';

class SubscriptionController {
    async store(req, res) {
        const { id } = req.params;

        const meetup = await Meetup.findByPk(id);

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

        // TODO Sempre que um usuário se inscrever no meetup, envie um e-mail ao
        // organizador contendo os dados relacionados ao usuário inscrito. O
        // template do e-mail fica por sua conta :)

        return res.json(subscription);
    }
}

export default new SubscriptionController();
