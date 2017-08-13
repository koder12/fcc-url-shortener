var validUrl = require('valid-url');
var express = require('express');
var app = express();
var tungus = require('tungus');
var mongoose = require('mongoose');
var base = require('./base.js');
var webhost = 'http://localhost:3000/';
var sUrl;

mongoose.connect('tingodb://'+__dirname+'/db');
var Url = require('./models/url');

app.get("/", function (req, res) {
  res.json({msg: 'Welcome to my URL shortener microservice!!!'});
});

app.get('/new/*', function(req, res){
  var oUrl = req.params[0];

  if(!validUrl.isUri(oUrl)){
    return res.json({msg: 'Invalid URL!!!'});
  }

  Url.findOne({o_url: oUrl}, function (err, doc){
    if (doc){
      sUrl = webhost + base.encode(doc._id);
      res.send({original_url: oUrl, short_url: sUrl});
    } 
    else {
      var newUrl = Url({
        o_url: oUrl
      });

      newUrl.save(function(err) {
        if (err){
          console.log(err);
        }
        sUrl = webhost + base.encode(newUrl._id);
        res.send({original_url: oUrl, short_url: sUrl});
      });

    }
  });
});

app.get('/:encoded_id', function(req, res){
  var baseId = req.params.encoded_id;
  var id = base.decode(baseId);

  Url.findOne({_id: id}, function (err, doc){
    if (doc) {
      res.redirect(doc.o_url);
    } else {
      res.redirect(webhost);
    }
  });

});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});