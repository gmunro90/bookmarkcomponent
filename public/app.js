"use strict";

/*
global
Bookmark
*/
var options = {
  text: 'websy designs bookmark',
  onClick: function onClick() {
    console.log('success');
  }
};
var bookmarkTest = new Bookmark('websy-bookmark', options);
