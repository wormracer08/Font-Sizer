/*
 * Font Sizer - A jQuery Plugin
 *
 * Examples and documentation at: <http://www.codecompendium.com/tutorials/plugins/>
 *
 * Copyright 2011 Aaron Tennyson <http://www.aarontennyson.com/>
 *
 * Version: 1.0.0 (08/10/2011)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.opensource.org/licenses/GPL-3.0
 */
(function($){
	
	$.fn.fontSizer = function(options) {
						
		// plugin default values
		var defaults = {
			maxSize: 18,			
			minSize: 10,
			increment: 2,
			baseSize: parseInt($('body').css('font-size')),
			controlWrapID: 'control-wrap',
			controls: true,
			autoClass: true,
			textContainerClass: 'fs-text',
			elements: 'h1, h2, h3, h4, p, a, ul',
			controlPlusID: 'fs-plus',
			controlMinusID: 'fs-minus'
		};
			
		// allows user to override plugin defaults
		var options = $.extend({}, defaults, options);
		
		// auto assign .sizeable class to elements in textContainer
		if (options.autoClass) {
			
			$('.'+options.textContainerClass).find(options.elements).addClass('sizeable');			
			
		}
		
		// attempts to determine a base font size from document
		// if not overridden, otherwise defaults to 12px if unsuccsessful
		if (options.baseSize === null) {
			
			options.baseSize = 12;
			//$('.sizeable').css('font-size', options.baseSize+'px');
			//console.log(options.baseSize);
		
		} else if (isNaN(options.baseSize)) {
						
			options.baseSize = 12;
			alert('The base font size could not be determined from the current document. A default value of 12px will be applied to all elements with a class of sizeable.\n\nThis can be changed by setting a font-size value for the body element in your stylesheet or by supplying a baseSize value when you initialize the plugin.'); 
			
		}		
		
		// adds font size controls to document
		if (options.controls) {
			
			$('#'+options.controlWrapID).html('<ul id="controls"><li><a id="fs-minus" href="#" title="Smaller Text"><img src="images/minus.png" height="48" width="48" border="0" alt="Decrease Text Size" /></a></li><li><a id="fs-plus" href="#" title="Larger Text"><img src="images/plus.png" height="48" width="48" border="0" alt="Increase Text Size" /></a></li></ul><div class="clear-both"></div>');
		}				
		
		//console.log(options.baseSize);	
		
		return this.live('click', function(e) {
									
			var $this = $(this);
			var plusOrMinus = $(this).attr('id');
						
			switch (plusOrMinus)
			{
				case options.controlMinusID:
					
					if (options.baseSize > options.minSize) {
						
						// shows button as enabled
						$('#'+options.controlPlusID).children().css('opacity', 1.0);
						
						// iterates over each element with a class of .sizeable and decreases font size by increment amount 
						$.each($('.sizeable'), function() {							
							$(this).css('font-size', parseInt($(this).css('font-size')) - options.increment+'px');
							//console.log(parseInt($(this).css('font-size')));
						});						
						
						options.baseSize = options.baseSize - options.increment;
						
						// shows button as disabled
						if (options.baseSize <= options.minSize) {
							$this.children().css('opacity', 0.5);
						}
						//console.log(options.baseSize);
					}										
					
					break;
				
				case options.controlPlusID:
					
					if (options.baseSize < options.maxSize) {
						
						// shows button as enabled
						$('#'+options.controlMinusID).children().css('opacity', 1.0);
						
						// iterates over each element with a class of .sizeable and increases font size by increment amount 
						$.each($('.sizeable'), function() {							
							$(this).css('font-size', parseInt($(this).css('font-size')) + options.increment+'px');
							//console.log(parseInt($(this).css('font-size')));
						});							
						
						options.baseSize = options.baseSize + options.increment;
						
						// shows button as disabled
						if (options.baseSize >= options.maxSize) {
							$this.children().css('opacity', 0.5);	
						}
						//console.log(options.baseSize);
					}					
					
					break;
					
				default: 
				
					alert('Configuration Error:\n\nThe id attribute of this element is: ' +plusOrMinus+
					'\rIt must match one of the values below.\n\ncontrolMinusID = ' +options.controlMinusID+
					'\ncontrolPlusID = ' +options.controlPlusID);					
				
			}
			
			e.preventDefault();
		});
	};
})(jQuery);