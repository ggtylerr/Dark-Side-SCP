const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const got = require('got');
const $ = require('cheerio');
const port = 3000;

// Static crap
app.use(express.static('public', {
  extensions: ['html', 'htm']
}));
app.use(cors());

app.get('/', (req, res) => res.sendFile('public/index.html'));

app.get('/v', (req,res) => {
  (async () => {
    try {
      var response = await got("http://www.scp-wiki.net/" + req.query.p);
      // Yes, this is manually editing HTML code in a string.
      // No, I'm not using PHP.
      var content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title id="title">DS SCP - ${$('#page-title',response.body).text()}</title>
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Dark Side SCP">
        <meta property="og:title" content="${$('#page-title',response.body).text()}" />
        <meta property="og:description" content="This OpenGraph embed is WIP, so we aren't able to complete the description. Check out the page." />
        <link rel="stylesheet" href="res/styles/dark.css">
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
      </head>
      <body>
        <div id="main-content">
          ${$('#main-content',response.body).html()}
        </div>
        <script src="collapsibles.js"></script>
        <script src="replacelinks.js"></script>
      </body>
      </html>
      `;
      res.send(content);
    } catch (err) {
      console.error(`An error occurred while querying '${JSON.stringify(req.query)}'`)
      console.error(err.message);
      res.send("An error occurred! Here's the message:\n" + err.message);
    }
  })();
});

app.listen(port, () => {
  console.log('server started \\o/');
});