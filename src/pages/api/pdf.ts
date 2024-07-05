import {NextApiRequest, NextApiResponse} from "next";

const generatePdf = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200)
    .json({
      message: "Api endpoint reached.",
      message1: "Api endpoint reached."
    })
}

export default generatePdf;