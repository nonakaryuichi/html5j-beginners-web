var cm;
if(!cm) {
	cm = {};
} else if(typeof cm != "object") {
	throw new Error("jp already exists and is not an object");
}

cm.init = function() {
	var controller = new cm.controller();
	this.init = function() {
		controller.optionNavOpener();
		controller.idTabs();
		controller.backTopAnchorFade();
		controller.smoothScroll();
		controller.articleItemAccordions();
		controller.socialButton();
		controller.adsAnalytics();
		controller.searchTypeDesignInputs();
		//controller.scrollFollowHeader();
		//controller.intro();
		controller.sectionLayoutMasonry();
	}
}

cm.static = function() {

}

cm.model = function() {

}

cm.controller = function() {
	var model = new cm.model();
}

cm.controller.prototype.sectionLayoutMasonry = function(){
	var $container = $('.multiple_section.masonry');
	
	// initialize
	$container.masonry({
  		itemSelector: '.section'
	});
}

cm.controller.prototype.searchTypeDesignInputs = function(){
	var $searchTypeInputs = $("#searchCategoryInput li");
	var $searchTextInput  = $("#searchKeywordInput input:first");

	var $inputs = $searchTypeInputs.find("input");
	var $labels = $searchTypeInputs.find("label");

	$inputs.change(function(){
		var $this   = $(this);
		var id      = $this.attr("id");
		var state   = $this.prop("checked");
		var $target = $labels.parent().find("label[for='" + id + "']");

		if(state){
			$target.addClass("checked");        
		} else {
			$target.removeClass("checked");
		}
	});

	$searchTypeInputs.each(function(){
		var $item = $(this);

		var $input = $item.find("input");
		var $label = $item.find("label");
		var state  = ($input.prop("checked") || $input.attr("checked"))? true : false;

		//init
		if(state){
			$label.addClass("checked");
		}
	});
}

cm.controller.prototype.adsAnalytics = function() {
	var $supperBanner       = $('#ads ul li a');
	var $articleTextLink    = $('.single_article_contents a.ad');
	var $articleAsideBanner = $('.single_article_aside_ads li a');

	$supperBanner.each(function(){
		var $ad_link = $(this);
		var $ad_name = $ad_link.attr('href');

		$ad_link.click(function(){
			//console.log('click');
			_gaq.push(['_trackPageview','/cm_ads/supper_banner/?=' + $ad_name]);
		});
	});

	$articleTextLink.each(function(){
		var $ad_link = $(this);
		var $ad_name = $ad_link.attr('href');

		$ad_link.click(function(){
			//console.log('click');
			_gaq.push(['_trackPageview','/cm_ads/supper_banner/?=' + $ad_name]);
		});
	});

	$articleAsideBanner.each(function(){
		var $ad_link = $(this);
		var $ad_name = $ad_link.attr('href');

		$ad_link.click(function(){
			//console.log('click');
			_gaq.push(['_trackPageview','/cm_ads/supper_banner/?=' + $ad_name]);
		});
	});
}

cm.controller.prototype.intro = function() {
	introJs().start();
};

cm.controller.prototype.socialButton = function() {
	var $social_buttons = $(".single_article_share_buttons");
	$social_buttons.customSocialButtons();

	var $site_social_buttons = $(".site_share_button_list");
	$site_social_buttons.customSocialButtons();

	var $tax_social_buttons = $(".taxonomy_social_buttons");
	$tax_social_buttons.customSocialButtons();
};

//option nav opener
cm.controller.prototype.optionNavOpener = function() {
	var $navs = $("#optionNavList");
	var $navItems = $navs.find('.nav_item');
	var $popupbox = $('.option_nav_popup_box');
	var $popupclose_button = $('.option_nav_popup_header_menu .menu_item.close a');

	//overlay
	$('body').append('<div id="popupOverlay">');
	var $popupOverlay = $('#popupOverlay');


	var hidden_popup = function close(){
		$popupbox.removeClass('open');
		$popupOverlay.removeClass('show');
	}

	$popupclose_button.each(function(){
		var $this = $(this);
		$this.click(function(){
			console.log('ok');
			hidden_popup();
		});
	});

	$navItems.each(function(){
		var $this = $(this);
		var $anchor = $this.find('a[href^="#"]');

		$anchor.click(function(e){
			e.preventDefault();

			var $this = $(this);
			var targetID = $this.attr('href');

			var $target = $(targetID);
			$popupOverlay.toggleClass('show');
			$target.toggleClass('open');
			
		});
	});

	$popupOverlay.click(function(){
		hidden_popup();
	});
};

cm.controller.prototype.idTabs = function() {
	$(".tab").idTabs();
};


cm.controller.prototype.articleItemAccordions = function() {
	var $articles = $('.article_nav_list .nav_item');

	$articles.each(function(){
		$this = $(this);

		var $accordionButton = $this.find('.accordion_button a');
		var $accordionContents = $this.find('.accordion_contents');

		if($accordionButton.length){
			$accordionButton.click(function(){
				$this = $(this);
				$this.toggleClass('open');
				$this.find('i').toggleClass('icon-rotate-180');
				$accordionContents.toggleClass('open');
			});
		}
	});
}


cm.controller.prototype.backTopAnchorFade = function(){
	var $backTopAnchor = $("#inPageNavList");
	$backTopAnchor.delay(100).fadeOut(300);

	$(window).scroll(function () {
		var bottom_flag = false;

		var document_y = document.documentElement.scrollHeight || document.body.scrollHeight;
		var scroll_y = document.documentElement.scrollTop || document.body.scrollTop;

		var window_y = 0;
		var isSafari = (navigator.appVersion.toLowerCase().indexOf('safari')+1?1:0);
		var isOpera = (navigator.userAgent.toLowerCase().indexOf('opera')+1?1:0);
		if (isOpera) isIE = false;

		if (!isSafari && !isOpera) {
			window_y = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
		} else {
			window_y = window.innerHeight;
		}

		if(bottom_flag && (document_y > scroll_y + window_y)){
			bottom_flag = false;
		}

		if(bottom_flag){
			return;
		}

			// detect the user came to the bottom of the page.
			if(scroll_y > 100){
				/* WRITE ACTION IN THE FOLLOWING LINE! */
				$backTopAnchor.fadeIn(300);

				bottom_flag = true;
			} else {
				$backTopAnchor.fadeOut(300);
			}
		});
}

cm.controller.prototype.scrollFollowHeader = function() {
	var $nav = $("#globalNavs");
	var $onav = $("#optionNavs");
	var $header = $("#globalHeader");
	var bottom_flag = false;

	$(window).scroll(function () {
		var document_y = document.documentElement.scrollHeight || document.body.scrollHeight;
		var scroll_y = document.documentElement.scrollTop || document.body.scrollTop;
		
		var window_y = 0;
		var isSafari = (navigator.appVersion.toLowerCase().indexOf('safari')+1?1:0);
		var isOpera = (navigator.userAgent.toLowerCase().indexOf('opera')+1?1:0);
		if (isOpera) isIE = false;
		
		if (!isSafari && !isOpera) {
		window_y = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
		} else {
		window_y = window.innerHeight;
		}
		
		if(bottom_flag && (document_y > scroll_y + window_y)){
		bottom_flag = false;
		}
		
		if(bottom_flag){
			return;
		}
		
		if(scroll_y > 200){
			$nav.addClass("fixed");
			$onav.addClass("fixed");
			$header.addClass("fixed");
		} else {
			$nav.removeClass("fixed");
			$onav.removeClass("fixed");
			$header.removeClass("fixed");
		}
	});
};

cm.controller.prototype.smoothScroll = function()
{
	var $anchors = $("a[href^='#']").not('.dm_anchor');
	var $doc     = $('body');
	var speed    = 1500;

	$anchors.each(function(){
		var $anchor   = $(this);
		var anchorID  = $anchor.attr("href");
		var $target   = $(anchorID);

		if($target.length){
			$anchor.click(function(e){
				e.preventDefault();

				var targetPositionTop = $target.offset().top - 0;

				$doc.stop().animate({
					scrollTop: targetPositionTop
				},
				{
					duration : speed,
					easing   : 'easeInOutQuart',
					complete : function(){
						location.hash = anchorID;
					}
				});

				return false;
			});
		}
	});

	$('#inPageNavTop a').click(function(e){
		e.preventDefault();

		var targetPositionTop = 0;

		$doc.stop().animate({
			scrollTop: targetPositionTop
		},
		{
			duration : speed,
			easing   : 'easeInOutQuart'
		});
	});

	$('#inPageNavBottom a').click(function(e){
		e.preventDefault();

		var targetPositionTop = $("html").height();

		$doc.stop().animate({
			scrollTop: targetPositionTop
		},
		{
			duration : speed,
			easing   : 'easeInOutQuart'
		});
	});

	$toc = $("#inPageNavTableContents");
	$('#inPageNavTableContents').find('.button').click(function(e){
		e.preventDefault();

		$tocContent = $toc.find('.toc');

		if($tocContent.hasClass('open')){
			$tocContent.removeClass('open');
		} else {
			$tocContent.addClass('open');
		}
	});
	$toc.find('.toc a').click(function(e){
		e.preventDefault();
		$toc.find('.toc').removeClass('open');
	});
}


//initialize
$(function(){
	var controller = new cm.init();
	controller.init();
});