/**
 * jQuery Mobile Menu
 * Turn unordered list menu into dropdown select menu
 * version 2.0.1  (06-10-2014)
 *
 * CShift Fork
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Documentation
 * 	 original http://github.com/mambows/mobilemenu
 *   
 *   CSHIFT Updates
 *   
 * 	 - support added for hiding link elements with href="#"" in options just set ignoreHash: true|false
 * 	 - support added for hiding link elements with missing href attribute in options just set ignoreEmpty: true|false
 *	 - support added to skip lis containing child:first link element with class set in aIgnoreSelector,
 * 	   default class to ignore '.mm-ignore'
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
                ignoreEmpty: true,
                aIgnoreSelector: '.mm-ignore'   //<a href=".mmIgnore">..</li>
            },
            _liIgnoreClass= 'mm-ignore',
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
                    optSub	= $this.parentsUntil(el,  '.' + settings.subMenuClass ),
                    len	= optSub.length,
                    ignore  = ( settings.ignoreEmpty && $this.attr('href') == "undefined") ||
                              ( settings.ignoreHash && $this.attr('href') == "#")  ||
                              ( $this.is( settings.aIgnoreSelector) ),
                    dash;

                if(ignore){
                    $this.closest('li', el).addClass( _liIgnoreClass );
                }
                else{
                    // if menu has sub menu
                    // el is main menu element
                    if( $this.closest('ul', el).hasClass( settings.subMenuClass ) ) {

                        //var parentIgnore = $this.closest('li', el).hasClass( _liIgnoreSelector );
                        var parentsIgnore = $this.parentsUntil(el,'li.' + _liIgnoreClass),
                            actualDepth = ( parentsIgnore.length ? len - parentsIgnore.length : len + 1 );

                        dash = Array( actualDepth ).join( settings.subMenuDash );
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
