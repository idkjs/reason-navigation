'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var ReasonReact = require("reason-react/src/legacy/ReasonReact.bs.js");

var component = ReasonReact.statelessComponent("Link");

function make(history, href, targetOpt, style, children) {
  var target = targetOpt !== undefined ? targetOpt : "";
  return {
          debugName: component.debugName,
          reactClassInternal: component.reactClassInternal,
          handedOffState: component.handedOffState,
          willReceiveProps: component.willReceiveProps,
          didMount: component.didMount,
          didUpdate: component.didUpdate,
          willUnmount: component.willUnmount,
          willUpdate: component.willUpdate,
          shouldUpdate: component.shouldUpdate,
          render: (function (_self) {
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
            }),
          initialState: component.initialState,
          retainedProps: component.retainedProps,
          reducer: component.reducer,
          jsElementWrapped: component.jsElementWrapped
        };
}

exports.make = make;
/* component Not a pure module */
