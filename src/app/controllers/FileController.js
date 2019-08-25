import File from '../models/File';

class FileController {
    async store(req, res) {
        const { originalname: original_name, filename: name } = req.file;

        const file = await File.create({
            name,
            original_name
        });

        return res.json(file);
    }
}

export default new FileController();
