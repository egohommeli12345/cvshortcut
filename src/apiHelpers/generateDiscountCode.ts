import {createHmac} from "crypto";

const generateDiscountCode = async () => {
  const date = new Date().getUTCHours();
  const secret = process.env.DISCOUNT_SECRET || '';

  // Create HMAC using the SHA-256 algorithm
  const hmac = createHmac('sha256', secret);

  // Update the HMAC with the current date (converted to string)
  hmac.update(date.toString());

  // Finalize the HMAC and get the hex-encoded result
  return hmac.digest('hex');
};

export default generateDiscountCode;