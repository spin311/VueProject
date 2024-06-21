import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Use the CORS middleware
app.use(cors());

app.get('/download', async (req, res) => {
  const { url } = req.query;

  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'arraybuffer'
    });
    const contentType = response.headers['content-type'];
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching image');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});