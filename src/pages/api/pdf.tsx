import {NextApiRequest, NextApiResponse} from "next";
import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";
import {resumeTemplate} from "@/apiHelpers/resumeTemplate";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

const generatePdf = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const html = resumeTemplate(req.body.data);
    const paymentIntent_id = req.body.paymentIntent_id;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntent_id);
    const status = paymentIntent.status;

    if (status === "succeeded") {
      const browser = await puppeteer.launch({
        args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
      });
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
    } else {

    }
  } catch (err) {
    res.status(500).json({message: err});
  }
};

export default generatePdf;