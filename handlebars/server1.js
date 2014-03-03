const
  express = require('express'),
  hbs = require('hbs'),
  app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);
 
app.get('/', function(req, res) {
    res.render('index');
});
 
app.get('/about', function(req, res) {
    res.render('about');
});
 
app.get('/article', function(req, res) {
    res.render('article');
});
 

app.listen(8080);
console.log('listening on port 8080');

