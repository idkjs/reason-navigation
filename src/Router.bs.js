'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var CreateBrowserHistory = require("history/createBrowserHistory").default;

function Router(Props) {
  var historyOpt = Props.history;
  var children = Props.children;
  var history = historyOpt !== undefined ? Caml_option.valFromOption(historyOpt) : CreateBrowserHistory();
  var initialState_path = history.location.pathname;
  var initialState_params = {};
  var initialState_unlisten = function () {
    
  };
  var initialState = {
    path: initialState_path,
    search: "",
    hash: "",
    params: initialState_params,
    unlisten: initialState_unlisten
  };
  var match = React.useReducer((function (state, action) {
          if (typeof action === "number") {
            if (action === /* GoBack */0) {
              history.goBack();
              return state;
            }
            history.goForward();
            return state;
          } else {
            switch (action.TAG | 0) {
              case /* Push */0 :
                  history.push(action._0);
                  return state;
              case /* Replace */1 :
                  history.replace(action._0);
                  return state;
              case /* Go */2 :
                  history.go(action._0);
                  return state;
              case /* UpdatePath */3 :
                  return {
                          path: action._0,
                          search: state.search,
                          hash: state.hash,
                          params: state.params,
                          unlisten: state.unlisten
                        };
              case /* UpdateMatch */4 :
                  return {
                          path: state.path,
                          search: action._0,
                          hash: action._1,
                          params: action._2,
                          unlisten: state.unlisten
                        };
              case /* SetUnlisten */5 :
                  return {
                          path: state.path,
                          search: state.search,
                          hash: state.hash,
                          params: state.params,
                          unlisten: action._0
                        };
              
            }
          }
        }), initialState);
  var dispatch = match[1];
  React.useEffect((function () {
          var unsub = history.listen(function ($$location) {
                Curry._1(dispatch, {
                      TAG: /* UpdatePath */3,
                      _0: $$location.pathname
                    });
                
              });
          return (function (param) {
                    return Curry._1(dispatch, {
                                TAG: /* SetUnlisten */5,
                                _0: unsub
                              });
                  });
        }), []);
  return Curry._1(Caml_array.get(children, 0), {
              state: match[0],
              actions: {
                push: (function (path) {
                    return Curry._1(dispatch, {
                                TAG: /* Push */0,
                                _0: path
                              });
                  }),
                replace: (function (path) {
                    return Curry._1(dispatch, {
                                TAG: /* Replace */1,
                                _0: path
                              });
                  }),
                updateMatch: (function (search, hash, params) {
                    return Curry._1(dispatch, {
                                TAG: /* UpdateMatch */4,
                                _0: search,
                                _1: hash,
                                _2: params
                              });
                  })
              }
            });
}

var make = Router;

exports.make = make;
/* react Not a pure module */
