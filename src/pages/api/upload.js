import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing the files:", err);
        res.status(500).json({ error: 'Error parsing the files' });
        return;
      }

      const file = files.file;

      if (!file) {
        console.error("No file uploaded");
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      const newFilePath = path.join(uploadDir, file.newFilename || file.originalFilename);

      fs.rename(file.filepath, newFilePath, (renameErr) => {
        if (renameErr) {
          console.error("Error moving the file:", renameErr);
          res.status(500).json({ error: 'Error moving the file' });
          return;
        }

        res.status(200).json({ filePath: `/uploads/${file.newFilename || file.originalFilename}` });
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
