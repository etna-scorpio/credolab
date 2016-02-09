$(document).ready(function() {

	function changeTabs() {
		var tabs 			= $('.js-tabs'),
			label 			= $('.js-tabs').find('.js-tabs-label'),
			firstLabel			= label.first(),
			firstLabelIndex = label.first().data('index'),
			content 		= $('.js-tabs').find('.js-tabs-content');

		firstLabel.addClass('is-active');
		content.css('display', 'none');
		content.eq(firstLabelIndex).css('display', 'block');

		label.click(function() {
			var elIndex = $(this).data('index');

			label.removeClass('is-active');
			$(this).addClass('is-active');

			content.css('display', 'none');
			content.eq(elIndex).css('display', 'block');
		});
	}

	function moreNews() {
		$('.js-more-btn').click(function(evt) {
			evt.preventDefault();

			$(this).addClass('is-hidden').parents('.js-more').addClass('is-active');
		});
	}

	function hideElements() {
		$('body').click(function(evt) {
			if ( $(evt.target).parents('.js-more').length > 0 ) {
				return;
			}
			$('.js-more').removeClass('is-active');
			$('.js-more-btn').removeClass('is-hidden');
			$('.js-menu').removeClass('is-active');

			if ( !$('.js-overlay').hasClass('is-active') ) {
				$('.js-header').css('padding-right', '0');
				$('body').css({
					'overflow': 'auto',
					'padding-right': '0'
				});
			}

		});
	}

	function scrollTo() {
		$('.js-link').click(function(evt) {
			evt.preventDefault();

			$('html, body').animate({
				scrollTop: $($(this).attr('href')).offset().top - 105
			}, 500);
		});
	}

	var scrollBarWidth = 0;

	function getScrollBarWidth() {
		var inner = document.createElement('p');
		inner.style.width = '100%';
		inner.style.height = '200px';

		var outer = document.createElement('div');
		outer.style.position = 'absolute';
		outer.style.top = '0px';
		outer.style.left = '0px';
		outer.style.visibility = 'hidden';
		outer.style.width = '200px';
		outer.style.height = '150px';
		outer.style.overflow = 'hidden';
		outer.appendChild(inner);

		document.body.appendChild(outer);

		var w1 = inner.offsetWidth;
		outer.style.overflow = 'scroll';

		var w2 = inner.offsetWidth;
		if (w1 == w2) w2 = outer.clientWidth;

		document.body.removeChild(outer);

		scrollBarWidth = w1 - w2;

		return scrollBarWidth;
	}

	function callPopup() {
		$('.js-show-popup').click(function(evt) {
			$('.js-overlay').addClass('is-active');
			$('.js-popup').addClass('is-active');
			$('body').css({
				'overflow': 'hidden',
				'padding-right': scrollBarWidth
			});
			$('.js-header').css('padding-right', scrollBarWidth);
			return false;
		});

	}

	function hidePopup() {
		$('.js-close').click(function(evt) {
			$(this).closest('.js-overlay').removeClass('is-active');
			$('.js-popup').removeClass('is-active');
			evt.preventDefault();
		});
	}

	function scrollFixedElements() {
		var scrLeft = $(this).scrollLeft();
		$('.js-scroll-left').css({
			left: -scrLeft
		});
	}

	function showMobileMenu() {
		$('.js-btn-menu').click(function() {
			$('.js-menu').addClass('is-active');
			return false;
		});

		$('.js-menu').click(function(evt) {
			if (!$(evt.target).parents('.js-menu').length > 0) {
				evt.stopPropagation();
			}
		});

		$('.js-menu').on('click', '.js-link', function() {
			$(this).parent().siblings().find('.js-link').removeClass('is-active');
			$(this).addClass('is-active');
		});
	}

	function hideMobileMenu() {
		if ( $(window).width() > 1020 && $('.js-menu').hasClass('is-active') ) {
			$('.js-menu').removeClass('is-active');
		}
	}

	function showHeader() {
		var	win 	   = $(window),
			scrollPos  = win.scrollTop(),
			startBlock = $('.js-show-header').offset().top,
			header 	   = $('.js-header');

		if ( scrollPos > startBlock) {
			header.addClass('is-active');
		} else {
			header.removeClass('is-active');
		}
	}

	// animations
	new WOW().init();

	// slick
	$('.js-slider').slick({
		adaptiveHeight: true,
		arrows: false,
		swipe: false
	});

	$('.js-slick-next').click(function(evt) {
		evt.preventDefault();
		$('.js-slider').slick('slickNext');
	});

	$('.js-slick-prev').click(function(evt) {
		evt.preventDefault();
		$('.js-slider').slick('slickPrev');
	});

	// form validation
	(function() {
		var popup   = $('.js-popup'),
			thanks  = $('.js-thanks-popup'),
			overlay = $('.js-overlay'),
			body    = $('body');
		// welcome
		$.validate({
			form: '#popup-form',
			onSuccess: function() {
				post_data = {
					'name': $('#popup-form input[name=name]').val(),
					'tel': $('#popup-form input[name=tel]').val()
				};
				// Ajax post data to server
				$.post('send.php', post_data, function(response) {
					if (response.type == 'error') {
						console.log('error');
					}
					else {
						// reset values in all input fields
						popup.removeClass('is-active');
						thanks.addClass('is-active');
						$('#popup-form').get(0).reset();
						setTimeout(function() {
							thanks.removeClass('is-active');
							$('body').css({
								'overflow': 'auto',
								'padding-right': '0'
							});
							overlay.removeClass('is-active');
							popup.delay(700).addClass('is-active');
						}, 2000);
					}
				}, 'json');
				return false;
			}
		});
		// footer
		$.validate({
			form : '#form',
			onSuccess: function() {
				post_data = {
					'name': $('#form input[name=name]').val(),
					'tel': $('#form input[name=tel]').val(),
					'comment': $('#form input[name=comment]').val()
				};
				// Ajax post data to server
				$.post('send.php', post_data, function(response) {
					if (response.type == 'error') {}
					else {
						popup.removeClass('is-active');
						thanks.addClass('is-active');
						$('#form').get(0).reset();
						setTimeout(function() {
							thanks.removeClass('is-active');
							$('body').css({
								'overflow': 'auto',
								'padding-right': '0'
							});
							overlay.removeClass('is-active');
							popup.delay(700).addClass('is-active');
						}, 2000);
					}
				}, 'json');
				return false;
			}
		});
	}());

	changeTabs();
	moreNews();
	hideElements();
	scrollTo();
	getScrollBarWidth();
	callPopup();
	hidePopup();
	scrollFixedElements();
	showMobileMenu();
	showHeader();

	$(window).scroll(function() {
		scrollFixedElements();
		showHeader();
	});

	$(window).resize(function() {
		hideMobileMenu();
	});
});