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
    writeResponse(res, getRandomFlavorText(all));
})
app.get('/gvg', function (req, res) {
    writeResponse(res, getRandomFlavorText(gvg));
})
app.get('/naxx', function (req, res) {
    writeResponse(res, getRandomFlavorText(naxx));
})
app.get('/brm', function (req, res) {
    writeResponse(res, getRandomFlavorText(brm));
})
app.get('/tgt', function (req, res) {
    writeResponse(res, getRandomFlavorText(tgt));
})
app.get('/classic', function (req, res) {
    writeResponse(res, getRandomFlavorText(classic));
})

app.get('/utftest', function (req, res) {
  for(var i in all){
    if(all[i].name == "Mekgineer Thermaplugg")
      writeResponse(res, getFlavorTextFor(i));
  }
})

app.get('/*', function (req, res) {
  var index = parseInt(req.url.split("/").join(""));
  writeResponse(res, getFlavorTextFor(index));
})

function getFlavorTextFor(index){
  var card = all[index];
  if(!card)
    return "Card does not exist (index: " + index + ")";
  if(!card.flavor)
    return "Card does not have flavor text :( (card:" + card.name + ")";
  var cardText = formatText(card.flavor);
  return cardText;
}

function writeResponse(res, text){
  res.set("Content-Type", "application/json; charset=utf-8")
  res.write(text);
  res.end();
}
var port = process.env.PORT || 3000;


var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)

})

function formatText(text){
  return text.split("\\").join("").split("\"").join("");
}

function getRandomFlavorText(list){
  var index = getRandomInt(0, list.length);
  var randomCard = list[index];
  if(!randomCard){
    console.log(index);
    console.log(list);
    return "ERROR!";
  }
  if(randomCard.flavor)
    return formatText(randomCard.flavor);
  else
    return getRandomFlavorText(list);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
