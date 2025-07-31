import multer, { Multer, diskStorage } from "multer";
import fs from 'fs';

const storage = diskStorage({

  destination: function (req: any, file: any, cb: any) {
    const pathStorage = `${process.cwd()}/src/storage/tmp`;

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

const uploadVoucherMiddleware: Multer = multer({ storage });

export { uploadVoucherMiddleware };