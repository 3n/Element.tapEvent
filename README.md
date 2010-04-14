Element.tapEvent
================

Adds the 'tap' event to Element.Events. This means you can do this:
	
	my_element.addEvent('tap', fn);

How to use
----------
	
Add and remove the event as you would normally. The event will only fire under these conditions: 
	
1. The user starts his touch inside of the element and releases it inside of the element.
2. During the touch start/end sequence, the page does not scroll.