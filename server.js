const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/get_url', async (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL) {
    return res.status(400).json({ error: 'Missing video URL' });
  }

  const info = await ytdl.getInfo(videoURL);
  let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

  ytdl.downloadFromInfo(info, { filter: 'audioonly' }).pipe(res);
})

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});