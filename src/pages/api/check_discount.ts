import {NextApiRequest, NextApiResponse} from "next";
import generateDiscountCode from "@/apiHelpers/generateDiscountCode";
import puppeteer from "puppeteer-core";
import {resumeTemplate} from "@/apiHelpers/resumeTemplate";
import chromium from "chrome-aws-lambda";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const userInputtedDiscount = req.body.discountCode;
      const realDiscount = await generateDiscountCode();
      const html = resumeTemplate(req.body.data);

      if (userInputtedDiscount === realDiscount) {
        // res.status(200).json({validDiscount: true});
        const browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath,
          headless: true,
        });
        const page = await browser.newPage();

        await page.setContent(html);

        const pdfBuffer = await page.pdf({
          format: "a4",
          margin: {top: "0", left: "0", bottom: "0", right: "0"},
          printBackground: true,
        });

        await browser.close();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
        res.end(pdfBuffer);
      }
    } else {
      res.status(401).json({validDiscount: false});
    }
  } catch (err) {
    res.status(500).json({error: err});
  }
};

export default handler;