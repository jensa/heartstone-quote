var express = require('express')
var fs = require('fs');
var app = express()
app.use(express.static(__dirname + '/'));
var allcards = {};
var gvg = {};
var naxx = {};
var brm = {};
var tgt = {};
var classic = {};
var all = {};

fs.readFile('./AllSets.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    allsets = JSON.parse(data);
    gvg = allsets["Goblins vs Gnomes"];
    naxx = allsets["Curse of Naxxramas"];
    brm = allsets["Blackrock Mountain"];
    tgt = allsets["The Grand Tournament"];
    classic = allsets["Classic"];
    all = classic.concat(gvg).concat(naxx).concat(brm).concat(tgt);
    console.log("parsed AllSets.json");
});

app.get('/', function (req, res) {
    res.write(getRandomFlavorText(all));
    res.end();
})
app.get('/gvg', function (req, res) {
  res.write(getRandomFlavorText(gvg));
  res.end();
})
app.get('/naxx', function (req, res) {
  res.write(getRandomFlavorText(naxx));
  res.end();
})
app.get('/brm', function (req, res) {
  res.write(getRandomFlavorText(brm));
  res.end();
})
app.get('/tgt', function (req, res) {
  res.write(getRandomFlavorText(tgt));
  res.end();
})
app.get('/classic', function (req, res) {
  res.write(getRandomFlavorText(classic));
  res.end();
})
var port = process.env.PORT || 3000;


var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)

})

function getRandomFlavorText(list){
  var index = getRandomInt(0, list.length);
  var randomCard = list[index];
  if(!randomCard){
    console.log(index);
    console.log(list);
    return "ERROR!";
  }
  if(randomCard.flavor)
    return randomCard.flavor.split("\\").join("").split("\"").join("");
  else
    return getRandomFlavorText(list);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
