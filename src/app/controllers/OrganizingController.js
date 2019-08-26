import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class OrganizingController {
    async index(req, res) {
        const meetups = await Meetup.findAll({
            where: { user_id: req.userId },
            attributes: ['id', 'title', 'description', 'location', 'date'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
                },
                {
                    model: File,
                    as: 'image',
                    attributes: ['id', 'name', 'path']
                }
            ]
        });

        return res.json(meetups);
    }
}

export default new OrganizingController();
