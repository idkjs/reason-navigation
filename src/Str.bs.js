'use strict';

var $$String = require("bs-platform/lib/js/string.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Caml_string = require("bs-platform/lib/js/caml_string.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");

function sub(str, start, len) {
  var sub$1;
  try {
    sub$1 = $$String.sub(str, start, len);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Invalid_argument") {
      return ;
    }
    throw exn;
  }
  return sub$1;
}

function length(str) {
  var len;
  try {
    len = str.length;
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Invalid_argument") {
      return ;
    }
    throw exn;
  }
  return len;
}

function index(str, chr) {
  var index$1;
  try {
    index$1 = $$String.index(str, chr);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      return ;
    }
    throw exn;
  }
  return index$1;
}

function indexFrom(str, index, $$char) {
  var nextIndex;
  try {
    nextIndex = $$String.index_from(str, index, $$char);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Invalid_argument") {
      return ;
    }
    if (exn.RE_EXN_ID === "Not_found") {
      return ;
    }
    throw exn;
  }
  return nextIndex;
}

function get(str, index) {
  var chr;
  try {
    chr = Caml_string.get(str, index);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Invalid_argument") {
      return ;
    }
    throw exn;
  }
  return $$String.make(1, chr);
}

function someOr(opt, alt) {
  if (opt !== undefined) {
    return Caml_option.valFromOption(opt);
  } else {
    return alt;
  }
}

exports.sub = sub;
exports.length = length;
exports.index = index;
exports.indexFrom = indexFrom;
exports.get = get;
exports.someOr = someOr;
/* No side effect */
