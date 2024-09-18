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

      if (userInputtedDiscount === realDiscount) {
        // res.status(200).json({validDiscount: true});
        const pdfResponse = await fetch("http://api.cvshortcut.com/v1/pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({data: req.body.data})
        });

        const pdfBuffer = await pdfResponse.arrayBuffer();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
        res.end(Buffer.from(pdfBuffer));
      }
    } else {
      res.status(401).json({validDiscount: false});
    }
  } catch (err) {
    res.status(500).json({error: err});
  }
};

export default handler;