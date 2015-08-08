/*
 * CheckboxR
 * https://github.com/mubtxs/checkboxr
 *
 * Copyright (c) 2015 mubtxs
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.CheckboxR = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.CheckboxR = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.CheckboxR.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.CheckboxR.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].CheckboxR = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
