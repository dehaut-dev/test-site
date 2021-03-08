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
    var nbElement = 2;
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
        ajvar: "Eau de bouleau Sip Sap",
        jus: "Eau de bouleau Sip Sap",
        fruits: "Eau de bouleau Sip Sap" 
    };
    var gammesDescription = {
        ajvar: [
            "Pour ceux qui aspirent à une vie saine et savoureuse. L’eau de bouleau bio naturelle contient des antioxydants naturels et elle est source de vitamines et minéraux : calcium, potassium, manganèse, sodium, vitamine C, fer, zinc, phénol, acides aminés. Que du bon pour vous !",
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse.  Antioxydante et riche en minéraux, pour petits et grands, au goûter ou après le sport. Un coup de pouce pour votre système immunitaire, une explosion acidulée de vitamines et de minéraux. Aromatisée au jus de cranberry naturel.",
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse. Une saveur connue depuis toujours et récemment redécouverte. De l’eau de bouleau aromatisée à l’extrait de rhubarbe, source de vitamines qui rappelle les souvenirs d’été. Un goût rafraîchissant, doux et acidulé.",
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse. Antioxydante et riche en minéraux, pour petits et grands, au goûter ou après le sport. Fraîche et désaltérante, on l’adore ! Parfaite pour un après-midi ensoleillé !",
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse. Appréciez l’arrière goût du citron vert ainsi que les vertus antioxydantes et aphrodisiaques (oh là là) du gingembre.",
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse. Antioxydante et riche en minéraux, pour petits et grands, au goûter ou après le sport. Délicieusement acide avec encore plus de vitamine C ! Enrichie en jus de citron bio.",
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse. Gourmande et pour toute la famille ! À bien secouer pour mieux savourer les vrais morceaux naturels d’aloe vera."
        ],
        jus: [
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse. Antioxydante et riche en minéraux, pour petits et grands, au goûter ou après le sport. La canette recyclable ? Un format nomade et écologique à adopter d’urgence !",
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse. Antioxydante et riche en minéraux, pour petits et grands, au goûter ou après le sport. La canette recyclable ? Un format nomade et écologique à adopter d’urgence !",
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse. Antioxydante et riche en minéraux, pour petits et grands, au goûter ou après le sport.La canette recyclable ? Un format nomade et écologique à adopter d’urgence !"
        ],
        fruits: [
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse. Antioxydante et riche en minéraux, pour petits et grands, au goûter ou après le sport. Gourmande et pour toute la famille ! À bien secouer pour mieux savourer les vrais morceaux naturels d’aloe vera.",
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse. Antioxydante et riche en minéraux, pour petits et grands, au goûter ou après le sport. Délicieusement acide avec encore plus de vitamine C ! Enrichie en jus de citron bio.",
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse. Appréciez l’arrière goût du citron vert ainsi que les vertus antioxydantes et aphrodisiaques (oh là là) du gingembre.",
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse. Antioxydante et riche en minéraux, pour petits et grands, au goûter ou après le sport. Fraîche et désaltérante, on l’adore ! Parfaite pour un après-midi ensoleillé !",
            "Pour ceux qui aspirent à une vie saine et savoureuse. L’eau de bouleau bio naturelle contient des antioxydants naturels et elle est source de vitamines et minéraux : calcium, potassium, manganèse, sodium, vitamine C, fer, zinc, phénol, acides aminés. Que du bon pour vous !",
            "(Re)-découvrez l'eau de bouleau bio, saine et savoureuse. Une saveur connue depuis toujours et récemment redécouverte. De l’eau de bouleau aromatisée à l’extrait de rhubarbe, source de vitamines qui rappelle les souvenirs d’été. Un goût rafraîchissant, doux et acidulé.",
        ]
    };
    products = {
        ajvar: ['Eau de bouleau bio nature 33cl', 'Eau de bouleau cranberry 33cl', 'Eau de bouleau bio rhubarbe 33cl ', 'Eau de bouleau bio menthe 33cl', "Eau de bouleau bio citron vert Gingembre 33cl", 'Eau de bouleau bio citron 33cl', 'Eau de bouleau bio aloe vera 33cl'],
        jus: [`Canette 25cl Gingembre et Citron Vert `, 'Canette 25cl Menthe', 'Canette 25cl Rhubarbe '],
        fruits: ['Eau de bouleau bio Aloe Vera 1L', 'Eau de bouleau bio Citron 1L', 'Eau de bouleau bio Citron Vert Gingembre  1L', 'Eau de bouleau bio Menthe 1L', 'Eau de bouleau bio Nature 1L', 'Eau de bouleau bio Rhubarbe 1L']
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