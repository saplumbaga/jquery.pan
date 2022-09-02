# Fullscreen Image Zoom and Pan with Jquery

>Original 1.x version written by [Samil Hazir](https://github.com/saplumbaga). Later enhanced versions written and maintained by [José M. Alarcón](https://github.com/jmalarcon).

Fullscreen image zoom, pan and rotation plugin for jQuery with support for links in the images.

Features:

- Automatically add zoom and pan to any images or elements with images inside
- Auto-pan alongside pointer movement
- Zoom in and out support. You can increase or decrease the zoom level with specific buttons or with the mouse wheel
- Image rotation support with zoom and pan
- Link button to open links if the image has a wrapping link (in any parent element)
- Support for mobile devices. You can pan by dragging the zoomed image
- Support for all modern desktop and mobile browsers and support for Internet Explorer from version 10
- Just 2KB minified and gzipped

## Getting Started

Include jQuery 3.x and the plugin on a page and initialize the plugin, best after the page has fully loaded. See a working demo at [https://jmalarcon.github.io/jquery.pan/](https://jmalarcon.github.io/jquery.pan/) or check the `index.html` page of this repository. You can also use it as a dependency with `npm` by simply writing:

```bash
npm i jquery.pan
```

You must include a small CSS, `jquery.pan.css` that is in the `dist/css` folder too (536 bytes gzipped).

```html
<link rel="stylesheet" href="css/jquery.pan.css" />
<script src="jquery.min.js"></script>
<script src="jquery.pan.js"></script>

<script type="text/javascript">
    $(function(){
        $(".pan").pan();
    })
</script>
```

If there's a `data-big` attribute in the element, then that URL will be used for the zoomed image instead of the current image. If there's not a `data-big` attribute, then it will zoom any `<img>` element inside the element that has the `pan()` method applied, and then the specific `data-big` or the `src` attributes will be used to zoom the image, since a lot of images are limited in size to fit in their container (for example with the `max-width` property). Check out the `index.html` sample file in the repo:

```html
<a class="pan" data-big="img/big1.jpg" href="#">
   <img src="img/small1.jpg" alt="" >
</a>
<img class="pan" style="max-width:150px;" src="img/big2.jpg" >
```

Therefore you can use it to show images by clicking on elements, even it those don't are images or don't include images.

>**IMPORTANT**: it only adds the zoom capability to images that are **smaller than their natural size** or that have a `data-big` attribute, since small images don't need it. This is by design, since this is not a carrousel kind of viewer, but an individual image viewer.

If a container element is selected to be zoomed, if it contains more than one image, every image will be zoomed and panned independently if there's at least one that needs zoom. In this case all of them will be zoomed, even if they don't need it because they are in their natural size. Check the sample page.

### Disable image rotation

The `pan()` method takes an optional object with options to use for the page. They can only be specified in the first call to the plugin. They will be ignored in further calls so that the behavior of the plugin would be the same in all the images in the same page.

The available properties for this object in this version are:

- **`showRotationControls`**: parameter to indicate if the rotation of images should be allowed or not.
- **`minLoadingTime`**: indicates the minimum amount of time in milliseconds that the loading animation should be shown (by default it shows the images immediately as soon as they are loaded)

By default it shows the rotation controls:

```js
$(".gallery img").pan();    //Rotation controls are shown and enabled
```

If you call it with a `false` value for the `showRotationControls` option, then the rotation controls will not be shown:

```js
 var options = {
        showRotationControls : false,    //The rotation controls shouldn't be shown
        minLoadingTime: 400 //The minimum amount of time in ms the loading animation should be shown (by default it shows the images immediately)
    };
$(".gallery img").pan(options);    //No rotation controls, and images take at least 400ms to be shown
```

This is useful, for example in blogs or other environments where the images are manually added or reviewed and where images always have the right orientation. In those cases, disabling the rotation controls is a better option.

### Links around images

Any images that are wrapped with a link (`<a>` element) will have a button in the viewer to open the link. Try it with any image from the fourth onwards [in the sample page](https://jmalarcon.github.io/jquery.pan/).

The link button in the viewer will use the same `target` attribute as the original wrapping link so that it will open in the right window. For example, if it has a `target="_blank"` attribute, the link button in the viewer will have this too ensuring it opens in a new tab.

The link button in the viewer will use the `title` attribute of the link to show a tooltip.

### Returning value and call chaining

This `pan()` method filters out the jQuery selection and returns a new jQuery selection with the final elements that have been processed to have zoom & pan capabilities. You can further process them as usual with jQuery, for example:

```javascript
$(function(){
    $(".mainContent img").pan().each(function() {
        $(this).attr('title', 'CLICK TO ZOOM');
    });
})
```

### Dynamically add new images

Pan capabilities can be applied to newly added images. An example use case is to display user selected image files.

Just call `pan` on the new images:

```javascript
// img variable is the image element
img.onload = function (){
    $(this).pan();
}
```

## License

Copyright (c) 2016 Samil Hazir, 2018-2022 José M. Alarcon
Dual licensed under the GPL and MIT licenses.
