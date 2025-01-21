import {NextApiRequest, NextApiResponse} from "next";
import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";
import {resumeTemplate} from "@/apiHelpers/resumeTemplate";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

const generatePdf = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const paymentIntent_id = req.body.paymentIntent_id;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntent_id);
    const status = paymentIntent.status;
    const isUsed = paymentIntent.metadata.is_used;

    if (status === "succeeded" && isUsed === "false") {
      const pdfResponse = await fetch("http://api.cvshortcut.com/v1/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({data: req.body.data, email: req.body.email, secret: process.env.API_KEY})
      });

      await stripe.paymentIntents.update(paymentIntent_id, {
        metadata: {
          is_used: "true",
        }
      });

      const pdfBuffer = await pdfResponse.arrayBuffer();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
      res.end(Buffer.from(pdfBuffer));
    } else if (isUsed === "true") {
      res.status(401).json({message: "This payment has already been used."});
    }
  } catch (err) {
    res.status(500).json({message: err});
  }
};

export default generatePdf;
