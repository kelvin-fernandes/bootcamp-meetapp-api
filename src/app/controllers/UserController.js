import * as Yup from 'yup';

import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .min(4)
                .required()
        });

        if (!schema.isValid(req.body)) {
            return res.status(400).json({ error: 'Validation failed' });
        }

        const userExists = await User.findOne({
            where: { email: req.body.email }
        });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const { id, name, email } = await User.create(req.body);

        return res.json({
            id,
            name,
            email
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string(),
            password: Yup.string()
                .min(4)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            )
        });

        if (!(await schema.isValid(req.body))) {
            schema.validate(req.body).catch(err => {
                return res.status(400).json({
                    error: err.errors ? err.errors[0] : 'Validation failed'
                });
            });
        }

        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email && email !== user.email) {
            const userExists = await User.findOne({
                where: { email: req.body.email }
            });

            if (userExists) {
                return res.status(400).json({ error: 'User already exists' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(400).json({ error: 'Password does not match' });
        }

        const { id, name } = await user.update(req.body);

        return res.json({ id, name, email });
    }
}

export default new UserController();
