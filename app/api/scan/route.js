import formidable from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';

// This sets the config for form-data parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'File upload error' });
        return;
      }

      const file = files.pdf;

      // Read the uploaded file
      const fileData = fs.readFileSync(file.filepath);

      // Parse the PDF and extract text
      try {
        const pdfData = await pdfParse(fileData);
        const text = pdfData.text;
        res.status(200).json({ text });
      } catch (error) {
        res.status(500).json({ error: 'Error parsing PDF' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
