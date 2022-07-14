import express from "express";
import bodyParser from "body-parser";
import Brogue from "brogue";
import jsonfile from "jsonfile";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const brogue = new Brogue();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
var port = process.env.PORT || 3000;

var slanger = jsonfile.readFileSync(__dirname + '/data/slang.json');

function generate() {
  brogue.parseGrammar(slanger);
  const results = brogue.expand('<h2>{origin}</h2>');
  return results; 
}

app.disable("etag");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/", function(req, res) {
  res.send(generate());
});

var listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
