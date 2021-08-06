'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$String = require("bs-platform/lib/js/string.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");
var Str$ReasonNavigation = require("./Str.bs.js");

function removeTrailingSlash(url) {
  var lastChar = Caml_string.get(url, Str$ReasonNavigation.someOr(Str$ReasonNavigation.length(url), 1) - 1 | 0);
  if (lastChar !== 47) {
    return url;
  } else {
    return Str$ReasonNavigation.someOr(Str$ReasonNavigation.sub(url, 0, Str$ReasonNavigation.someOr(Str$ReasonNavigation.length(url), 1) - 1 | 0), url);
  }
}

function addLeadingSlash(url) {
  var match = Str$ReasonNavigation.someOr(Str$ReasonNavigation.get(url, 0), "");
  switch (match) {
    case "" :
        return "/";
    case "/" :
        return url;
    default:
      return "/" + url;
  }
}

function hasSearch(url) {
  if ($$String.contains(url, /* ':' */58)) {
    return /* Search */{
            _0: Str$ReasonNavigation.someOr(Str$ReasonNavigation.index(url, /* ':' */58), -1)
          };
  } else {
    return /* NoSearch */0;
  }
}

function hasHash(url) {
  if ($$String.contains(url, /* '#' */35)) {
    return /* Hash */{
            _0: Str$ReasonNavigation.someOr(Str$ReasonNavigation.index(url, /* '#' */35), -1)
          };
  } else {
    return /* NoHash */0;
  }
}

function getInt(params, field) {
  var v = Js_dict.get(params, field);
  if (v === undefined) {
    return ;
  }
  var x;
  try {
    x = Caml_format.caml_int_of_string(v);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Failure") {
      return ;
    }
    throw exn;
  }
  return x;
}

function getString(params, field) {
  var v = Js_dict.get(params, field);
  if (v !== undefined) {
    return Caml_option.some(Caml_option.valFromOption(v));
  }
  
}

function stringToPath(path, pattern) {
  var _path = path;
  var _pattern = pattern;
  var _pathsAndPatterns = /* [] */0;
  while(true) {
    var pathsAndPatterns = _pathsAndPatterns;
    var pattern$1 = _pattern;
    var path$1 = _path;
    if (path$1 === "") {
      if (pattern$1 === "") {
        return pathsAndPatterns;
      } else {
        return /* [] */0;
      }
    }
    if (pattern$1 === "") {
      return /* [] */0;
    }
    var match;
    if ($$String.contains_from(path$1, 1, /* '/' */47)) {
      var nextUrlSlash = $$String.index_from(path$1, 1, /* '/' */47);
      var urlItem = $$String.sub(path$1, 1, nextUrlSlash - 1 | 0);
      match = [
        urlItem,
        $$String.sub(path$1, nextUrlSlash, path$1.length - nextUrlSlash | 0)
      ];
    } else {
      match = [
        $$String.sub(path$1, 1, path$1.length - 1 | 0),
        ""
      ];
    }
    var match$1;
    if ($$String.contains_from(pattern$1, 1, /* '/' */47)) {
      var nextPatternSlash = $$String.index_from(pattern$1, 1, /* '/' */47);
      var patternItem = $$String.sub(pattern$1, 1, nextPatternSlash - 1 | 0);
      match$1 = [
        patternItem,
        $$String.sub(pattern$1, nextPatternSlash, pattern$1.length - nextPatternSlash | 0)
      ];
    } else {
      match$1 = [
        $$String.sub(pattern$1, 1, pattern$1.length - 1 | 0),
        ""
      ];
    }
    _pathsAndPatterns = {
      hd: [
        match[0],
        match$1[0]
      ],
      tl: pathsAndPatterns
    };
    _pattern = match$1[1];
    _path = match[1];
    continue ;
  };
}

function parseUrl(pathsAndPatterns) {
  var remainingIterations = function (_search, hash, params, _pathsAndPatterns) {
    while(true) {
      var pathsAndPatterns = _pathsAndPatterns;
      var search = _search;
      if (!pathsAndPatterns) {
        return {
                search: search,
                hash: hash,
                params: params
              };
      }
      var rest = pathsAndPatterns.tl;
      var match = pathsAndPatterns.hd;
      var patternHead = match[1];
      var pathHead = match[0];
      if (rest) {
        var match$1 = hasSearch(patternHead);
        if (match$1) {
          var s = $$String.sub(patternHead, 1, patternHead.length - 1 | 0);
          params[s] = pathHead;
          _pathsAndPatterns = rest;
          _search = s + ("=" + (pathHead + ("&" + search)));
          continue ;
        }
        _pathsAndPatterns = rest;
        continue ;
      }
      var match$2 = hasSearch(patternHead);
      if (match$2) {
        var s$1 = $$String.sub(patternHead, 1, patternHead.length - 1 | 0);
        params[s$1] = pathHead;
        _pathsAndPatterns = /* [] */0;
        _search = "?" + (s$1 + ("=" + (pathHead + ("&" + search))));
        continue ;
      }
      _pathsAndPatterns = /* [] */0;
      _search = "?" + search;
      continue ;
    };
  };
  var search = "";
  var hash = "";
  var params = {};
  if (!pathsAndPatterns) {
    return {
            search: search,
            hash: hash,
            params: params
          };
  }
  var rest = pathsAndPatterns.tl;
  var match = pathsAndPatterns.hd;
  var patternHead = match[1];
  var pathHead = match[0];
  var match$1 = hasHash(pathHead);
  var match$2 = hasSearch(patternHead);
  if (match$1) {
    var loc = match$1._0;
    if (match$2) {
      var h = $$String.sub(pathHead, loc, pathHead.length - loc | 0);
      var p = $$String.sub(pathHead, 0, loc);
      var s = $$String.sub(patternHead, 1, patternHead.length - 1 | 0);
      params[s] = p;
      return remainingIterations(s + ("=" + p), h, params, rest);
    }
    var h$1 = $$String.sub(pathHead, loc, pathHead.length - loc | 0);
    return remainingIterations("?", h$1, params, rest);
  }
  if (!match$2) {
    return remainingIterations("", "", params, rest);
  }
  var s$1 = $$String.sub(patternHead, 1, patternHead.length - 1 | 0);
  params[s$1] = pathHead;
  return remainingIterations(s$1 + ("=" + pathHead), "", params, rest);
}

function isPathCompliant(pathsAndPatterns) {
  var normalizedPathsAndPatterns;
  if (pathsAndPatterns) {
    var match = pathsAndPatterns.hd;
    var path = match[0];
    var loc = hasHash(path);
    normalizedPathsAndPatterns = loc ? ({
          hd: [
            $$String.sub(path, 0, loc._0),
            match[1]
          ],
          tl: pathsAndPatterns.tl
        }) : pathsAndPatterns;
  } else {
    normalizedPathsAndPatterns = pathsAndPatterns;
  }
  return List.for_all((function (param) {
                var pattern = param[1];
                var match = hasSearch(pattern);
                if (match) {
                  return true;
                } else {
                  return param[0] === pattern;
                }
              }), normalizedPathsAndPatterns);
}

function matchPath(url, pattern) {
  var formatUrl = url === "/" ? url : removeTrailingSlash(addLeadingSlash(url));
  var formatPattern = pattern === "/" ? pattern : removeTrailingSlash(addLeadingSlash(pattern));
  var pathsAndPatterns = stringToPath(formatUrl, formatPattern);
  if (pathsAndPatterns && isPathCompliant(pathsAndPatterns)) {
    return [
            formatUrl,
            pathsAndPatterns
          ];
  }
  
}

exports.removeTrailingSlash = removeTrailingSlash;
exports.addLeadingSlash = addLeadingSlash;
exports.hasSearch = hasSearch;
exports.hasHash = hasHash;
exports.getInt = getInt;
exports.getString = getString;
exports.stringToPath = stringToPath;
exports.parseUrl = parseUrl;
exports.isPathCompliant = isPathCompliant;
exports.matchPath = matchPath;
/* No side effect */
