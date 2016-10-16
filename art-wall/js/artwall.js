/* Art Wall. By Eric James */

/* var jsonData is assumed to be in global scope */

$(document).ready(function() {

    $('.title').css({
        'opacity': 0
    });
    $('.description').css({
        'opacity': 0
    });

    setTimeout(function() {
        $('.title').css({
            'opacity': 1
        });
    }, 0);
    setTimeout(function() {
        $('.description').css({
            'opacity': 1
        });
    }, 700);
    setTimeout(function() {
        loadImages();
    }, 2000);

    function loadImages() {
        /* On load, take our jsonData and create our image elements and assign their properties */
        $.each(jsonData, function(key, obj) {
            var ele = $('<div class="image"><img src="' + obj.url + '" /></div>');
            $('#canvas').append(ele);
            $(ele).css({
                'top': obj.positionTop,
                'left': obj.positionLeft,
                'transform': 'rotate(' + obj.rotationDegrees + 'deg)',
            });
        });

        /* Now for each element, fade it in */
        $('.image').each(function(i) {
            var element = $(this);
            $(element).css({
                opacity: 0
            });
            setTimeout(function() {
                $(element).css({
                    opacity: 1
                });
            }, i * 200);
        });

        /* On click, popup a window to see more about that image */
        var zIndex = 1;
        $('.image').on('click', function() {
            $(this).toggleClass('opened').css({
                'z-index': zIndex++
            });
        });
    };

    /* Functions ======================================================= */

    /* Toggle buttons so we know whats going on */
    $('button').on('click', function() {
        $('button').removeClass('active');
        $(this).toggleClass('active');
    });

    /* Allows the popup to close */
    $('#close').on('click', function() {
        $(this).parent().fadeOut(500).removeClass('opened');
    })

    /* Line images up in a row */
    $('#lineup').on('click', function() {
        $('.image').each(function(i, ele) {
            $(ele).css({
                left: i * 50 + 'px',
                top: 300 + 'px'
            });
        });
    });

    /* Line images up in a row */
    $('#straightenup').on('click', function() {
        $('.image').each(function(i, ele) {
            $(ele).css({
                transform: 'rotate(0deg)'
            });
        });
    });

    /* Randomize the positions of the images */
    $('#randomize').on('click', function() {
        $('.image').each(function(i, ele) {
            var randomTop = getRandomInteger(0, 400);
            var randomLeft = getRandomInteger(0, 800);
            $(ele).css({
                top: randomTop + 'px',
                left: randomLeft + 'px',
            });
        });
    });

    /* Spin round round baby right round */
    $('#spinnerize').on('click', function() {
        $('.image').each(function(i, ele) {
            var randomDegrees = getRandomInteger(0, 180);
            $(ele).css({
                transform: 'rotate(' + randomDegrees + 'deg)'
            });
        });
    });

    /* Tile images */
    $('#tilelize').on('click', function() {
        var multiplier = 0;
        $('.image').each(function(i, ele) {
            var positionLeft = multiplier * 200;
            var positionTop = 0;
            multiplier++;
            /* Reset multiplier at each interval and reassign position top */
            if (i == 5) {
                multiplier = 0;
            }
            if (i > 5) {
                positionTop = 200;
            }
            if (i == 10) {
                multiplier = 0;
            }
            if (i > 10) {
                positionTop = 400;
            }

            $(ele).css({
                top: positionTop + 'px',
                left: positionLeft + 'px',
            });
        });
    });

});

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}