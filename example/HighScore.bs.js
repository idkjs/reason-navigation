'use strict';

var React = require("react");

function HighScore(Props) {
  var history = Props.history;
  console.log(history);
  return React.createElement("div", undefined, "HighScore");
}

var make = HighScore;

exports.make = make;
/* react Not a pure module */
