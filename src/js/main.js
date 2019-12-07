$(document).ready(function() {
    // $(".owl-carousel").owlCarousel({
    //     items: 1,
    //     // loop: true,
    //     dots: false,
    //     smartSpeed: 1500
    // });

    var headerSlider = $("#headerSlider");

    headerSlider.on('initialize.owl.carousel initialized.owl.carousel ', function(e) {
        $('.slide-controls__number-active').text(e.item.index + 1);
        $('.slide-controls__number-total').text(e.item.count);
    });
    headerSlider.owlCarousel({
        items: 1,
        // loop: true,
        dots: false,
        smartSpeed: 1500
    });
    
    $('#headerSliderLeft').click(function() {
        headerSlider.trigger('prev.owl.carousel');
    });

    $('#headerSliderRight').click(function() {
        headerSlider.trigger('next.owl.carousel');
    });

    headerSlider.on('changed.owl.carousel', function(e) {
        $('.slide-controls__number-active').text(e.item.index + 1);
        $('.slide-controls__number-total').text(e.item.count);
    });

// SHOOOOOOOOOOOOOOOOOPPPPPPPPPPP Slider
    var shopSlider = $("#shopSlider");

    // shopSlider.on('initialize.owl.carousel initialized.owl.carousel ', function(e) {
    //     $('.slide-controls__number-active').text(e.item.index + 1);
    //     $('.slide-controls__number-total').text(e.item.count);
    // });
    shopSlider.owlCarousel({
        loop: true,
        dots: false,
        smartSpeed: 500,
        responsive: {
            0: {
                items: 1,
            },
            1254: {
                items: 3,
            }
        }
    });
    
    $('#shopSliderLeft').click(function() {
        shopSlider.trigger('prev.owl.carousel');
    });

    $('#shopSliderRight').click(function() {
        shopSlider.trigger('next.owl.carousel');
    });

    // shopSlider.on('changed.owl.carousel', function(e) {
    //     $('.slide-controls__number-active').text(e.item.index + 1);
    //     $('.slide-controls__number-total').text(e.item.count);
    // });
});