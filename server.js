const express = require('express');
var i=0;
const app = express();
app.set('view engine','ejs');
app.get('/',function (req, res) { res.render('index');});
app.use('/css',express.static('css'));
app.use('/img',express.static('img'));
app.use('/js',express.static('js'));
app.listen(8080,function (){console.log("Radim");});
