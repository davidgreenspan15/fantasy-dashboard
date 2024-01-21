let express = require('express');

let app = express();
app.use(express.static(__dirname + '/'));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'build' });
  });
}

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `Example app listening at http://localhost:${process.env.PORT || 8080}`
  );
});
