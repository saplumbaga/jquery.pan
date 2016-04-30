jQuery.fn.extend({

    pan: function () {
	
	var panWrapper = document.createElement('div');
	$(panWrapper).addClass("panWrapper");
	
	var panImg=document.createElement('img');
	$(panImg).addClass("i").css("position","absolute");
	
	var zi=document.createElement('a');
	$(zi).addClass("controls in");
	$(panWrapper).append(zi);
	
	var zo=document.createElement('a');
	$(zo).addClass("controls out");
	$(panWrapper).append(zo);
	
	var close=document.createElement('a');
	$(close).addClass("controls close");
	$(panWrapper).append(close);
	
	$(panWrapper).append(panImg);
	$("body").append(panWrapper);
	
	$(this).click(function(e){
		var t=$(this);
        var big = t.attr("data-big");
		$(".panWrapper").show();
        $(".panWrapper img.i").css("width","auto").attr("src",big).load(function(){panInit();});
		return false;
	});
	
	$(zi).click(function(e){
		var panImg=$(".panWrapper img.i");
		panImg.css("width",parseInt( parseInt(panImg.css("width"))*1.2));
		panInit(); 
	});
	
	$(zo).click(function(e){
		var panImg=$(".panWrapper img.i");
		panImg.css("width",parseInt( parseInt(panImg.css("width"))/1.2)+1);
		panInit(); 
	});
	
	$(close).click(function (e) { 
		$(".panWrapper").fadeOut("slow"); 
	});
	
    $(panWrapper).mousemove(function (e) { 
		panInit(); 
	});
	
	$("body").keydown(function (e) {
        if (e.keyCode == 27) {
            $(close).click();
        }
    });
	
	$(panWrapper).mousewheel(function (evt) { 
		if(evt.deltaY>0)
			$(zo).click();
		else
			$(zi).click();
		panInit();
	});
	
	function panInit() {
		
		var panImg=$(".panWrapper img.i");
		var panWrapper=$(".panWrapper");
		
        var w = parseInt(panImg.css("width"));
        var h = parseInt(panImg.css("height"));
        var x = parseInt(panImg.css("left"));
        var y = parseInt(panImg.css("top"));

        var ml = 0 - (w - $(panWrapper).width());
        var mt = 0 - (h - $(panWrapper).height());

        var nl = parseInt((ml * parseInt(event.pageX)) / parseInt($(panWrapper).width()));
        var nt = parseInt((mt * parseInt(event.pageY)) / parseInt($(panWrapper).height()));
		
		if( parseInt($(panWrapper).width())>w && parseInt($(panWrapper).height())>h) {
			panImg.css("left", ((parseInt($(panWrapper).width()) - w)/2));
			panImg.css("top", ((parseInt($(panWrapper).height()) - h)/2));
		}
		else if(parseInt($(panWrapper).width())>w){
			panImg.css("left", ((parseInt($(panWrapper).width()) - w)/2));
			panImg.css("top", nt);
		}
		else if(parseInt($(panWrapper).height())>h){
			panImg.css("left", nl);
			panImg.css("top", ((parseInt($(panWrapper).height()) - h)/2));
		}
		else {
			panImg.css("left", nl);
			panImg.css("top", nt);
		}
    }
	
    }
});

 (function(){
	var prefix = "", _addEventListener, onwheel, support;
	
    if ( window.addEventListener ) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }
 
    if ( document.onmousewheel !== undefined ) {
        support = "mousewheel";
    }
    try {
        WheelEvent("wheel");
        support = "wheel";
    } catch (e) {}
    if ( !support ) {
        support = "DOMMouseScroll";
    }
 
    window.addWheelListener = function( elem, callback, useCapture ) {
        _addWheelListener( elem, support, callback, useCapture );

        if( support == "DOMMouseScroll" ) {
            _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
        }
    };
 
    function _addWheelListener( elem, eventName, callback, useCapture ) {
        elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
            !originalEvent && ( originalEvent = window.event );

            var event = {
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                delatZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };
             
            if ( support == "mousewheel" ) {
                event.deltaY = - 1/40 * originalEvent.wheelDelta;
                originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
            } else {
                event.deltaY = originalEvent.detail;
            }
 
            return callback( event );
 
        }, useCapture || false );
    }

	$.fn.mousewheel = function(handler) {
		return this.each(function() {
			window.addWheelListener(this, handler, true);
		});
	};
 })(jQuery);