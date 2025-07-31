import multer, { Multer, diskStorage } from "multer";
import fs from 'fs';

const storage = diskStorage({

  destination: function (req: any, file: any, cb: any) {
    const pathStorage = `${process.cwd()}/src/storage/temp`;

    if (!fs.existsSync(pathStorage)) {
      fs.mkdirSync(pathStorage, { recursive: true });
    }

    cb(null, pathStorage);

  },

  filename: function (req: any, file: any, cb: any) {

    const ext = file.originalname.split(".").pop();

    const filename = `file-${Date.now()}.${ext}`;

    cb(null, filename);

  },

});

const uploadTemporalMiddleware: Multer = multer({ storage });

export { uploadTemporalMiddleware };