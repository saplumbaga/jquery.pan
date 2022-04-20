# Fullscreen Image Zoom and Pan with Jquery

Original 1.x version written by [Samil Hazir](https://github.com/saplumbaga). Version 2.x and 3.x written by [José M. Alarcón](https://github.com/jmalarcon).

Fullscreen image zoom, pan and rotation plugin for jQuery

Features:

- Automatically add zoom and pan to any images or elements with images
- Auto-pan alongside pointer movement
- Zoom in and out support. You can increase or decrease the zoom level with specific buttons or with the mouse wheel
- Image rotation support with zoom and pan
- Support for mobile devices. You can pan by dragging the zoomed image
- Support from IE10+ and all modern desktop and mobile browsers

## Getting Started

Include jQuery 3.x and the plugin on a page and initialize the plugin. See a working demo at [https://jmalarcon.github.io/jquery.pan/](https://jmalarcon.github.io/jquery.pan/) or check the `index.html` page of this repository. You can also use it as a dependency with `npm` by simply writing:

```
npm i jquery.pan
```

>Works with jQuery 3.0+.

You must include a small CSS, `jquery.pan.css` in the `dist/css` folder (400b bytes gzipped).

```html
<link rel="stylesheet" href="css/jquery.pan.css" />
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="jquery.pan.js"></script>

<script type="text/javascript">
    $(function(){
        $(".pan").pan();
    })
</script>
```

If there's a `data-big` attribute in the element, then that URL will be used for the zoomed image instead of the current image. If there's not a `data-big` attribute, then it should be an `<img>` element and the `src` attribute will be used to zoom the image, since a lot of images are limited in size to fit in their container (for example with the `max-width` property). Check out the `index.html` sample file in the repo:

```html
<a class="pan" data-big="img/big1.jpg" href="#">
   <img src="img/small1.jpg" alt="" >
</a>
<img class="pan" style="max-width:150px;" src="img/big2.jpg" >
```

Therefore you can use it to show images by clicking on elements, even it those don't are images or don't include images.

>**IMPORTANT**: it only adds the zoom capability to images that are **smaller than their natural size** or that have a `data-big` attribute, since small images don't need it. This is by design, since this is not a carrousel kind of viewer, but an individual image viewer.

### Disable image rotation

The `pan()` method takes an optional boolean parameter to indicate if the rotation of images should be allowed or not.

By default it shows the rotation controls:

```js
$(".gallery img").pan();    //Rotation controls are shown and enabled
```

If you call it with a `false` parameter, then the rotation controls will not be shown.

```js
$(".gallery img").pan(false);    //No rotation controls
```

This is useful, for example in blogs or other environments where the images are manually added or reviewed and where images always have the right orientation. In those cases, disabling the rotation controls is a better option.

### Returning value

This `pan()` method filters out the jQuery selection and returns a new jQuery selection with the final elements that have been processed to have zoom & pan capabilities. You can further process them as usual with jQuery, for example:

```javascript
$(function(){
    $(".mainContent img").pan().each(function() {
        $(this).attr('title', 'CLICK TO ZOOM');
    });
})
```

## License
Copyright (c) 2016 Samil Hazir, 2018-2020 José M. Alarcon
Dual licensed under the GPL and MIT licenses.