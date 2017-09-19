const path = require('path');
const express = require('express');
const proxy = require('express-http-proxy');
const morgan = require('morgan');
const baseImageUrl = process.env.BASE_IMAGE_URL;
const proxyBaseImageUrl = baseImageUrl
  ? proxy(baseImageUrl, {
      proxyReqPathResolver: function (req) {
        const newPath = baseImageUrl + req.path;
        console.log(`Proxying requests from ${req.path} to ${newPath}`);
        return newPath;
      }
    })
  : express.static(path.join(__dirname, 'public/images'));
const app = express();

app.use(morgan('combined'));
app.use('/images', proxyBaseImageUrl);

app.get('/', function (req, res) {
  res.send('<h1>can i haz hug</h1><img src="images/herman.jpg" />')
})

app.listen(8080, () => console.log('Web server running on port 8080'));
