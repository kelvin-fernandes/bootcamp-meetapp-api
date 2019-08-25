import Sequelize, { Model } from 'sequelize';

class File extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                original_name: Sequelize.STRING,
                path: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `${process.env.APP_URL}/uploads/${this.name}`;
                    }
                }
            },
            { sequelize }
        );

        return this;
    }
}

export default File;
