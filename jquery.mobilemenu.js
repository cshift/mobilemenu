/**
 * jQuery Mobile Menu 
 * Turn unordered list menu into dropdown select menu
 * version 2.0  (06-10-2014)
 * 
 * CShift Fork
 * 
 * Built on top of the jQuery library
 *   http://jquery.com
 * 
 * Documentation
 * 	 http://github.com/mambows/mobilemenu
 *       CSHIFT Updates
 * 		- support added for hiding list elements with href="#"" in options just set ignoreHash: true|false
 * 		- support added to skip list elements with class set in ignoreSelector,
 * 	          default class to ignore '.mobile-ignore'
 * 
 * 
 * 
 */
(function($){
$.fn.mobileMenu = function(options) {
	
	var defaults = {
			defaultText: 'Navigate to...',
			className: 'select-menu',
			subMenuClass: 'sub-menu',
			subMenuDash: '&ndash;',
			ignoreHash: true,
			ignoreSelector: '.mobile-ignore'
		},
		settings = $.extend( defaults, options ),
		el = $(this);
	
	this.each(function(){
		
		var $el = $(this),
			  $select_menu;

		// ad class to submenu list
		$el.find('ul').addClass(settings.subMenuClass);

		// Create base menu
		var $select_menu = $('<select />',{
			'class' : settings.className + ' ' + el.get(0).className
		}).insertAfter( $el );

		// Create default option
		$('<option />', {
			"value"		: '#',
			"text"		: settings.defaultText
		}).appendTo( $select_menu );

		// Create select option from menu
		$el.find('a').each(function(){
			var $this 	= $(this),
				optText	= '&nbsp;' + $this.text(),
				optSub	= $this.parents( '.' + settings.subMenuClass ),
				len	= optSub.length,
				ignore  = ( settings.ignoreHash && this.href=="#") || (settings.ignoreSelector.length && $this.parents('li').is(settings.ignoreSelector) ) 
				dash;
			
			
			if(!ignore){
				// if menu has sub menu 
				// el is main menu element
				if( $this.parentsUntil(el, 'ul').hasClass( settings.subMenuClass ) ) {
					
					var parentIgnore = ( settings.ignoreSelector.length && $this.closest('li', el).is(settings.ignoreSelector) )
					
					if(parentIgnore){
						var ignoreLength = $this.parentUntil(el,'li').filter(settings.ignoreSelector).length;
						dash= ignoreLength ? Array( len-ignoreLength ).join( settings.subMenuDash ) : "";
					}
					else{
						dash = Array( len+1 ).join( settings.subMenuDash );
					}
					optText = dash + optText;
				}
	
				// Now build menu and append it
				$('<option />', {
					"value"	: this.href,
					"html"	: optText,
					"selected" : (this.href == window.location.href)
				}).appendTo( $select_menu );
			}

		}); // End el.find('a').each

		// Change event on select element
		$select_menu.change(function(){
			var locations = $(this).val();
			if( locations !== '#' ) {
				window.location.href = $(this).val();
			};
		});

	}); // End this.each

	return this;

};
})(jQuery);
