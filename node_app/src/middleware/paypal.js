import axios from 'axios';

const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

export const getAccessToken = async () => {
  const response = await axios.post(
    `${PAYPAL_BASE_URL}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64')}`
      }
    }
  );
  return response.data.access_token;
};

export const createOrder = async (orderDto) => {
  const accessToken = await getAccessToken();
  console.log('accessToken: ', accessToken);
  const response = await axios.post(
    `${PAYPAL_BASE_URL}/v2/checkout/orders`,
    orderDto,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );
  return response.data;
};