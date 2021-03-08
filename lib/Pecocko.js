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

    var currentPosition = 0;

    function hideName(position, products, id, nb) {
        if (position >= currentPosition * nb) {

            TweenMax.to('.name-product', 0.5, { x: -200, autoAlpha: 0, onComplete: displayName, onCompleteParams: [position, products, id, currentPosition, nb] });
            TweenMax.to('.title-product', 0.5, { x: -200, autoAlpha: 0, onComplete: displayName, onCompleteParams: [position, products, id, currentPosition, nb] });
            TweenMax.to('.content-product', 0.5, { x: -200, autoAlpha: 0, onComplete: displayName, onCompleteParams: [position, products, id, currentPosition, nb] });
        } else {
            TweenMax.to('.name-product', .5, { x: 200, autoAlpha: 0, onComplete: displayName, onCompleteParams: [position, products, id, currentPosition, nb] });
            TweenMax.to('.title-product', .5, { x: 200, autoAlpha: 0, onComplete: displayName, onCompleteParams: [position, products, id, currentPosition, nb] });
            TweenMax.to('.content-product', .5, { x: 200, autoAlpha: 0, onComplete: displayName, onCompleteParams: [position, products, id, currentPosition, nb] });
        }
    }
    function displayName(position, products, id, current, nb) {
        $('.name-product').text(products[id][position]);
        $('.content-product').text(gammesDescription[id][position]);
        if (position >= current * nb) {
            TweenMax.fromTo('.name-product', .5, { x: 200, autoAlpha: 0 }, { x: 0, autoAlpha: 1 });
            TweenMax.fromTo('.title-product', .5, { x: 200, autoAlpha: 0 }, { x: 0, autoAlpha: 1 });
            TweenMax.fromTo('.content-product', .5, { x: 200, autoAlpha: 0 }, { x: 0, autoAlpha: 1 });
        } else {
            TweenMax.fromTo('.name-product', .5, { x: -200, autoAlpha: 0 }, { x: 0, autoAlpha: 1 });
            TweenMax.fromTo('.title-product', .5, { x: -200, autoAlpha: 0 }, { x: 0, autoAlpha: 1 });
            TweenMax.fromTo('.content-product', .5, { x: -200, autoAlpha: 0 }, { x: 0, autoAlpha: 1 });
        }
    }
    var id = 'jus';
    var nbElement = 5;
    var imageCarousel = new Dragdealer('image-carousel-jus', {
        steps: nbElement + 1,
        speed: 0.3,
        loose: true,
        requestAnimationFrame: true,
        dragStopCallback: function dragStopCallback(x, y) {
            var position = x * nbElement;
            hideName(position, products, id, nbElement);
            currentPosition = x;
        }
    });

    var products = {};
    var gammes = {
        jus: "PEKOCKO"
    };
    var gammesDescription = {
        jus: [
            "Sauce sucrée-salée, fumée et légèrement pimentée. Utilisation : Barbecue, poulet grillé, hamburgers, frites, pulled pork, ribs, wings, crevettes",
            "Sauce tomate légèrement pimentée à l’italienne Utilisation : Pâtes, lasagnes, pizza, minestrone, salades de tomate fraiche/mozzarella, ratatouille, plats en sauces à base de tomates.",
            "Sauce très fraiche au goût acidulé, moyennement pimentée. C’est un guacamole avec une belle touche de coriandre fraîche Utilisation : Spécialités mexicaines, ceviches, dips au fromage frais, rillettes de poisson, terrines, saumon fumé, vinaigrettes.",
            "Sauce bien pimentée au poivron fumé, traditionnelle des Balkans (ajvar) Utilisation : Grillades, hot-dogs, hamburgers, paninis, sandwiches, plats en sauces de type goulash",
            "Notre seule sauce pimentée presque 100 % piments, faite pour les vrais fans de piment et les adeptes de sensations très fortes. Utilisation : Grillades, plats en sauce ;",
            "Une SAUCE EXTREME, préparée amoureusement avec le piment des deux piments les plus forts du monde (Carolina Reaper et Trinidad Moruga Scorpion). Pour les FOUS de piment…",
        ]
    };
    products = {
        jus: ['SAUCE BARBECUE PIMENTÉE "RICAIN ENFUMÉ" FORCE 3', 'SAUCE PIQUANTE SICILIEN ENERVÉ FORCE 4', 'SAUCE PIQUANTE MEXICAIN MOUSTACHU FORCE 5', 'SAUCE PIQUANTE SAUVAGE DES BALKANS FORCE 6', 'SAUCE TRÈS PIQUANTE CHASSEUR DE FANTÔMES FORCE 8', 'SAUCE TRÈS PIQUANTE DIABLEMENT DIVINE FORCE 9'],
    };
    function removeSlider(carousel) {
        if (carousel != $('.showing').attr('id')) {
            TweenMax.to(".showing", .5, { x: '500%', onComplete: loadSlider, onCompleteParams: [carousel] });
        }
    }

    function loadSlider(carousel) {
        var loadedSlider = $('.showing').attr('id');
        $('.carousel').removeClass('showing');
        TweenMax.to("#" + loadedSlider, .5, { clearProps: "all" });
        TweenMax.from('#' + carousel, .5, { x: '500%', onStart: function onStart() {
                $('#' + carousel).addClass('showing');
            }, onComplete: function onComplete() {
                TweenMax.set('#' + carousel, { clearProps: "all" });
                nbElement = $('#' + carousel).find('.item').length;
                currentPosition = 0;
                $('.name-product').text(products[id][0]);
                imageCarousel = new Dragdealer(carousel, {
                    steps: nbElement,
                    speed: 0.3,
                    loose: true,
                    requestAnimationFrame: true,
                    dragStopCallback: function dragStopCallback(x, y) {
                        var position = x * (nbElement - 1);
                        hideName(position, products, id, nbElement);
                        hideName(position, gammesDescription, id, nbElement);
                        currentPosition = x;
                    }

                });
                $('.title-product').text(gammes[id]);
                $('.content-product').text(gammesDescription[id][0]);
            } });
    }

    $('.slider-nav').on('click', function (e) {
        e.preventDefault();
        $('.slider-nav').removeClass('active');
        $(this).addClass('active');
        id = $(this).data('carousel');
        var carousel = 'image-carousel-' + $(this).data('carousel');
        removeSlider(carousel);
    });

    
    var step = 1;
    $('.item img').on('click', function () {
        step = $(this).data('step');
        imageCarousel.setStep(step, 1);
        hideName(step - 1, products, id, nbElement);
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
});