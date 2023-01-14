"use strict";

// This module exports a script function for counting input
// characters and update character limits.
//
// This is used to help users get to know how many valid words
// they could input.

$(document).ready(function() {
  $("#contribution-text").on('keyup', function () {
    const remainChar = 250 - this.value.length;
    if (remainChar < 0) {
      $(this).parent().find('.counter').css( { 'color' : 'red' } );
    } else {
      $(this).parent().find('.counter').css( { 'color' : '#545149' } );
    }
    $(this).parent().find('.counter').text(remainChar);
  });
});
