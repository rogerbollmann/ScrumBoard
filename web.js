const
  express = require('express'),
  hbs = require('hbs'),
  taskEngine = require('./tasks'),
  app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());
 
app.get('/', function(req, res) {
  res.render('index',{title:"My Tasks", entries:taskEngine.getTaskEntries()});
});
 
app.get('/about', function(req, res) {
    res.render('about', {title:"About Me"} );
});
 
app.get('/article/:id', function(req, res) {
   var entry = taskEngine.getTaskEntry(req.params.id);
   res.render('article',{title:entry.title, task:entry});
});
 

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});

