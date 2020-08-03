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
        ${$('style',response.body)}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#191919">
        <meta name="msapplication-TileColor" content="#191919">
        <meta name="theme-color" content="#ffffff">
        <link rel="stylesheet" href="res/styles/dark.css">
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
        <script type="text/javascript" src="https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--javascript/init.combined.js"></script>
      </head>
      <body>
        <div id="main-content">
          ${$('#main-content',response.body).html()}
        </div>
        <script src="viewerscripts.js"></script>
      </body>
      </html>
      `;
      // Remove any broken styles that import
      content = content.replace("@import url(\"https://nu-scptheme.github.io/","");
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