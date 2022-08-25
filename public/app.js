"use strict";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/*
global
Bookmark
include
*/

/* global Bookmark */
var Bookmark = /*#__PURE__*/function () {
  function Bookmark(elementId, options) {
    _classCallCheck(this, Bookmark);

    this.elementId = elementId;
    var DEFAULTS = {};
    this.options = _extends({}, DEFAULTS, options);
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      var html = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"ionicon\" viewBox=\"0 0 512 512\">\n        <title>Bookmark</title>\n        <path d=\"M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z\" fill=\"none\" stroke=\"currentColor\"\n          stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\" />\n        </svg>";
      el.innerHTML = html;
    }
  }

  _createClass(Bookmark, [{
    key: "handleClick",
    value: function handleClick(event) {
      if (this.options.onClick) {
        this.options.onClick(event); // if (myForm.style.display = 'block') {
        //   closeForm() 
        // } 
        // else {
        //   openForm()
        // }
      }
    }
  }]);

  return Bookmark;
}();

var myForm = document.getElementById('myForm');

function openForm() {
  if (myForm) {
    myForm.style.display = 'block';
  }
}

function closeForm() {
  myForm.style.display = 'none';
}

var bookmarkTest = new Bookmark('websy-bookmark');
