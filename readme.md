# jQuery Mobilemenu

jQuery mobile menu is a jquery plugin for turn an unordered list menu 
into dropdown select menu

## Instalation

Just include the script on your html files

```html
<script type="text/javascript" src="jquery.mobilemenu.js"></script>
```

## Usage
After including the script on your html, just write this code somewhere
on your javascript file.

```javascript
$('.menu').mobileMenu();
```

## Options

jQuery mobilemenu have some options:

* `defaultText`: default text for option element

* `className`: Class name for dropdown select menu

* `subMenuClass`: Class name for submenu /* Updated you don't need to add class to sub menu */

* `subMenuDash`: Separator for submenu

* `ignoreHash`: Removes link elements with href="#" from mobile menu

* `ignoreEmpty`: Removes link elements with missing href attribute

* `aIgnoreSelector`: CSS selector for link elements that you want to remove


```javascript
$('.menu').mobileMenu({
	defaultText: 'Navigate to...',
	className: 'select-menu',
	subMenuDash: '&ndash;'
	ignoreHash: true,
	ignoreEmpty: true,
	aIgnoreSelector: '.hideMe, #hiddeThisID, .mmIgnore'
});
```

