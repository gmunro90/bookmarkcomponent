"use strict";

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/*
global
Bookmark
include
enigma
schema
app
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
      var html = "<div>\n      <svg xmlns='http://www.w3.org/2000/svg' class='bookmarkBtn' viewBox='0 0 512 512'>\n        <title>Bookmark</title>\n        <path d='M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z' fill='none' stroke='currentColor'\n          stroke-linecap='round' stroke-linejoin='round' stroke-width='32' />\n        </svg>\n        <div class='bookmarkPopup' id='bookmarkPopup'></div>\n        <div class='bookmarkContainer' id='bookmarkContainer'>\n          <div class='bookmark-topline'>\n            <span>Bookmarks</span><button class='createNew'>Create new bookmark</button>\n          </div>\n          <div class='btn'>\n          </div>\n          <div>\n            <svg class='search-icon' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>\n              <title>Search</title>\n              <path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' fill='none'\n                stroke='currentColor' stroke-miterlimit='10' stroke-width='32' />\n              <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32'\n                d='M338.29 338.29L448 448' />\n            </svg>\n            <input class='search' type='search'>\n          </div>\n          <hr>\n          <div class='public'>\n            <svg class='caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>\n              <title>Caret Down</title>\n              <path\n                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />\n            </svg>\n            <h4>Public bookmarks <span id=\"publicCount\">(0)</span></h4>\n            <div id=\"public-placeholder\"><p class='public-text'>You have no public bookmarks</p>\n            <p class='public-text'>Right-click on a bookmark and select 'Make public'.</p>\n            </div>\n          </div>\n          <div class='my-bookmarks'>\n            <svg class='caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>\n              <title>Caret Down</title>\n              <path\n                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />\n            </svg>\n            <h4>My bookmarks <span id=\"myBookmarkCount\">(0)</span></>\n            <div id=\"mybookmarks-placeholder\"><p class='public-text'>You have no public bookmarks</p>\n            <p class='public-text'>Right-click on a bookmark and select 'Make public'.</p>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class='createNewPopup' id='createForm'>\n    <div class='createTopline'>\n      <h2>Create bookmark</h2>\n      <hr>\n      <svg xmlns='http://www.w3.org/2000/svg' class='closeCreate' viewbox='0 0 512 512'>\n        <title>Close</title>\n        <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'\n          d='M368 368L144 144M368 144L144 368' />\n      </svg><br>\n    </div>\n    <div>\n    <label for='bookmarkName'>Title</label><br>\n      <input type='text' id='bookmarkName' name='bookmarkName'>\n      <label for='bookmarkDescription'>Description <span class='optional'>(optional)</span></label><br>\n      <input type='text' id='bookmarkDescription' name='bookmarkDescription'>\n      <button class='createSubmit' id='createSubmit'>Create</button>\n    </div>\n  </div>\n    ";
      el.innerHTML = html;
      this.render();
    }
  }

  _createClass(Bookmark, [{
    key: "render",
    value: function render() {
      var bookmarkTitle = document.getElementById('bookmarkName');
      var bookmarkDescription = document.getElementById('bookmarkDescription');
      var publicCount = document.getElementById('publicCount');
      var publicBookmarks = [];
      var myBookmarksCount = document.getElementById('myBookmarkCount');
      var myBookmarks = [];
      this.options.app.createSessionObject({
        'qInfo': {
          'qId': 'BookmarkList',
          'qType': 'BookmarkList'
        },
        'qBookmarkListDef': {
          'qType': 'bookmark',
          'qData': {
            'title': '/qMetaDef/title',
            'description': '/qMetaDef/description',
            'sheetId': '/sheetId',
            'selectionFields': '/selectionFields',
            'creationDate': '/creationDate'
          }
        }
      }).then(function (model) {
        model.getLayout().then(function (layout) {
          console.log(layout);
          layout.qBookmarkList.qItems.forEach(function (d) {
            if (d.qMeta.published === true) {
              publicBookmarks.push(d);
            } else {
              myBookmarks.push(d);
            }
          });
          var publicHtml = '';
          publicBookmarks.forEach(function (bookmark) {
            publicHtml += "\n            <div>\n              <h6>".concat(bookmark.qMeta.title, "</h6>\n            </div>");
          });
          var bookmarkHtml = '';
          myBookmarks.forEach(function (bookmark) {
            bookmarkHtml += "\n              <div>\n               <h6>".concat(bookmarkTitle.value, "</h6>\n               <p>").concat(bookmarkDescription.value, "</p>\n              </div>\n              ");
          });
          var publicPlaceholder = document.getElementById('public-placeholder');
          publicPlaceholder.innerHTML = publicHtml;
          var myBookmarksPlaceholder = document.getElementById('mybookmarks-placeholder');
          myBookmarksPlaceholder.innerHTML = bookmarkHtml;
          publicCount.textContent = "(" + publicBookmarks.length + ")";
        });
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var bookmarkTitle = document.getElementById('bookmarkName');
      var bookmarkDescription = document.getElementById('bookmarkDescription');

      if (event.target.classList.contains('bookmarkBtn')) {
        openForm();
      }

      if (event.target.classList.contains('bookmarkPopup')) {
        closeForm();
      }

      if (event.target.classList.contains('createNew')) {
        createNewBookmark();
      }

      if (event.target.classList.contains('closeCreate')) {
        closeBookmark();
      }

      if (event.target.classList.contains('createSubmit')) {
        this.options.app.createBookmark({
          qInfo: {
            qType: 'bookmark'
          },
          qMetaDef: {
            title: "".concat(bookmarkTitle.value),
            description: "".concat(bookmarkDescription.value)
          }
        });
        closeBookmark();
      }
    }
  }]);

  return Bookmark;
}();

function openForm() {
  var myForm = document.getElementById('bookmarkPopup');

  if (myForm) {
    myForm.style.display = 'block';
  }

  var bookmarkContainer = document.getElementById('bookmarkContainer');

  if (bookmarkContainer) {
    bookmarkContainer.style.display = 'block';
  }
}

function closeForm() {
  var myForm = document.getElementById('bookmarkPopup');
  myForm.style.display = 'none';
  var bookmarkContainer = document.getElementById('bookmarkContainer');

  if (bookmarkContainer) {
    bookmarkContainer.style.display = 'none';
  }
}

function createNewBookmark() {
  var createNew = document.getElementById('createForm');
  createNew.style.display = 'flex';
}

function closeBookmark() {
  var createNew = document.getElementById('createForm');
  createNew.style.display = 'none';
}

var session = enigma.create({
  schema: schema,
  url: 'wss://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/af650d53-f31b-476d-b28b-7db3bd2f620f'
});
session.open().then(function (global) {
  console.log(global);
  global.openDoc('af650d53-f31b-476d-b28b-7db3bd2f620f').then(function (app) {
    console.log(app);
    var bookmark = new Bookmark('websy-bookmark', {
      app: app
    });
  });
});
