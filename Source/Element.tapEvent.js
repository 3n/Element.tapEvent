/*
--- 
provides: 
- Element.tapEvent
license: MIT-style
requires: 
  core/1.2.3: 
  - Element.Event
  - Element.Dimensions
description: Adds element.addEvent('tap', fn).
authors: 
- 3n
...
*/

['touchstart', 'touchmove', 'touchend'].each(function(type){
  Element.NativeEvents[type] = 2;
});

Element.Events.tap = {
  tapEventActiveClass : 'tapEventActive',
  
  onAdd: function(fn){
    var startScrollY,
        activeClass = Element.Events.tap.tapEventActiveClass;
        
    var cancelTap = function(){
      this.removeClass(Element.Events.tap.tapEventActiveClass);
      this.removeEvent('touchend', endFn);
      this.removeEvent('touchmove', scrollFn);
    };
    var startFn = function(event){
      startScrollY = window.pageYOffset;
      this.addClass(Element.Events.tap.tapEventActiveClass)
          .addEvent('touchend', endFn)
          .addEvent('touchmove', scrollFn);
    };
    var endFn = function(event){
      this.removeClass(activeClass);
      fn.call(this);
    };
    var scrollFn = function(event){
      var pageX = event.event.touches[0].pageX,
          pageY = event.event.touches[0].pageY,
          left  = this.getLeft(),
          top   = this.getTop();

      if (startScrollY !== window.pageYOffset 
          || !(pageX > left && pageX < left + this.getWidth())
          || !(pageY > top && pageY < top + this.getHeight())){
            cancelTap.call(this);
      }
    };
    
    this.addEvent('touchstart', startFn);
    if (Element.Events.swipe) this.addEvent('swipe', cancelTap);
    
    var tapAddedEvents = {};
    tapAddedEvents[fn] = {
      'touchend'   : endFn,
      'touchstart' : startFn,
      'touchmove'  : scrollFn
    };
    this.store('tapAddedEvents', tapAddedEvents);
  },
  
  onRemove: function(fn){
    $H(this.retrieve('tapAddedEvents')[fn]).each(function(v,k){
      this.removeEvent(k,v);
    }, this);
  }
};