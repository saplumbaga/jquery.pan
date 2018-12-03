[Fullscreen Image Zoom and Pan with Jquery](http://www.samilhazir.com/pan)
================================

Fullscreen Image Zoom and Pan with Jquery


## Getting Started

Include jQuery and the plugin on a page and initialise the plugin. See demo on <a href="http://www.samilhazir.com/pan" target="_blank">www.samilhazir.com/pan</a>

Works with all versions of jQuery, from 1.x to the latest ones.

```html
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="jquery.pan.js"></script>

<script type="text/javascript">
    $(function(){
        $(".pan").pan();
    })
</script>
```
If there's a `data-big` attribute in the element then that URL will be used for the zoomed image. If there's not, then it should be an `<img>` element and the `src` attribute will be used to zoom the image, since a lot of images are limited in size to fit in their container (for example with the `max-width` property). Check out the `index.html` sample file in the repo.

```html
<a class="pan" data-big="img/big1.jpg" href=""><img src="img/small1.jpg" alt="" /></a>
<img class="pan" style="max-width:150px;" src="img/big2.jpg" alt="" />
```

It only adds the zoom capability to images that are **smaller than their natural size**. The `pan()` method filters out the jQuery selection and returns a jQuery selection with the final elements that have been processed to have zoom & pan capabilities. You can further process them as usual with jQuery, for example:

```javascript
$(function(){
    $(".pan").pan().each(function() {
        $(this).attr('title', 'CLICK TO ZOOM');
    });
})
```


## License
Copyright (c) 2016 Samil Hazir
Dual licensed under the GPL and MIT licenses.
