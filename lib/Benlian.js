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
    var nbElement = 3;
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
        ajvar: "Rice Snacks",
        jus: "Rocky Rice",
        fruits: "Corn & Rice" 
    };
    var gammesDescription = {
        ajvar: [
            "Bouchées de riz brun soufflé à l’huile d’olive extra vierge et Curcuma. Sans gluten, riche en fibres et en saveurs ! L’en-cas sain et croustillant 100% naturel.",
            "Bouchées de riz brun soufflé à l’huile d’olive extra vierge et Pesto. Sans gluten, riche en fibres et en saveurs ! L’en-cas sain et croustillant 100% naturel.",
            "Bouchées de riz brun soufflé à l’huile d’olive extra vierge et Tomate. Sans gluten, riche en fibres et en saveurs ! L’en-cas sain et croustillant 100% naturel.",
            "Bouchées de riz brun soufflé à l’huile d’olive extra vierge. Sans gluten, riche en fibres et en saveurs ! L’en-cas sain et croustillant 100% naturel.",
        ],
        jus: [
            "Barre de riz soufflé aérée et enrobée d’une subtile couche de chocolat au lait (cacao certifié UTZ culture durable, pour un avenir meilleur) . Croquante, fondante, délicieuse et avec à peine 93 calories : c’est la collation idéale ! Et c’est sans gluten…",
            "Barre de riz soufflé aérée et enrobée d’une subtile couche de chocolat noir 70% (cacao certifié UTZ culture durable, pour un avenir meilleur). Croquante, fondante, délicieuse et avec à peine 92 calories : c’est la collation idéale ! Et c’est sans gluten…",
            "Barre de riz soufflé aérée et enrobée d’une subtile couche de chocolat au lait (cacao certifié UTZ culture durable, pour un avenir meilleur) . Croquante, fondante, délicieuse et avec à peine 93 calories : c’est la collation idéale ! Et c’est sans gluten…",
            "Barre de riz soufflé aérée et enrobée d’une subtile couche de chocolat noir 70% (cacao certifié UTZ culture durable, pour un avenir meilleur). Croquante, fondante, délicieuse et avec à peine 92 calories : c’est la collation idéale ! Et c’est sans gluten…",
        ],
        fruits: [
            "Des chips croustillantes comme on les aime mais en plus, élaborées uniquement à base d’ingrédients naturels – maïs et riz brun. Des chips sans gluten et sans friture, pour un maximum de plaisir !",
            "Des chips croustillantes comme on les aime mais en plus, élaborées uniquement à base d’ingrédients naturels – maïs et riz brun. Des chips sans gluten et sans friture, pour un maximum de plaisir !",
            "Des chips croustillantes comme on les aime mais en plus, élaborées uniquement à base d’ingrédients naturels – maïs et riz brun. Des chips sans gluten et sans friture, pour un maximum de plaisir !",
            "Des chips croustillantes comme on les aime mais en plus, élaborées uniquement à base d’ingrédients naturels – maïs et riz brun. Des chips sans gluten et sans friture, pour un maximum de plaisir !",
            "Des chips croustillantes comme on les aime mais en plus, élaborées uniquement à base d’ingrédients naturels – maïs et riz brun. Des chips sans gluten et sans friture, pour un maximum de plaisir !",    
        ]
    };
    products = {
        ajvar: ['Rice Snacks Curcuma', 'Rice Snacks Pesto', 'Rice Snacks Tomato', 'Rice Snacks Wild Rice',],
        jus: ['Rocky Rice Chocolat au lait x5', 'Rocky Rice Chocolat noir 70% x5', 'Rocky Rice Chocolat au lait x20', 'Rocky Rice Chocolat noir 70% x20',],
        fruits: ['Corn & Rice Chips – Jalapeño & Cheese', 'Corn & Rice Chips - Paprika', 'Corn & Rice Chips - Pizza', 'Corn & Rice Chips - Salted', 'Corn & Rice Chips - Sour Cream & Chive',]
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