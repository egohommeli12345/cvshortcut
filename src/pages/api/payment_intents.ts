import {NextApiRequest, NextApiResponse} from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "POST") {
    try {

      // Amount and currency set default on server side
      // Later currency could be set client side

      const {} = req.body;

      /*if (!amount || !currency) {
        return res.status(400).json({
          error: "Missing required params: amount" +
            " or currency"
        });
      }*/


      const payment_intent = await stripe.paymentIntents.create({
        amount: 229,
        currency: "eur",
        automatic_payment_methods: {enabled: true},
      });

      res.status(200).json({client_secret: payment_intent.client_secret});

    } catch (err) {
      console.log(err);
      res.status(500).json({error: err});
    }
  } else {
    // Handle unsupported HTTP methods with a 405 status
    res.status(405).json({message: "Method not allowed"});
  }
}