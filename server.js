import express  from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.static('./dist'));
app.use(express.json());
import  {setup, getActiveServer }from  './data/database.js'

const PORT = 3004;

async function createPaymentIntent(request) {
  try {
    const url =
      process.env.HYPERSWITCH_SERVER_URL || 'https://sandbox.hyperswitch.io';
    const apiResponse = await fetch(`${url}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': process.env.HYPERSWITCH_SECRET_KEY,
      },
      body: JSON.stringify(request),
    });

    const paymentIntent = await apiResponse.json();

    if (paymentIntent.error) {
      console.error('Error - ', paymentIntent.error);
      throw new Error(paymentIntent.error.message ?? 'Something went wrong.');
    }

    return paymentIntent;
  } catch (error) {
    console.error('Failed to create payment intent:', error);
    throw new Error(
      error.message ||
        'Unexpected error occurred while creating payment intent.',
    );
  }
}
await setup();
const data = await getActiveServer()
if (data !== undefined){
 console.log(data)
}

// SDK Props
//for mobile gettings
app.get('/sdk-props/get-sdk-props', (req, res) => {});
// for setting and display
app.get('/sdk-props/get-selected-sdk-props', (req, res) => {});

app.post('/sdk-props/save-sdk-props', (req, res) => {});

app.post('/sdk-props/add-sdk-props', (req, res) => {});

app.post('/sdk-props/delete-sdk-props', (req, res) => {});

// Server Props
// For loading server
app.get('/server/load-server', (req, res) => {});
// for setting and display
app.get('/server/get-server-config', (req, res) => {});

app.post('/server/save-server-config', (req, res) => {});

app.post('/server/add-server-config', (req, res) => {});

app.post('/server/delete-server-config', (req, res) => {});

// Environment Config
app.get('/server/load-environment', (req, res) => {});
// for setting and display
app.get('/server/get-environment', (req, res) => {});

app.post('/server/save-environment', (req, res) => {});

app.post('/server/add-environment', (req, res) => {});

app.post('/server/delete-environment', (req, res) => {});

// Git Config
app.get('/server/load-github', (req, res) => {});
// for setting and display
app.get('/server/get-git-config', (req, res) => {});

app.post('/server/save-git-config', (req, res) => {});

app.post('/server/add-git-config', (req, res) => {});

app.post('/server/delete-git-config', (req, res) => {});

app.listen(PORT, () =>
  console.log(`Node server listening at http://localhost:${PORT}`),
);
