import * as Yup from 'yup';
import { startOfDay, endOfDay, isBefore, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
    async index(req, res) {
        const { date, page } = req.query;

        const where = {};

        if (date) {
            const searchDate = parseISO(date);

            where.date = {
                [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
            };
        }

        const meetups = await Meetup.findAll({
            where,
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email']
                }
            ],
            limit: 10,
            offset: (page - 1) * 10
        });

        return res.json(meetups);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            date: Yup.date().required(),
            image_id: Yup.number().required()
        });

        await schema.validate(req.body).catch(err => {
            return res.status(400).json({
                error: err.errors ? err.errors[0] : 'Validation failed'
            });
        });

        const { title, description, location, date, image_id } = req.body;

        const dateIsBeforeToday = isBefore(parseISO(req.body.date), new Date());

        if (dateIsBeforeToday) {
            return res
                .status(400)
                .json({ error: 'Meetup date cannot be earlier than today' });
        }

        const meetup = await Meetup.create({
            title,
            description,
            location,
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
            location: Yup.string(),
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
            location,
            date,
            image_id
        } = await meetup.update(req.body);

        return res.json({
            id,
            title,
            description,
            location,
            date,
            image_id
        });
    }

    async delete(req, res) {
        const meetup = await Meetup.findByPk(req.params.id);

        if (!meetup) {
            return res
                .status(404)
                .json({ error: 'There is no meetup with id informed' });
        }

        if (req.userId !== meetup.user_id) {
            return res.status(401).json({
                error: 'You cannot cancel a meetup that is not yours'
            });
        }

        const meetupHasOccured = isBefore(meetup.date, new Date());

        if (meetupHasOccured) {
            return res
                .status(401)
                .json({ error: 'You cannot cancel a meetup that has occured' });
        }

        await meetup.destroy();

        return res.json({ message: 'Meetup was deleted' });
    }
}

export default new MeetupController();
