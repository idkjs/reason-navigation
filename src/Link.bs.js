'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function Link(Props) {
  var history = Props.history;
  var href = Props.href;
  var targetOpt = Props.target;
  var style = Props.style;
  var children = Props.children;
  var target = targetOpt !== undefined ? targetOpt : "";
  return React.createElement("a", {
              style: style,
              href: href,
              onClick: (function (ev) {
                  var modified = ev.metaKey || ev.altKey || ev.ctrlKey || ev.shiftKey;
                  var match = ev.button;
                  if (match !== 0) {
                    return ;
                  }
                  if (modified) {
                    return ;
                  }
                  if (target !== "") {
                    return ;
                  }
                  ev.preventDefault();
                  return Curry._1(history.actions.push, href);
                })
            }, children);
}

var make = Link;

exports.make = make;
/* react Not a pure module */
