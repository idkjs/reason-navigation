'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Match$ReasonNavigation = require("./Match.bs.js");

function Route(Props) {
  var history = Props.history;
  var path = Props.path;
  var render = Props.render;
  React.useEffect((function () {
          var match = Match$ReasonNavigation.matchPath(history.state.path, path);
          if (match !== undefined) {
            var match$1 = Match$ReasonNavigation.parseUrl(match[1]);
            Curry._3(history.actions.updateMatch, match$1.search, match$1.hash, match$1.params);
          }
          
        }), []);
  var match = Match$ReasonNavigation.matchPath(history.state.path, path);
  if (match !== undefined) {
    return Curry._1(render, undefined);
  } else {
    return null;
  }
}

var make = Route;

exports.make = make;
/* react Not a pure module */
