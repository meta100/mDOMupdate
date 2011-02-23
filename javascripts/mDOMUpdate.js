/*
  mDOMUpdate
  Version: 1.0 r1
  
  Copyright (c) 2010 Meta100 LLC.
  http://www.meta100.com/
  
  Licensed under the MIT license 
  http://www.opensource.org/licenses/mit-license.php 
*/

(function ($) {

  if ($.mDOMUpdate === undefined) {

    var timer;

    $.mDOMUpdate = true;
    $.mDOMUpdateTrigger = function () {

      if ($.mDOMUpdate) {

        clearTimeout(timer);

        timer = setTimeout(function() {

          $.mDOMUpdate = false;
          $(document).trigger('DOMUpdated');
          $.mDOMUpdate = true;
        }, 50);
      }
    };
  
    $.fn.origDomManip = $.fn.domManip;
    $.fn.domManip = function (args, table, callback) {
  
      $.mDOMUpdateTrigger();
      return $(this).origDomManip(args, table, callback);
    };

    $.fn.origHtml = $.fn.html;
  	$.fn.html = function (value) {

  		if (value !== undefined) $.mDOMUpdateTrigger();
      return $(this).origHtml(value);
    };

    $.fn.origRemove = $.fn.remove;
  	$.fn.remove = function (elem, types, handler, pos) {

  		$.mDOMUpdateTrigger();
      return $(this).origRemove(elem, types, handler, pos);
    };

    $.fn.origEmpty = $.fn.empty;
  	$.fn.empty = function () {

  		$.mDOMUpdateTrigger();
      return $(this).origEmpty();
    };
  }
})(jQuery);
