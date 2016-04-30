[Fullscreen Image Zoom and Pan with Jquery](http://www.samilhazir.com/pan)
================================

Fullscreen Image Zoom and Pan with Jquery


## Getting Started

Include jQuery and the plugin on a page and initialise the plugin. See demo on <a href="http://www.samilhazir.com/pan" target="_blank">www.samilhazir.com/pan</a>

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="jquery.pan.js"></script>

<script type="text/javascript">

	$(document).ready(function(){
		$(".pan").pan();
	})
</script>
```
Use data-big attribute to point big images

```html
<a class="pan" data-big="img/big1.jpg" href=""><img src="img/small1.jpg" alt="" /></a>
```

## License
Copyright (c) 2016 Samil Hazir
Dual licensed under the GPL and MIT licenses.
