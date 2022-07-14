/* global tracery */

import express from "express";
import bodyParser from "body-parser";
import tracery from "tracery-grammar";
import Brogue from "brogue";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const brogue = new Brogue();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
var port = process.env.PORT || 3000;

let sentenceCount = 1

const adverb = [
  "drier",
  "moister",
  "rougher",
  "wetter",
  "tougher",
  "weaker",
  "deader"
];

const verbs = [
  "fuck",
  "eat",
  "coach",
  "juggle",
  "kick",
];

const state = [
  "dead",
  "live",
  "upside-down"
];

const noun = [
 "dingo",
 "dog",
 "dolphin",
 "spider",
 "cat",
 "possum",
 "whale",
 "shark",
 "kangaroo",
 "wombat"
];

const noun2 = [
  "donger",
  "leg",
  "arm",
  "tongue",
  "tail",
  "head",
];

const noun3 = [
  "sauce bottle",
  "lollypop",
  "stubbies",
  "soda waters",
  "tinnies",
  "UDLs"
]

const gear = [
  "laughing",
  "crying",
  "dancing",
  "rogering",
]

const sentences = [
  "{adverb.capitalize} than {state.a} {noun.possessive} {noun2}",
  "Didn't come here to {verbs} {noun.s}",
  "Wrap your {gear} gear 'round that.",
  "A few {noun3.s} short of a six-pack",
  "Tell him he's {gear}",
  "Fair go, mate. Fair suck of the {noun3}",
  "It's a fuckin' {noun.possessive} breakfast"
]

function generate() {

  // This is the Tracery grammar.
  let slanger = {
    adverb: adverb,
    verbs: verbs,
    state: state,
    noun: noun,
    noun2: noun2,
    noun3: noun3,
    gear: gear,
    origin: sentences
  };

    brogue.parseGrammar(slanger);
  const results = brogue.expand('<h2>{origin}</h2>');
  console.log(results);
  return results; 
}

app.disable("etag");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/", function(req, res) {
  var results = generate();
  res.send(results);
});

// listen for requests :)
var listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

