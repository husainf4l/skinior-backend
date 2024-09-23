// src/config/multer.config.ts
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export const multerConfig = {
    storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => {
            const filename: string =
                uuidv4() + extname(file.originalname);
            cb(null, filename);
        },
    }),
};
