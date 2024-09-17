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
      const pdf = await fetch("https://api.cvshortcut.com/v1/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({data: req.body.data})
      });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
      res.end(pdf);
      // res.send(html);
    } else {

    }
  } catch (err) {
    res.status(500).json({message: err});
  }
};

export default generatePdf;