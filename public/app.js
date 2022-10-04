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
      el.addEventListener('contextmenu', this.handleContextMenu.bind(this));
      var html = "<div>\n      <svg xmlns='http://www.w3.org/2000/svg' class='bookmarkBtn' viewBox='0 0 512 512'>\n        <title>Bookmark</title>\n        <path d='M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z' fill='none' stroke='currentColor'\n          stroke-linecap='round' stroke-linejoin='round' stroke-width='32' />\n        </svg>\n\n        <div class='bookmarkPopup' id='bookmarkPopup'></div>\n        <div class='bookmarkContainer' id='bookmarkContainer'>\n          <div class='bookmark-topline'>\n            <span class=\"heading\">Bookmarks</span><button class='createNew'>Create new bookmark</button>\n          </div>\n          <div class='btn'>\n          </div>\n          <div>\n            <input class='search' type='text' id=\"myInput\" placeholder=\"Search\">\n          </div>\n          <hr>\n          <div class='public'>\n          <div class=\"public-heading-caret\">\n              <svg class='public-caret caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>\n                <title>Caret Down</title>\n                <path d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />\n              </svg>\n\n              <span class=\"heading\">Public bookmarks <span id=\"publicCount\">(0)</span></span>\n              </div>\n              <div id=\"public-placeholder\" class=\"active\"><p class='public-text'>You have no public bookmarks</p>\n              <p class='public-text'>Right-click on a bookmark and select 'Make public'.</p>\n            \n          </div>\n        </div>\n          <div class='my-bookmarks'>\n\n          <div class=\"heading-caret\">\n            <svg class='myBookmarks-caret caret' xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>\n              <title>Caret Down</title>\n              <path\n                d='M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z' />\n            </svg>\n            <span class=\"heading\">My bookmarks <span id=\"myBookmarksCount\">(0)</span></span>\n            </div>\n\n            <div id=\"myBookmarks-placeholder\" class=\"active\">\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class='createNewPopup' id='createForm'>\n    <div class='createTopline'>\n    <span class=\"heading\">Create bookmark</span>\n    <span class='closeCreate'><svg xmlns='http://www.w3.org/2000/svg' viewbox='0 0 512 512'>\n    <title>Close</title>\n    <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'\n      d='M368 368L144 144M368 144L144 368' />\n  </svg></span>\n\n    </div>\n    <hr>\n    <div class=\"create-input\">\n    <label for='bookmarkName' class=\"title\">Title</label>\n      <input type='text' class=\"bookmark-name\" id='bookmarkName' name='bookmarkName'>\n      <label for='bookmarkDescription' class=\"description\">Description <span class='optional'>(optional)</span></label><br>\n      <input type='text' id='bookmarkDescription' name='bookmarkDescription'>\n      <div class=\"create-flex\"><button type=\"button\" disabled class='createSubmit' id='createSubmit'>Create</button>\n      </div>\n    </div>\n  </div>\n    ";
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
          var publicHtml = "<div id=\"info-popup-mask\" class=\"info-popup-mask\"></div>";
          publicBookmarks.forEach(function (bookmark) {
            console.log('public', bookmark);
            publicHtml += "\n              <div class=\"public-li\" id=\"public-li\" data-bookmark=\"".concat(bookmark.qInfo.qId, "\">\n              <span class=\"bookmark-text\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\">").concat(bookmark.qMeta.title, "</span>\n              <div class=\"date-and-i\">\n              <span class=\"bookmark-text\">").concat(new Date(bookmark.qMeta.createdDate).toLocaleString().slice(0, 10), "</span>\n              <span class=\"infoBtn\">\n               <svg data-bookmark=\"").concat(bookmark.qInfo.qId, "\" class=\"i-icon-public\" id=\"i-icon-public\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\n               <title>Information Circle</title><path d=\"M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 \n               56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm48 226h-88a16 16 0 010-32h28v-88h-16a16 16 0 010-32h32a16 16 0 0116 \n               16v104h28a16 16 0 010 32z\"/>\n               </svg>\n               </span>\n               </div>\n              </div>\n             \n              <div class=\"info-popup\" id=\"info-popup-").concat(bookmark.qInfo.qId, "\">\n              <div class=\"info-topline\" id=\"info-topline-").concat(bookmark.qInfo.qId, "\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\">\n              <span class=\"description-heading\" id=\"description-heading\">").concat(bookmark.qMeta.description, "</span>\n              </div>");

            if (bookmark.qMeta.privileges.indexOf('update') !== -1) {
              publicHtml += "\n              <svg xmlns=\"http://www.w3.org/2000/svg\" data-bookmark=\"".concat(bookmark.qInfo.qId, "\" class=\"edit-info\" id=\"edit-info-").concat(bookmark.qInfo.qId, "\" viewBox=\"0 0 512 512\">\n              <title>Create</title><path d=\"M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48\"\n               fill=\"none\" stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\"/>\n               <path d=\"M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34\n                0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91\n                 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z\"/>\n                 </svg>\n                 </div>\n                 <div class=\"edit-topline\">\n                 <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"tick-icon\" id=\"tick-icon\" viewBox=\"0 0 512 512\">\n                 <title>Checkmark Circle</title><path d=\"M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z\" fill=\"none\" stroke=\"currentColor\" stroke-miterlimit=\"10\" stroke-width=\"32\"/><path fill=\"none\"\n                  stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" \n                  stroke-width=\"32\" d=\"M352 176L217.6 336 160 272\"/>\n                  </svg>");

              if (bookmark.qMeta.privileges.indexOf('publish') !== -1) {
                publicHtml += "\n                <div class=\"right-click-popup\" id=\"rightClickPopup-".concat(bookmark.qInfo.qId, "\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\">\n                <span>testing</span>\n                </div>\n                ");
              }

              if (bookmark.qMeta.privileges.indexOf('delete') !== -1) {
                publicHtml += "\n                  <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"trash-icon\" data-bookmark=\"".concat(bookmark.qInfo.qId, "\" id=\"trashIcon-").concat(bookmark.qInfo.qId, "\" viewBox=\"0 0 512 512\"><title>Trash</title>\n                  <path d=\"M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z\" fill=\"none\"/>\n                  <path d=\"M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42\n                   26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 \n                   01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132\n                    0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 \n                    399.43l8-224a16 16 0 1132 1.14z\"/>\n                    </svg>\n                  </div>\n                  ");
              }

              publicHtml += "\n                 <div id=\"edit-inputs-".concat(bookmark.qInfo.qId, "\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\" class=\"edit-inputs\">\n                 <input type=\"text\" id=\"edit-title-").concat(bookmark.qInfo.qId, "\" placeholder=\"Bookmark title\"  value=\"").concat(bookmark.qMeta.title, "\"/>\n                 <input type=\"text\" id=\"edit-description-").concat(bookmark.qInfo.qId, "\" placeholder=\"Bookmark description\" value=\"").concat(bookmark.qMeta.description, "\"  />\n                 </div>");
            }

            publicHtml += "\n              <span class=\"selections\"><b>Selections:</b> ".concat(bookmark.qData.selectionFields, " </span>\n              <div class=\"info-copy\">\n              <span class=\"set-expression\">Set expression</span>\n              <input type=\"text\" READONLY class=\"info-input\" id=\"infoInput\" value=\"").concat(bookmark.qData.selectionFields, "\" />\n            \n              <div class=\"flex\">\n              <div class=\"copied\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\" id=\"copied-").concat(bookmark.qInfo.qId, "\"><h5>copied to clipboard</h5></div>\n              <button class=\"copy\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\" id=\"copyBtn-").concat(bookmark.qInfo.qId, "\" >Copy</button>\n              </div>\n              </div>\n              </div>\n             \n              ");
          });
          var bookmarkHtml = '';
          myBookmarks.forEach(function (bookmark) {
            console.log('my bookmark', bookmark);
            var createDate = new Date();

            if (bookmark.qMeta.createdDate) {
              createDate = new Date(bookmark.qMeta.createdDate);
            }

            bookmarkHtml += "\n              <div class=\"myBookmarks-li\" id=\"myBookmarks-li data-bookmark=\"".concat(bookmark.qInfo.qId, " >\n                <span class=\"bookmark-text data-bookmark=\"").concat(bookmark.qInfo.qId, "\">").concat(bookmark.qMeta.title, "</span>\n                <div class=\"date-and-i\">\n                <span class=\"bookmark-text\">").concat(new Date(bookmark.qMeta.createdDate).toLocaleString().slice(0, 10), "</span>\n                <span class=\"infoBtn\">\n                <svg data-bookmark=\"").concat(bookmark.qInfo.qId, "\" class=\"i-icon-my\" id=\"i-icon-my\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\n                <title>Information Circle</title><path d=\"M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 \n                56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm48 226h-88a16 16 0 010-32h28v-88h-16a16 16 0 010-32h32a16 16 0 0116 \n                16v104h28a16 16 0 010 32z\"/>\n                </svg>\n                </span>\n                </div>\n                </div>\n              \n                <div class=\"info-popup\" id=\"info-popup-").concat(bookmark.qInfo.qId, "\">\n                <div class=\"info-topline\" id=\"info-topline-").concat(bookmark.qInfo.qId, "\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\">\n                <span class=\"description-heading\" id=\"description-heading\">").concat(bookmark.qMeta.description, "</span>");

            if (bookmark.qMeta.privileges.indexOf('update') !== -1) {
              bookmarkHtml += "\n                <svg xmlns=\"http://www.w3.org/2000/svg\" data-bookmark=\"".concat(bookmark.qInfo.qId, "\" class=\"edit-info\" id=\"edit-info-").concat(bookmark.qInfo.qId, "\" viewBox=\"0 0 512 512\">\n                <title>Create</title><path d=\"M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48\"\n                 fill=\"none\" stroke=\"white\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\"/>\n                 <path d=\"M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34\n                  0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91\n                   0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z\"/>\n                   </svg>\n                   </div>\n                   <div class=\"edit-topline\">\n                   <svg xmlns=\"http://www.w3.org/2000/svg\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\" class=\"tick-icon\" id=\"tick-icon-").concat(bookmark.qInfo.qId, "\" viewBox=\"0 0 512 512\">\n                   <title>Checkmark Circle</title><path d=\"M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z\" fill=\"none\" stroke=\"currentColor\" stroke-miterlimit=\"10\" stroke-width=\"32\"/><path fill=\"none\"\n                    stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" \n                    stroke-width=\"32\" d=\"M352 176L217.6 336 160 272\"/>\n                    </svg>");

              if (bookmark.qMeta.privileges.indexOf('publish') !== -1) {
                bookmarkHtml += "\n                      <div class=\"right-click-popup\" id=\"rightClickPopup-".concat(bookmark.qInfo.qId, "\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\">\n                      <span>testing</span>\n                      </div>\n                      ");
              }

              if (bookmark.qMeta.privileges.indexOf('delete') !== -1) {
                bookmarkHtml += "\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"trash-icon\" data-bookmark=\"".concat(bookmark.qInfo.qId, "\" id=\"trashIcon-").concat(bookmark.qInfo.qId, "\" viewBox=\"0 0 512 512\"><title>Trash</title>\n                    <path d=\"M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z\" fill=\"none\"/>\n                    <path d=\"M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42\n                     26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 \n                     01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132\n                      0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 \n                      399.43l8-224a16 16 0 1132 1.14z\"/>\n                      </svg>\n                    </div>\n                    ");
              }

              bookmarkHtml += "\n                   <div id=\"edit-inputs-".concat(bookmark.qInfo.qId, "\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\" class=\"edit-inputs\">\n                   <input type=\"text\" id=\"edit-title-").concat(bookmark.qInfo.qId, "\" placeholder=\"Bookmark title\" value=\"").concat(bookmark.qMeta.title, "\"/>\n                   <input type=\"text\" id=\"edit-description-").concat(bookmark.qInfo.qId, "\" placeholder=\"Bookmark description\" value=\"").concat(bookmark.qMeta.description, "\"  />\n                   </div>");
            }

            bookmarkHtml += "\n              <span class=\"selections\"><b>Selections:</b> ".concat(bookmark.qData.selectionFields, " </span>\n              <div class=\"info-copy\">\n              <span class=\"set-expression\">Set expression</span>\n              <input type=\"text\" READONLY class=\"info-input\" value=\"").concat(bookmark.qData.selectionFields, "\" />\n              <div class=\"flex\">\n              <div class=\"copied\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\" id=\"copied\"><h5>copied to clipboard</h5></div>\n              <button class=\"copy\" data-bookmark=\"").concat(bookmark.qInfo.qId, "\" id=\"copyBtn-").concat(bookmark.qInfo.qId, "\" >Copy</button>\n              </div>\n              </div>\n              </div>\n              ");
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
    value: function handleKeyUp(event) {
      var bookmarkName = document.getElementById('bookmarkName').value;

      if (event.target.classList.contains('search')) {
        this.searchFunction();
      }

      if (event.target.classList.contains('bookmark-name')) {
        if (bookmarkName.length === 0) {
          this.disableCreate();
        } else {
          this.enableCreate();
        }
      }
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
        var infoList = Array.from(document.getElementsByClassName('info-popup'));
        infoList.forEach(function (e) {
          e.classList.remove('active');
        });
        var mask = document.getElementById('info-popup-mask');
        mask.classList.remove('active');
      }

      if (event.target.classList.contains('createNew')) {
        this.createNewBookmark();
      }

      if (event.target.classList.contains('closeCreate')) {
        var bookmarkBackground = document.getElementById('bookmarkPopup');
        bookmarkBackground.style.backgroundColor = 'transparent';
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

        _bookmarkBackground.style.backgroundColor = 'transparent';
        this.options.app.createBookmark({
          qInfo: {
            qType: 'bookmark'
          },
          qMetaDef: {
            title: "".concat(bookmarkTitle.value),
            description: "".concat(bookmarkDescription.value)
          }
        }).then(function () {
          document.getElementById('bookmarkName').value = '';

          _this.render();
        });
        this.closeBookmark();
      }

      if (event.target.classList.contains('trash-icon')) {
        var bookmarkId = event.target.getAttribute('data-bookmark');
        this.options.app.destroyBookmark(bookmarkId).then(function () {
          _this.render();
        });
      }

      if (event.target.classList.contains('i-icon-public')) {
        this.toggleInfo(event);
      }

      if (event.target.classList.contains('i-icon-my')) {
        this.toggleInfo(event);
      }

      if (event.target.classList.contains('info-popup-mask')) {
        var _infoList = Array.from(document.getElementsByClassName('info-popup'));

        _infoList.forEach(function (e) {
          e.classList.remove('active');
        });

        var _mask = document.getElementById('info-popup-mask');

        _mask.classList.remove('active');
      }

      if (event.target.classList.contains('edit-info')) {
        this.editInfo(event);
        this.hideInfoTopline(event);
        this.showTickIcon(event);
        this.showTrashIcon(event);
      }

      if (event.target.classList.contains('tick-icon')) {
        var _bookmarkId = event.target.getAttribute('data-bookmark');

        var editTitle = document.getElementById("edit-title-".concat(_bookmarkId));
        var editDescription = document.getElementById("edit-description-".concat(_bookmarkId));
        this.options.app.getBookmark(_bookmarkId).then(function (result) {
          result.getProperties().then(function (props) {
            props.qMetaDef.title = editTitle.value;
            props.qMetaDef.description = editDescription.value;
            result.setProperties(props);

            _this.render();
          });
        });
      }

      if (event.target.classList.contains('public-li') || event.target.classList.contains('myBookmarks-li')) {
        var _bookmarkId2 = event.target.getAttribute('data-bookmark');

        this.options.app.applyBookmark(_bookmarkId2).then();
        this.closeForm();
      }

      if (event.target.classList.contains('copy')) {
        this.copyToClipboard(event);
        this.toggleCopied(event);
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
    key: "copyToClipboard",
    value: function copyToClipboard(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var copyText = document.getElementById('infoInput');
      var copyBtn = document.getElementById("copyBtn-".concat(bookmarkId));
      copyText.select();
      navigator.clipboard.writeText(copyText.value);
    }
  }, {
    key: "toggleCopied",
    value: function toggleCopied(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var inputBox = document.getElementById("copied-".concat(bookmarkId));
      inputBox.classList.toggle('active');
      setTimeout(this.toggleCopied, 3000);
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
    key: "toggleInfo",
    value: function toggleInfo(event) {
      var infoList = Array.from(document.getElementsByClassName('info-popup'));
      infoList.forEach(function (e) {
        e.classList.remove('active');
      });
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var toggleInfo = document.getElementById("info-popup-".concat(bookmarkId));
      toggleInfo.classList.add('active');
      var mask = document.getElementById('info-popup-mask');
      mask.classList.add('active');
    }
  }, {
    key: "enableCreate",
    value: function enableCreate() {
      document.getElementById('createSubmit').disabled = false;
    }
  }, {
    key: "disableCreate",
    value: function disableCreate() {
      document.getElementById('createSubmit').disabled = true;
    }
  }, {
    key: "editInfo",
    value: function editInfo(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var toggleEdit = document.getElementById("edit-info-".concat(bookmarkId));
      var editInputs = document.getElementById("edit-inputs-".concat(bookmarkId));
      toggleEdit.classList.add('active');
      editInputs.classList.toggle('active');
      this.hideInfoTopline(event);
    }
  }, {
    key: "hideInfoTopline",
    value: function hideInfoTopline(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var hideInfoTop = document.getElementById("info-topline-".concat(bookmarkId));
      hideInfoTop.classList.toggle('active');
    }
  }, {
    key: "showTickIcon",
    value: function showTickIcon(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var showTick = document.getElementById("tick-icon-".concat(bookmarkId));
      showTick.classList.toggle('active');
    }
  }, {
    key: "showTrashIcon",
    value: function showTrashIcon(event) {
      var bookmarkId = event.target.getAttribute('data-bookmark');
      var showTrash = document.getElementById("trashIcon-".concat(bookmarkId));
      showTrash.classList.toggle('active');
    }
  }, {
    key: "handleContextMenu",
    value: function handleContextMenu(event) {
      if (event.target.classList.contains('public-li') || event.target.classList.contains('myBookmarks-li')) {
        event.preventDefault();
        var bookmarkId = event.target.getAttribute('data-bookmark');
        var rightClickMenu = document.getElementById("rightClickPopup-".concat(bookmarkId));
        console.log(rightClickMenu); // rightClickMenu.classList.toggle('active')
      }
    }
  }]);

  return Bookmark;
}();

var session = enigma.create({
  schema: schema,
  url: 'wss://ec2-3-86-99-193.compute-1.amazonaws.com/app//d077bbca-1fa2-4564-83d5-88f801899a5c'
});
session.open().then(function (global) {
  global.openDoc('d077bbca-1fa2-4564-83d5-88f801899a5c').then(function (app) {
    var bookmark = new Bookmark('websy-bookmark', {
      app: app
    });
  });
});
