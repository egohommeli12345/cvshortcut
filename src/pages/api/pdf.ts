import { NextApiRequest, NextApiResponse } from "next";

const generatePdf = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pdfResponse = await fetch("https://api-cvshortcut.samulipirnes.com/v1/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: req.body.data,
        email: req.body.email,
        secret: process.env.API_KEY,
      }),
    });

    const pdfBuffer = await pdfResponse.arrayBuffer();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
    res.end(Buffer.from(pdfBuffer));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export default generatePdf;
