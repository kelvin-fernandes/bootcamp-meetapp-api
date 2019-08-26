import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';

class MeetupController {
    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            locale: Yup.string().required(),
            date: Yup.date().required(),
            image_id: Yup.number().required()
        });

        await schema.validate(req.body).catch(err => {
            return res.status(400).json({
                error: err.errors ? err.errors[0] : 'Validation failed'
            });
        });

        const { title, description, locale, date, image_id } = req.body;

        const dateIsBeforeToday = isBefore(parseISO(req.body.date), new Date());

        if (dateIsBeforeToday) {
            return res
                .status(400)
                .json({ error: 'Meetup date cannot be earlier than today' });
        }

        const meetup = await Meetup.create({
            title,
            description,
            locale,
            date,
            image_id,
            user_id: req.userId
        });

        return res.json(meetup);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            description: Yup.string(),
            locale: Yup.string(),
            date: Yup.date(),
            image_id: Yup.number()
        });

        await schema.validate(req.body).catch(err => {
            return res.status(400).json({
                error: err.errors ? err.errors[0] : 'Validation failed'
            });
        });

        const meetup = await Meetup.findByPk(req.params.id);

        if (!meetup) {
            return res
                .status(404)
                .json({ error: 'There is no meetup with id informed' });
        }

        if (req.userId !== meetup.user_id) {
            return res
                .status(401)
                .json({ error: 'You are not the meetup organizer' });
        }

        const meetupHasOccured = isBefore(meetup.date, new Date());

        if (meetupHasOccured) {
            return res
                .status(401)
                .json({ error: 'You cannot edit a meetup that has occured' });
        }

        const {
            id,
            title,
            description,
            locale,
            date,
            image_id
        } = await meetup.update(req.body);

        return res.json({
            id,
            title,
            description,
            locale,
            date,
            image_id
        });
    }
}

export default new MeetupController();
