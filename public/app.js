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
      el.addEventListener('keyup', this.handleKeyUp.bind(this));
      el.addEventListener('change', this.handleChange.bind(this));
      var html = "<div>\n      <svg xmlns='http://www.w3.org/2000/svg' class='bookmarkBtn' viewBox='0 0 512 512'>\n        <title>Bookmark</title>\n        <path d='M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z' fill='none' stroke='currentColor'\n          stroke-linecap='round' stroke-linejoin='round' stroke-width='32' />\n        </svg>\n        <div class='bookmarkPopup' id='bookmarkPopup'></div>\n        <div class='bookmarkContainer' id='bookmarkContainer'>\n          <div class='bookmark-topline'>\n            <span class=\"heading\">Bookmarks</span><button class='createNew'>Create new bookmark</button>\n          </div>\n          <div class='btn'>\n          </div>\n          <div>\n            <input class='search' type='text' id=\"myInput\" placeholder=\"Search\" onkeyup\"searchFunction()\">\n            <div><svg class=\"close\" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>\n            <title>Close</title><path fill='none' stroke='currentColor' stroke-linecap='round' \n            stroke-linejoin='round' stroke-width='32' d='M368 368L144 144M368 144L144 368'/>\n            </svg></div>\n            \n          </div>\n          <hr>\n          <div class='public'>\n          <div class=\"public-heading-caret\">\n              <svg class='public-caret caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>\n                <title>Caret Down</title>\n                <path d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />\n              </svg>\n\n              <span class=\"heading\">Public bookmarks <span id=\"publicCount\">(0)</span></span>\n              </div>\n              <div id=\"public-placeholder\" class=\"active\"><p class='public-text'>You have no public bookmarks</p>\n              <p class='public-text'>Right-click on a bookmark and select 'Make public'.</p>\n            \n          </div>\n        </div>\n          <div class='my-bookmarks'>\n\n          <div class=\"heading-caret\">\n            <svg class='myBookmarks-caret caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>\n              <title>Caret Down</title>\n              <path\n                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />\n            </svg>\n            <span class=\"heading\">My bookmarks <span id=\"myBookmarksCount\">(0)</span></span>\n            </div>\n\n            <div id=\"myBookmarks-placeholder\" class=\"active\">\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class='createNewPopup' id='createForm'>\n    <div class='createTopline'>\n    <span class=\"heading\">Create bookmark</span>\n    <span class='closeCreate'><svg xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>\n    <title>Close</title>\n    <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'\n      d='M368 368L144 144M368 144L144 368' />\n  </svg></span></br>\n\n    </div>\n    <hr>\n    <div class=\"create-input\">\n    <label for='bookmarkName' class=\"title\">Title</label>\n      <input type='text' id='bookmarkName' name='bookmarkName'>\n      <label for='bookmarkDescription' class=\"description\">Description <span class='optional'>(optional)</span></label><br>\n      <input type='text' id='bookmarkDescription' name='bookmarkDescription'>\n      <div class=\"create-flex\"><button class='createSubmit' id='createSubmit'>Create</button>\n      </div>\n    </div>\n  </div>\n    ";
      el.innerHTML = html;
      this.render();
    }
  }

  _createClass(Bookmark, [{
    key: "render",
    value: function render(searchText) {
      var publicCount = document.getElementById('publicCount');
      var publicBookmarks = [];
      var myBookmarksCount = document.getElementById('myBookmarksCount');
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
          layout.qBookmarkList.qItems.forEach(function (d) {
            if (d.qMeta.published === true) {
              if (searchText) {
                if (d.qMeta.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                  publicBookmarks.push(d);
                }
              } else {
                publicBookmarks.push(d);
              }
            } else {
              if (searchText) {
                if (d.qMeta.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                  myBookmarks.push(d);
                }
              } else {
                myBookmarks.push(d);
              }
            }
          });
          var publicHtml = '';
          publicBookmarks.forEach(function (bookmark) {
            publicHtml += "\n              <div class=\"public-li\" id=\"public-li\">\n              <span class=\"bookmarkText\">".concat(bookmark.qMeta.title, "</span>\n              <div class=\"date-and-i\">\n              <span class=\"bookmarkText\">").concat(new Date(bookmark.qMeta.createdDate).toLocaleString().slice(0, 10), "</span>\n              <span class=\"infoBtn\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"i-icon-public\" id=\"i-icon-public\" viewBox=\"0 0 512 512\">\n              <title>Information Circle</title>\n              <path d=\"M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z\"\n               fill=\"none\" stroke=\"currentColor\" stroke-miterlimit=\"10\" stroke-width=\"32\"/><path fill=\"none\"\n                stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\" d=\"M220 220h32v116\"/><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n               stroke-width=\"32\" d=\"M208 340h88\"/><path d=\"M248 130a26 26 0 1026 26 26 26 0 00-26-26z\"/>\n               </svg>\n               </span>\n               </div>\n              </div>\n             \n              <div class=\"info-popup-public\" id=\"info-popup-public\">\n              <h5 class=\"description-heading\">").concat(bookmark.qMeta.description, "</h5>\n              <h5>Selections: </h5>\n              </div>\n              ");
          });
          var bookmarkHtml = '';
          myBookmarks.forEach(function (bookmark) {
            console.log(bookmark);
            bookmarkHtml += "\n              <div class=\"myBookmarks-li\">\n                  <span class=\"bookmarkText\">".concat(bookmark.qMeta.title, "</span>\n                  <div class=\"date-and-i\">\n                  <div class=\"date\">\n                  <span class=\"bookmarkText\">").concat(new Date(bookmark.qMeta.createdDate).toLocaleString().slice(0, 10), "</span>\n                  <span class=\"infoBtn\">\n                  </div>\n                  \n            ");

            if (bookmark.qMeta.privileges.indexOf('delete') !== -1) {
              bookmarkHtml += " <svg id=".concat(bookmark.qInfo.qId, " xmlns='http://www.w3.org/2000/svg' class='delete-icon'\n              viewBox='0 0 512 512'><title>Close</title><path fill='none'\n              stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'\n                stroke-width='32' d='M368 368L144 144M368 144L144 368'/>\n                </svg>\n                \n                ");
            }

            bookmarkHtml += "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"i-icon-my\" id=\"i-icon-my\" viewBox=\"0 0 512 512\">\n            <title>Information Circle</title>\n            <path d=\"M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z\"\n             fill=\"none\" stroke=\"currentColor\" stroke-miterlimit=\"10\" stroke-width=\"32\"/><path fill=\"none\"\n              stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\" d=\"M220 220h32v116\"/><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-miterlimit=\"10\"\n             stroke-width=\"32\" d=\"M208 340h88\"/><path d=\"M248 130a26 26 0 1026 26 26 26 0 00-26-26z\"/>\n             </svg>\n             </span>\n             </div>\n            \n             <div class=\"info-popup-my\" id=\"info-popup-my\">\n             <h5 class=\"description-heading\">".concat(bookmark.qMeta.description, "</h5>\n             <h5>Selections: </h5>\n             </div>\n             </div>\n             ");
          });
          var publicPlaceholder = document.getElementById('public-placeholder');
          publicPlaceholder.innerHTML = publicHtml;
          var myBookmarksPlaceholder = document.getElementById('myBookmarks-placeholder');
          myBookmarksPlaceholder.innerHTML = bookmarkHtml;
          publicCount.textContent = "(" + publicBookmarks.length + ")";
          myBookmarksCount.textContent = "(" + myBookmarks.length + ")";
        });
      });
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp() {
      this.searchFunction();
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var _this = this;

      var bookmarkTitle = document.getElementById('bookmarkName');
      var bookmarkDescription = document.getElementById('bookmarkDescription');

      if (event.target.classList.contains('bookmarkBtn')) {
        this.openForm();
      }

      if (event.target.classList.contains('bookmarkPopup')) {
        this.closeForm();
        this.closeBookmark();
      }

      if (event.target.classList.contains('createNew')) {
        this.createNewBookmark();
      }

      if (event.target.classList.contains('closeCreate')) {
        var bookmarkBackground = document.getElementById('bookmarkPopup');
        bookmarkBackground.style.backgroundColor = 'white';
        this.closeBookmark();
      }

      if (event.target.classList.contains('public-heading-caret')) {
        this.closePublicUL();
      }

      if (event.target.classList.contains('heading-caret')) {
        this.closeMyBookmarksUL();
      }

      if (event.target.classList.contains('createSubmit')) {
        var _bookmarkBackground = document.getElementById('bookmarkPopup');

        this.options.app.createBookmark({
          qInfo: {
            qType: 'bookmark'
          },
          qMetaDef: {
            title: "".concat(bookmarkTitle.value),
            description: "".concat(bookmarkDescription.value)
          }
        }).then(function () {
          _this.render();
        });
        this.closeBookmark();
        _bookmarkBackground.style.backgroundColor = 'white';
      }

      if (event.target.classList.contains('delete-icon')) {
        this.options.app.destroyBookmark(event.target.id).then(function () {
          _this.render();
        });
      }

      if (event.target.classList.contains('i-icon-public')) {
        this.testingInfo();
      }

      if (event.target.classList.contains('i-icon-my')) {
        this.openInfoMy();
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      if (event.target.classList.contains('search')) {
        this.render(event.target.value);
      }
    }
  }, {
    key: "searchFunction",
    value: function searchFunction() {
      var input, filter;
      input = document.getElementById('myInput');
      filter = input.value.toLowerCase();
      this.render(filter);
    }
  }, {
    key: "openForm",
    value: function openForm() {
      var myForm = document.getElementById('bookmarkPopup');

      if (myForm) {
        myForm.style.display = 'block';
      }

      var bookmarkContainer = document.getElementById('bookmarkContainer');

      if (bookmarkContainer) {
        bookmarkContainer.style.display = 'block';
      }
    }
  }, {
    key: "openInfoPublic",
    value: function openInfoPublic() {
      var infoPopup = document.getElementById('info-popup-public');
      infoPopup.style.display = 'block';
      var infoMyPopup = document.getElementById('info-popup-my');
      infoMyPopup.style.display = 'none';
    }
  }, {
    key: "closeInfoPublic",
    value: function closeInfoPublic() {
      var infoPopup = document.getElementById('info-popup-public');
      infoPopup.style.display = 'none';
    }
  }, {
    key: "openInfoMy",
    value: function openInfoMy() {
      var infoMyPopup = document.getElementById('info-popup-my');
      infoMyPopup.style.display = 'block';
      var infoPopup = document.getElementById('info-popup-public');
      infoPopup.style.display = 'none';
    }
  }, {
    key: "closeInfoMy",
    value: function closeInfoMy() {
      var infoMyPopup = document.getElementById('info-popup-my');
      infoMyPopup.style.display = 'none';
    }
  }, {
    key: "closeForm",
    value: function closeForm() {
      var myForm = document.getElementById('bookmarkPopup');
      myForm.style.display = 'none';
      var bookmarkContainer = document.getElementById('bookmarkContainer');

      if (bookmarkContainer) {
        bookmarkContainer.style.display = 'none';
      }
    }
  }, {
    key: "createNewBookmark",
    value: function createNewBookmark() {
      var createNew = document.getElementById('createForm');
      var bookmarkBackground = document.getElementById('bookmarkPopup');
      var bookmarkContainer = document.getElementById('bookmarkContainer');
      createNew.style.display = 'flex';
      bookmarkBackground.style.backgroundColor = '#bdbdbd';
      bookmarkContainer.style.opacity = '.4';
    }
  }, {
    key: "closeBookmark",
    value: function closeBookmark() {
      var createNew = document.getElementById('createForm');
      createNew.style.display = 'none';
      var bookmarkContainer = document.getElementById('bookmarkContainer');
      bookmarkContainer.style.opacity = '1';
    }
  }, {
    key: "closePublicUL",
    value: function closePublicUL() {
      var publicItem = document.getElementById('public-placeholder');
      publicItem.classList.toggle('active');
    }
  }, {
    key: "closeMyBookmarksUL",
    value: function closeMyBookmarksUL() {
      var myBookmarksItem = document.getElementById('myBookmarks-placeholder');
      myBookmarksItem.classList.toggle('active');
    }
  }, {
    key: "testingInfo",
    value: function testingInfo() {
      var testingInfo = document.getElementById('info-popup-public');
      testingInfo.classList.toggle('active');
    }
  }]);

  return Bookmark;
}();

var session = enigma.create({
  schema: schema,
  url: 'wss://ec2-3-86-99-193.compute-1.amazonaws.com/app/cee97e28-59cf-411f-acb5-c3a7f40ee7ac'
});
session.open().then(function (global) {
  console.log(global);
  global.openDoc('cee97e28-59cf-411f-acb5-c3a7f40ee7ac').then(function (app) {
    console.log(app);
    var bookmark = new Bookmark('websy-bookmark', {
      app: app
    });
  });
});
