$(document).on('click', '.js-show-companies-filter', function () {
    $('.companies-filters').slideDown(500);
});

$(document).on('click', '.js-close-companies-filter', function () {
    $('.companies-filters').slideUp(500);
});

$(document).on('click', '.js-show-companies-menu', function () {
    $('.companies-toggle__item_hvr').show();
});

$(document).on('click', '.js-close-popup', function () {
    $('.popup__page').remove();
});

$(document).ready(function () {
    if ($('.companies-toggle__list').length > 0) {
        initTabMenuSwitcher();
        processHash();

        $(document).on('click', function (event) {
            var target = $(event.target);

            if (target.closest('.companies-toggle__item__btn').length === 0) {
                $('.companies-toggle__item_hvr').hide();
            }
        })
    }

    if($('.js-show-calendar').length > 0) {
        $('#datepicker').dateRangePicker({
            separator: '—'
        });

        $('.apply-btn').on('click', function () {
            var value = $('#datepicker').val();

            $('.statistics-header__calendar__date').text(value);
        });
    }

    if ($('.js-show-companies-list').length > 0) {
        $(document).on('click', function (event) {
            var target = $(event.target);
            var dropDown = $('.search-client__wrapper:visible');

            if (target.closest('.js-show-companies-list').hasClass('select-btn__disabled')) {
                return false;
            }

            if (dropDown.length > 0) {
                $('.search-client__wrapper').hide();
                target.closest('.companies-header-names-select').find('.search-client__wrapper').show();
            }

            if (target.closest('.js-show-companies-list').length === 0) {
                $('.search-client__wrapper').hide();
            } else {
                var currentCompanyName = $('.companies-header-names-name').data('name');

                $('.search-client__item[data-value="' +  currentCompanyName + '"]').addClass('inactive');

                target.closest('.js-show-companies-list').find('.search-client__wrapper').show();
            }
        });

        $(document).on('click', '.search-client__item', function () {
            var value = $(this).find('a').text();

            $(this).closest('.js-show-companies-list').find('.js-select-field-result').text(value);
            setTimeout(function (){//hack for ipad (
                $('.search-client__wrapper').hide();
            }, 5)
        });
    }
});

function initTabMenuSwitcher() {
    $(document).on('click', '.companies-toggle__item', function () {
        if ($(this).hasClass('companies-toggle__item__active')) {
            return false;
        }

        $('.companies-toggle__item').removeClass('companies-toggle__item__active');
        $(this).addClass('companies-toggle__item__active');
        $('.companies-list').hide();

        $('.profile-content > div').hide();

        var name = $(this).data('name');
        $('#tab-' + name).show();
    })
}

function processHash() {
    var hash = location.hash.slice(1);
    $('.companies-toggle__item[data-name="' + hash +'"]').click();

    if (hash === 'popup') {
        $('.popup__page').show();
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function initTabMenu () {
    var menuItem = $('.companies-toggle__list > li'),
        dropdownMenuItem = $('.companies-toggle-hvr-list > li'),
        windowWidth = $(window).width(),
        containerWidth = (windowWidth-270),
        itemsVisibleSum = 0,
        itemWidth = 0,
        l = dropdownMenuItem.length;


    if ( containerWidth < 1150  ) {
        itemsVisibleSum = 1;
    }


    if ( containerWidth < 1040  ) {
        itemsVisibleSum = 2;
    }

    if ( containerWidth < 655  ) {
        itemsVisibleSum = 3;
    }

    if (itemsVisibleSum > 0) {
        $('.companies-toggle').addClass('responsive-menu');
        var itemsToHide = l - itemsVisibleSum;
        $('.companies-toggle__item').show();
        $('.companies-toggle-hvr-list > li').hide();

        for (l; l >= itemsToHide; l-- ) {
            $(dropdownMenuItem[l]).show();
            $(menuItem[l]).hide();
        }

        $('.companies-toggle__item__btn').show();
    } else {
        $('.companies-toggle__item').show();
        $('.companies-toggle__item__btn').hide();
        $('.companies-toggle').removeClass('responsive-menu')
    }

    console.log(l, containerWidth, itemsVisibleSum);
}

