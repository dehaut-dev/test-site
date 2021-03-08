"use strict";

jQuery(document).ready(function ($) {
    var firstLoad = true;
    animateTitle();

    TweenMax.from("#wave-1", 8, { morphSVG: "#wave-2" });

    var scrollController = new ScrollMagic.Controller();
    $('.trigger').each(function () {
        var apparition = TweenMax.fromTo(this, 1, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1 });
        var scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            reverse: false
        }).setTween(apparition).addTo(scrollController);
    });

    scrollController.scrollTo(function (newpos) {
        TweenMax.to(window, 1, { scrollTo: { y: newpos } });
    });
    $(document).on('click', "a[href^='#']", function (e) {
        var id = $(this).attr('href');
        if ($(id).length > 0) {
            e.preventDefault();
            scrollController.scrollTo(id);
        }
    });
    $('.split').each(function () {
        var splittedText = new SplitText(this, { type: "lines, chars" });
        var chars = splittedText.chars;
        var tl = new TimelineMax();
        chars.forEach(function (val, index) {
            tl.from(val, 1, { left: 200, autoAlpha: 0 }, index * .05);
        });
        var scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            reverse: false
        }).setTween(tl).addTo(scrollController);
    });

    $('.next').on('click', function () {
        if (!$('.brands').hasClass('second')) {
            $('.brands').addClass('second');
            $('span.current').text('2');
            animateTitle();
            waveMorphHeader();
        } else {
            $('.brands').removeClass('second');
            $('span.current').text('1');
            animateTitle();
            waveMorphHeader();
        }
    });

    $('.goto').on('click', function () {
        $('html, body').animate({
            scrollTop: $("#presentation").offset().top
        }, 1000);
    });

    $('.brand').hover(function () {
        $('.brand').removeClass('active');
        $(this).addClass('active');
        var imgBrand = $('.brand-img').find('img');
        imgBrand.attr('src', $(this).data('src'));
        imgBrand.data('hover', $(this).data('srchover'));
        imgBrand.data('src', $(this).data('src'));
        setTimeout(function () {
            imgBrand.attr('src', imgBrand.data('hover'));
        }, 1000);
    });

    function animateTitle() {
        if (!$('.brands').hasClass('second')) {
            TweenMax.fromTo('#grannys-title', 5, { x: '100%' }, { x: '-20%', onComplete: next });
        } else {
            TweenMax.fromTo('#sipsap-title', 5, { x: '100%' }, { x: '-0%' });
        }
    }

    function next() {
        if (firstLoad) {
            $('.brands').addClass('second');

            $('span.current').text('2');
            animateTitle();
            waveMorphHeader();
            firstLoad = false;
        }
    }

    function waveMorphHeader() {
        if (!$('.brands').hasClass('second')) {
            TweenMax.to("#wave-1", 8, { morphSVG: "#wave-1" });
        } else {
            TweenMax.to("#wave-1", 8, { morphSVG: "#wave-2" });
        }
    }

    var gwt = TweenMax.to('#wave-GT1', 15, { morphSVG: '#wave-GT2' });

    var waveGScene = new ScrollMagic.Scene({
        triggerElement: ".grannysHero",
        duration: '100%'
    }).setTween(gwt).addTo(scrollController);

    var gwb = TweenMax.to('#wave-GB1', 15, { morphSVG: '#wave-GB2' });

    var waveGScene = new ScrollMagic.Scene({
        triggerElement: ".grannysHero",
        duration: '150%'
    }).setTween(gwb).addTo(scrollController);

    var st = TweenMax.to('#wave-ST1', 15, { morphSVG: '#wave-ST2' });

    var waveSScene = new ScrollMagic.Scene({
        triggerElement: ".sipsapHero",
        duration: '100%'
    }).setTween(st).addTo(scrollController);

    var sb = TweenMax.to('#wave-SB1', 15, { morphSVG: '#wave-SB2' });

    var waveSScene = new ScrollMagic.Scene({
        triggerElement: ".sipsapHero",
        duration: '150%'
    }).setTween(sb).addTo(scrollController);

    
    let btn1 = document.getElementById("btn-1");
    let btn2 = document.getElementById("btn-2");
    let btn3 = document.getElementById("btn-3");

    let product = document.getElementById("carr-product");
    let product2 = document.getElementById("carr-product-2");
    let product3 = document.getElementById("carr-product-3");


    btn1.addEventListener("click", event =>{
        btn2.classList.remove("active");
        btn3.classList.remove("active");
        btn1.classList.add("active");

        product.style.display = 'block';
        product2.style.display = 'none';
        product3.style.display = 'none';

        var scrollController = new ScrollMagic.Controller();
    $('.trigger2').each(function () {
        var apparition = TweenMax.fromTo(this, 1, { x: 500, autoAlpha: 0 }, { x: 0, autoAlpha: 1 });
        var scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            reverse: false
        }).setTween(apparition).addTo(scrollController);
    });

    });
    
    btn2.addEventListener("click", event =>{
        btn1.classList.remove("active");
        btn3.classList.remove("active");
        btn2.classList.add("active");

        product.style.display = 'none'
        product2.style.display = 'block'
        product3.style.display = 'none'

        var scrollController = new ScrollMagic.Controller();
    $('.trigger2').each(function () {
        var apparition = TweenMax.fromTo(this, 1, { x: 500, autoAlpha: 0 }, { x: 0, autoAlpha: 1 });
        var scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            reverse: false
        }).setTween(apparition).addTo(scrollController);
    });

    })

    btn3.addEventListener("click", event =>{
        btn1.classList.remove("active");
        btn2.classList.remove("active");
        btn3.classList.add("active");

        product.style.display = 'none';
        product2.style.display = 'none';
        product3.style.display = 'block';

        var scrollController = new ScrollMagic.Controller();
    $('.trigger2').each(function () {
        var apparition = TweenMax.fromTo(this, 1, { x: 500, autoAlpha: 0 }, { x: 0, autoAlpha: 1 });
        var scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            reverse: false
        }).setTween(apparition).addTo(scrollController);
    });

    })

});