$(document).ready(function() {

	function changeTabs() {
		var tabs 			= $('.js-tabs'),
			label 			= $('.js-tabs').find('.js-tabs-label'),
			firstLabel      = label.first(),
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
		$('.js-more-btn').click(function(e) {
			e.preventDefault();

			$(this).addClass('is-hidden').parents('.js-more').addClass('is-active');
		});
	}

	changeTabs();
	moreNews();

});