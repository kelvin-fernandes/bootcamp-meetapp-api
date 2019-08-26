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

        const checkDateIsBeforeToday = isBefore(
            parseISO(req.body.date),
            new Date()
        );

        if (checkDateIsBeforeToday) {
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
}

export default new MeetupController();
