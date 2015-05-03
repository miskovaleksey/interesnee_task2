(function($) {
  var settings, images, defaults, current=$(""), busy=false;

  defaults = {
    imageSelector: '.gallery-images img',
    imageClass: 'gallery-image',
    playClass: 'gallery-play'
  }

  function myNext(ref){
    var image;
    image = ref.next();
    if(image.length == 0){
      image = images.first();
    }
    return image;
  }

  function myPrev(ref){
    var image;
    image = ref.prev();

    if(image.length == 0) {
      image = images.last();
    }
    return image;
  }

  function goToImage(image){
    if (busy) { return; }
    busy = true;
    setTimeout(function () { busy = false; }, 1000);

    var prevRemove, nextRemove, prevAdd, nextAdd, qPrevRemove, qNextRemove,
        qPrevAdd, qNextAdd;

    prevRemove  = myPrev(current);
    nextRemove  = myNext(current);

    prevAdd     = myPrev(image);
    nextAdd     = myNext(image);

    qPrevRemove = myPrev(prevRemove);
    qNextRemove = myNext(nextRemove);

    qPrevAdd    = myPrev(prevAdd);
    qNextAdd    = myNext(nextAdd);

    prevRemove.removeClass('prev');
    nextRemove.removeClass('next');
    prevAdd.addClass('prev');
    nextAdd.addClass('next');

    qPrevRemove.removeClass('qprev');
    qNextRemove.removeClass('qnext');
    qPrevAdd.addClass('qprev');
    qNextAdd.addClass('qnext');

    current.removeClass('active');
    image.addClass('active');

    current = image;
  }

  $.fn.gallery = function(options) {

    this.on('DOMMouseScroll mousewheel', function (event) {

      event = event.originalEvent ? event.originalEvent : event; //convert to originalEvent if possible
      var delta = event.detail ? event.detail : event.wheelDelta //check for detail first, because it is used by Opera and FF

      if(delta > 0) {
         goToImage(myPrev(current));
      }
      else{
        goToImage(myNext(current));
      }

    });

    $(window).on('keyup', function(event){
      if (event.keyCode == 38) {
        goToImage(myNext(current));
      } else if (event.keyCode == 40) {
        goToImage(myPrev(current));
      };
    });

    settings = $.extend(defaults, options);

    this.find(settings.imageSelector)
        .wrap('<figure class="'+settings.imageClass+'">')
    images = this.find('.'+settings.imageClass);
    images.append('<button class="'+settings.playClass+'"></button>');

    goToImage($(images[4]));

    $('<button>')
      .addClass('gallery-go-next')
      .on('click', function () {
        goToImage(myPrev(current));
      })
      .appendTo(this);

    $('<button>')
      .addClass('gallery-go-prev')
      .on('click', function(){

        goToImage(myNext(current));
      })
      .appendTo(this);

    $('.gallery-play')
      .on('click', function () {
        alert('Hi!');
      });

    return this;

  };


}(jQuery));

$(function(){
  $('#gallery').gallery();
})