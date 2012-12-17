CSS3 Snowflakes
===============

This is a simple demo of CSS3-based snowflakes. It is based on [the work of Estelle Weyl](http://www.standardista.com/sxsw/) ([@estellevw](http://twitter.com/estellevw/)). These snowflakes are dynamically created on page load and several effects (_e.g. opacity, size, speed_) are randomly added to each snowflake. The [code is available on GitHub](https://github.com/dmolsen/CSS3-Snowflakes).

Demo
----

A [very simple demo of CSS3 snowflakes](http://dmolsen.com/css3-snowflakes/) is currently available.

Browser Support
---------------

The demo should support Safari, Chrome, and Firefox.

Requirements
------------

If you decide you want to initialize the snowflakes in your ```<head>``` tag then you'll need to use a simple library to tell you when the DOM is ready like [domReady](https://github.com/ded/domready). [domReady](https://github.com/ded/domready) is included and used in the distribution.

You may also use snowflakes as an AMD module. To use it this way you must require it using RequireJS for instance.

To Use
------

If you would like to use CSS3 Snowflakes on your own site (_and who wouldn't?_), then you have two choices:

### Traditional way
 simply include ```snowflakes.js``` and ```snowflakes.css``` in your project. Then modify the code below with the ```<div>``` that marks the overall container for your content as well as the ```<div>``` from which your snowflakes will fall:

```javascript
var snowflakes = new Snowflakes(pageContentDiv,snowflakesHolderDiv);
snowflakes.create(someNumber); 
```

and add it to your page to generate the snowflakes.

### AMD way
require ```snowflakes```, then modify the code below with the ```<div>``` that marks the overall container for your content as well as the ```<div>``` from which your snowflakes will fall:

```javascript
 require([
    'js/Snowflakes'
], function (Sf) {
    var snowflakes = new Sf('container','snowflakesContainer');
    snowflakes.create(40);
});
```
and add it to your page to generate the snowflakes.