import Sequelize, { Model } from 'sequelize';
// nome, e-mail e senha
class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING
            },
            { sequelize }
        );
    }
}

export default new User();
