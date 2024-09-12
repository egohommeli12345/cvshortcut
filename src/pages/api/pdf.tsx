import {NextApiRequest, NextApiResponse} from "next";
import puppeteer from "puppeteer";
import {Inter} from "next/font/google";
import {resumeTemplate} from "@/apiHelpers/resumeTemplate";

const inter = Inter({subsets: ["latin"]});

const generatePdf = async (req: NextApiRequest, res: NextApiResponse) => {
  const html = resumeTemplate(req.body);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {top: "0", left: "0", bottom: "0", right: "0"},
    printBackground: true,
  });

  await browser.close();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
  res.end(pdfBuffer);
  // res.send(html);
};

export default generatePdf;