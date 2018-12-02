/*@license 
Fullscreen Image Zoom and Pan with Jquery
version @VERSION@

by Samil Hazir (https://github.com/saplumbaga)
Contributions by JM Alarcon (https://github.com/jmalarcon/)

https://github.com/saplumbaga/jquery.pan
 */

jQuery.fn.extend({

	pan: function () {

		var panWrapper = document.createElement('div');
		$(panWrapper).addClass("panWrapper");

		var panImg = document.createElement('img');
		$(panImg).addClass("i").css("position", "absolute");

		var zi = document.createElement('a');
		$(zi).addClass("controls in");
		$(panWrapper).append(zi);

		var zo = document.createElement('a');
		$(zo).addClass("controls out");
		$(panWrapper).append(zo);

		var close = document.createElement('a');
		$(close).addClass("controls close");
		$(panWrapper).append(close);

		$(panWrapper).append(panImg);
		$("body").append(panWrapper);

		//Remove from set those image elements that are already shown in their natural size (they don't need zoom at all)
		//If the element is not an image it's not filtered
		var finalSet = $(this).filter(function() {
			if (this.tagName == "IMG" ) {
				var nW = this.naturalWidth || 0,
					nH = this.naturalHeight || 0,
					w = $(this).outerWidth(),
                    h = $(this).outerHeight();
				if (nW > w || nH > h)
				return true;
			}
			else {
				return true;
			}
		});

		finalSet.css('cursor', 'zoom-in');

		finalSet.click(function (e) {
			var t = $(this);
			var big = t.attr("data-big");
			//If there's no data-big attribute, use the src of the image (sometimes they are simply limited in size with CSS and you just need a zoom of that)
			if (big == undefined) 
				big = t.attr("src");
			$(".panWrapper").show();
			$(".panWrapper img.i").css("width", "auto").attr("src", big).on('load', function () { panInit(e); });
			return false;
		});

		$(zi).click(function (e) {
			var panImg = $(".panWrapper img.i");
			panImg.css("width", parseInt(parseInt(panImg.css("width")) * 1.2));
			panInit(e);
		});

		$(zo).click(function (e) {
			var panImg = $(".panWrapper img.i");
			panImg.css("width", parseInt(parseInt(panImg.css("width")) / 1.2) + 1);
			panInit(e);
		});

		$(close).click(function (e) {
			$(".panWrapper").fadeOut("slow");
		});

		$(panImg).click(function(){
			$(close).click();
		});

		$(panWrapper).on('mousemove touchmove', function (e) {
			panInit(e);
		});

		$("body").keydown(function (e) {
			if (e.keyCode == 27) {
				$(close).click();
			}
		});

		$(panWrapper).mousewheel(function (whellEvent) {

			if (whellEvent.deltaY > 0)
				$(zo).click();
			else
				$(zi).click();

			panInit(whellEvent);

		});

		function panInit(event) {
			event.preventDefault();
			var panImg = $(".panWrapper img.i");
			var panWrapper = $(".panWrapper");

			var w = parseInt(panImg.css("width"));
			var h = parseInt(panImg.css("height"));
			var x = parseInt(panImg.css("left"));
			var y = parseInt(panImg.css("top"));

			var ml = 0 - (w - $(panWrapper).width());
			var mt = 0 - (h - $(panWrapper).height());

			var scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
			var nl = parseInt((ml * parseInt(event.pageX || event.touches[0].pageX)) / parseInt($(panWrapper).width()));
			var nt = parseInt((mt * parseInt((event.pageY || event.touches[0].pageY) - scrollOffset)) / parseInt($(panWrapper).height()));

			if (parseInt($(panWrapper).width()) > w && parseInt($(panWrapper).height()) > h) {
				panImg.css("left", ((parseInt($(panWrapper).width()) - w) / 2));
				panImg.css("top", ((parseInt($(panWrapper).height()) - h) / 2));
			}
			else if (parseInt($(panWrapper).width()) > w) {
				panImg.css("left", ((parseInt($(panWrapper).width()) - w) / 2));
				panImg.css("top", nt);
			}
			else if (parseInt($(panWrapper).height()) > h) {
				panImg.css("left", nl);
				panImg.css("top", ((parseInt($(panWrapper).height()) - h) / 2));
			}
			else {
				panImg.css("left", nl);
				panImg.css("top", nt);
			}
		}

	}
});

(function () {
	var prefix = "", _addEventListener, onwheel, support;

	if (window.addEventListener) {
		_addEventListener = "addEventListener";
	} else {
		_addEventListener = "attachEvent";
		prefix = "on";
	}

	if (document.onmousewheel !== undefined) {
		support = "mousewheel";
	}
	try {
		WheelEvent("wheel");
		support = "wheel";
	} catch (e) { }
	if (!support) {
		support = "DOMMouseScroll";
	}

	window.addWheelListener = function (elem, callback, useCapture) {
		_addWheelListener(elem, support, callback, useCapture);

		if (support == "DOMMouseScroll") {
			_addWheelListener(elem, "MozMousePixelScroll", callback, useCapture);
		}
	};

	function _addWheelListener(elem, eventName, callback, useCapture) {
		elem[_addEventListener](prefix + eventName, support == "wheel" ? callback : function (originalEvent) {
			!originalEvent && (originalEvent = window.event);

			var event = {
				originalEvent: originalEvent,
				target: originalEvent.target || originalEvent.srcElement,
				type: "wheel",
				deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
				deltaX: 0,
				delatZ: 0,
				pageX: originalEvent.pageX,
				pageY: originalEvent.pageY,
				preventDefault: function () {
					originalEvent.preventDefault ?
						originalEvent.preventDefault() :
						originalEvent.returnValue = false;
				}
			};

			if (support == "mousewheel") {
				event.deltaY = - 1 / 40 * originalEvent.wheelDelta;
				originalEvent.wheelDeltaX && (event.deltaX = - 1 / 40 * originalEvent.wheelDeltaX);
			} else {
				event.deltaY = originalEvent.detail;
			}

			return callback(event);

		}, useCapture || false);
	}

	$.fn.mousewheel = function (handler) {
		return this.each(function () {
			window.addWheelListener(this, handler, true);
		});
	};
})(jQuery);
