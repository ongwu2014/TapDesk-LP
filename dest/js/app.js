"use strict";

/*
*
* ============================
* ============================
*
* Include lib:
*
* - webFontLoader.js;
* - preventBehavior.js;
* - svg4everybody.js;
*
* ============================
* ============================
* */

/**
 * @name initHamburger
 * @description Init hamburger logic with animated
 */
var initHamburger = function initHamburger() {

  var btn = document.querySelector("[hamburger-js]"),
      hideScrollContainer = document.querySelectorAll("html, body"),
      mobileContainer = document.querySelector("[mobile-block-js]");

  btn.addEventListener("click", function (ev) {
    var elem = ev.currentTarget;

    elem.classList.toggle("is-active");
    mobileContainer.classList.toggle("is-open");

    hideScrollContainer.forEach(function (val, idx) {
      val.classList.toggle("is-hideScroll");
    });
  });
};

/**
 * @name initHeaderFixed
 * @description Fixing the site header in the scrolling page.
 */
var initHeaderFixed = function initHeaderFixed() {

  var countScroll = $(window).scrollTop(),
      headerElement = $('.header');

  if (countScroll > 10) {
    headerElement.addClass("header--fixed");
  } else {
    headerElement.removeClass("header--fixed");
  }
};

/**
 * @name initPreventBehavior
 * @description
 */
var initPreventBehavior = function initPreventBehavior() {
  var link = document.querySelectorAll("a");

  link.forEach(function (val, idx) {

    val.addEventListener("click", function (e) {
      if (val.getAttribute("href") === "#") {
        e.preventDefault();
      }
    });
  });
};

/**
 * @name initSvg4everybody()
 * @description SVG for Everybody adds external spritemaps support to otherwise SVG-capable browsers.
 */
var initSvg4everybody = function initSvg4everybody() {

  svg4everybody();
};

/**
 * @name initWebFontLoader
 * @description Loading fonts regardless of the source, then adds a standard set of events you may use to control the loading experience... for more details => https://github.com/typekit/fvd
 */
var initWebFontLoader = function initWebFontLoader() {

  WebFont.load({
    google: {
      families: ['Muli:200,300,400,600,700,800,900']
    }
  });

  // const WebFontConfig = {
  //   custom: {
  //     families: [
  //       'Lato:n1,n3,n4,n5,n6,n7,n9'
  //     ]
  //   }
  // };
};

/**
 * @description Window on load.
 */
$(window).on("load", function (ev) {
  initHeaderFixed();
});

/**
 * @description Window on resize.
 */
$(window).on("resize", function (ev) {});

/**
 * @description Window on scroll.
 */
$(window).on("scroll", function (ev) {
  initHeaderFixed();
});

/**
 * @description Document DOM ready.
 */
$(document).ready(function (ev) {
  /**
   *
   * @type {*|jQuery|HTMLElement}
   * @private
   */
  var _document = $(document),
      _window = $(window);

  /**
   * =============================================
   * CALLBACK
   * =============================================
   */

  /**
   *
   * @param selector
   */
  var selectReset = function selectReset(selector) {
    if (selector === undefined) {
      var selector = 'select';
    }

    $(selector).each(function () {
      var valOption = $(this).children('option:selected');

      if (valOption.val() !== '0') {
        $(this).prev('span').addClass("is-choose");
      }

      $(this).prev('span').html(valOption.text());
    });
  };
  /**
   *
   * @param selector
   */
  var initSelect = function initSelect(selector) {
    if (selector === undefined) {
      var selector = 'select';
    }

    selectReset(selector);

    $(selector).on('change', function () {
      selectReset(this);
    });
  };

  /**
   *
   */
  var initPipelinesTabs = function initPipelinesTabs() {
    $('.pipelines__tabs').on('click', function (ev) {
      var elem = $(ev.currentTarget),
          elemID = elem.data('tabs-id');

      var tabsBody = $('.pipelines__tabs-body');

      $('.pipelines__tabs').removeClass('is-active');
      elem.addClass('is-active');

      $('.pipelines__slider-item').removeClass('is-show');
      $('.pipelines__slider-item-' + elemID).addClass('is-show');

      $('.pipelines__tabs-body > div').removeClass('is-active');
      $('.pipelines__tabs-body > div[data-tabs-body="' + elemID + '"]').addClass('is-active');
    });
  };

  /**
   *
   */
  var initVideo = function initVideo() {
    var vid = document.getElementById("video");

    /**
     *
     */
    vid.ontimeupdate = function () {
      var percentage = vid.currentTime / vid.duration * 100;
      $("[progress-video-js] span").css("width", percentage + "%");

      if (percentage === 100) {
        $("[progress-video-js] span").css("width", "0");
        $('[play-video-js]').fadeIn(300);
      }
    };

    /**
     *
     */
    $("[progress-video-js]").on("click", function (ev) {
      var offset = $(ev.currentTarget).offset(),
          left = ev.pageX - offset.left,
          totalWidth = $("[progress-video-js]").width(),
          percentage = left / totalWidth,
          vidTime = vid.duration * percentage;

      vid.currentTime = vidTime;
    });

    /**
     *
     */
    $('[play-video-js]').on('click', function (ev) {
      var elem = $(ev.currentTarget);

      if (!vid.paused) {
        vid.pause();
      } else {
        vid.play();
        elem.fadeOut(300);
      }
    });

    /**
     *
     */
    $(vid).on('click', function () {
      if (!vid.paused) {
        vid.pause();
        $('[play-video-js]').fadeIn(300);
      }
    });
  };

  /**
   * @description Init all method
   */
  var initJquery = function initJquery() {
    // default
    initWebFontLoader();
    initPreventBehavior();
    initSvg4everybody();
    // lib
    // callback
    initSelect();
    initPipelinesTabs();
    initVideo();
    initHamburger();
  };
  initJquery();
});