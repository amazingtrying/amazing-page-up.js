/* Amazing Page Up - version 1.0 - 2017-01-19
* Copyright (c) 2017 Shane Luk; Licensed MIT */
var wrapperHeight = 0;
var targetClass = '.section-item';
$.each($(targetClass), function(idx, val) {
    wrapperHeight += $(targetClass).eq(idx).height();
    $(targetClass).eq(idx).css({
        'z-index': (1000 - idx)
    })
});

$('.section-item-wrapper').css({
    'height': wrapperHeight
});
var previousScroll = $(window).scrollTop();
$(window).scroll(function() {
    var idx = $(targetClass).index($('.section-item.active'));
    var order = idx + 1;
    var targetHeight = 0;
    var prevPageTotalHeight = 0;
    var range = 0;
    var height = 0;
    $.each($(targetClass), function(siidx, val) {
        if (siidx <= idx) {
            targetHeight += $(targetClass).eq(siidx).height();
        }

        if(siidx < idx){
           prevPageTotalHeight += $(targetClass).eq(siidx).height();
        }
    });


    if ($(window).scrollTop() > (previousScroll)) {
        height = $(targetClass + '.active').height();
        range = $(window).scrollTop() - (targetHeight - height);
        if (range >= (height)) {
            $(targetClass).css({
                'transform': ''
            });
            if (order != $(targetClass).length) {
                range = 0;
                $(targetClass).removeClass('next');
                $(targetClass).removeClass('prev');
                $(targetClass).removeClass('active');
                $(targetClass).eq(order).addClass('active');
                $(targetClass).eq(order + 1).addClass('next');
                $(targetClass).eq(order - 1).addClass('prev');
            }
        }
    } else {
        height = $(targetClass + '.active').height();
        // range = ($(window).scrollTop() - (targetHeight));
        range = $(window).scrollTop() - prevPageTotalHeight;
        console.log('current target:' + $(window).scrollTop());
        console.log('target:' + targetHeight);
        console.log('guess range:' + ($(window).scrollTop()-targetHeight));   
        console.log('height:' + height);
        console.log('range:' + range);
        console.log(range + '<' + height);
        if ($(window).scrollTop() < (prevPageTotalHeight)) {
            // range = height;
           
            console.log("here");
            $(targetClass).removeClass('next');
            $(targetClass).removeClass('prev');
            $(targetClass).removeClass('active');
            $(targetClass).css({
                'transform': ''
            });
                $(targetClass).eq(order-2).addClass('active');
                $(targetClass).eq(order-1).addClass('next');
                $(targetClass).eq(order-3).addClass('prev');
                
        }
    }
    previousScroll = $(window).scrollTop();
    if (range != 0) {
        $(targetClass + '.active').css({
            '-ms-transform': 'translate(0,-' + range + 'px)',
            '-webkit-transform': 'translate(0,-' + range + 'px)',
            'transform': 'translate(0,-' + range + 'px)'
        });
    }
})