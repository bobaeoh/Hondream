(function (exports) {
  var $selectric; // 셀렉트릭
  var sliderArr = []; // 슬라이드 배열

  $(document).ready(function () {
    // ------------------------ 공통 함수 실행 -----------------------------//
    // 셀렉트박스
    selectric();
    // 헤더 스크롤감지
    scrollHeader();
    // 아코디언 핸들러
    accordionHandler();
    // input active 핸들러
    inputActiveHandler();
    // 달력
    datePicker();
    // 최상단버튼
    floatBtnTop();
    // 스크롤 애니메이션
    scrollAnimation();
    // 탭 컨텐츠
    tabContentController();
    // 평점 선택
    ratingSelectHandler();
    // 글자수 표시 및 제한
    // textLengthCheck();
    // 헤더 높이 감지 컨텐츠간격
    // contentSpaceFn();
    // 숫자 카운팅
    // numberCounter('.number-count');

    // ------------------------ ui 함수 실행 -----------------------------//
    // 언어선택 드롭박스 기능
    langFunc();
    //모바일메뉴 기능
    mobileMenuFunc();
    marqueeFunc();
    //fixed Btn Func
    FixedTest();
    fellowFunc();
    offsetFunc();
    // 탭메뉴 기능
    tabHandler();
    scrollMove();
    videoWidthFunc();
    // 슬라이드
    sliderMaker();
  });

  // ------------------------ ui 함수 -----------------------------//
  function sliderMaker() {
    var exampleSlider = sliderInit('.main-slider', {
      loop: false,
      // slidesPerView: 2
      // centeredSlides: true,
      // spaceBetween: 30,
      // freeMode: true,
      // autoplay: {
      //   delay: 1000,
      //   disableOnInteraction: false,
      //   pauseOnMouseEnter: false,
      // },
      // autoHeight: true,
      pagination: {
        el: '.main-visual-slider .swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.main-visual-slider .swiper-button-next',
        prevEl: '.main-visual-slider .swiper-button-prev',
      },
    });

    var fellowSlider = sliderInit('.fellow-slider', {
      loop: true,
      slidesPerView: 3.5,
      spaceBetween: 22,
      centeredSlides: true,
      // pagination: {
      //   el: $(this).find('.swiper-pagination'),
      //   type: 'fraction',
      // },
      navigation: {
        nextEl: '.fellow-slider .swiper-button-next',
        prevEl: '.fellow-slider .swiper-button-prev',
      },
      breakpoints: {
        // 모바일에서 -> pc
        320: {
          slidesPerView: 1.31,
          spaceBetween: 16,
        },
        1400: {
          slidesPerView: 3.5,
          spaceBetween: 22,
        },
      },
    });
  }
  // ------------------------ ui 함수 -----------------------------//
  //언어선택 드롭박스
  const langFunc = () => {
    const langBtn = $('.header-lang');

    langBtn.on('click', () => {
      langBtn.toggleClass('s-active');
    });
  };

  //mobileMenuFunc
  const mobileMenuFunc = () => {
    const triggerBtn = $('.header-mobile-menu');
    const header = $('.header');
    const body = $('body');

    triggerBtn.on('click', function (e) {
      header.toggleClass('s-active');
      body.toggleClass('s-active');
    });
  };

  //fixed-btn
  const FixedTest = () => {
    const fixedElem = $('.fixed-menu-wrap');
    if (!fixedElem.length) return;
    testFn();

    $(window).scroll(function () {
      testFn();
    });

    function testFn() {
      const footerH = $('.footer').outerHeight();
      const windowH = $(window).outerHeight();
      const docuH = $(document).outerHeight();
      const _result = docuH - windowH - footerH;
      const scrollTop = $(window).scrollTop();
      // console.log('scrollTop', scrollTop);
      // console.log('docuH - windowH - footerH', docuH - windowH - footerH);
      if (scrollTop > docuH - windowH - footerH) {
        fixedElem.css({bottom: Math.abs(_result - scrollTop - 10)});
      } else {
        fixedElem.css('bottom', '10px');
      }
    }
  };

  const fellowFunc = () => {
    const fixedElem = $('.float-btn-top');
    if (!fixedElem.length) return;
    testFunc();

    $(window).on('scroll', function () {
      testFunc();
    });

    function testFunc() {
      const scrollTop = $(window).scrollTop();
      const footerH = $('.footer').outerHeight();
      const windowH = $(window).outerHeight();
      const docuH = $(document).outerHeight();
      const moW = 1200;
      const _result = docuH - windowH - footerH - $('.fixed-menu-wrap').outerHeight();
      if (scrollTop > _result) {
        fixedElem.css({bottom: Math.abs(_result - scrollTop - 20)});
      } else {
        if ($(window).width() > moW) {
          fixedElem.css('bottom', '10px');
        } else {
          fixedElem.css('bottom', '94px');
        }
      }
    }
  };

  const offsetFunc = () => {
    const _elem = $('.test-btn');
    if (!_elem.length) return;
    changeBg();

    $(window).on('scroll', function () {
      changeBg();
    });

    function changeBg() {
      // 섹션의 처음을 지날 때
      const scrollTop = $(window).scrollTop();
      const windowH = $(window).outerHeight();
      const docuH = $(document).outerHeight();
      const elemTop = $('.main-benefits').offset().top;

      console.log('windowHeight', windowH);
      console.log('scrollTop', scrollTop);
      console.log('elemTop', elemTop);

      if (scrollTop >= elemTop - _elem.outerHeight()) {
        _elem.css('background', 'dodgerblue');
      } else {
        _elem.css('background', 'red');
      }
    }
  };

  const tabHandler = () => {
    const menuItem = $('.function-item');
    menuItem.on('click', function (e) {
      e.preventDefault();
      // 클릭 이벤트
      const tabAttr = $(this).attr('data-tab');

      $('#' + tabAttr)
        .addClass('s-active')
        .siblings()
        .removeClass('s-active');

      $(".function-item[data-tab='" + tabAttr + "']")
        .addClass('s-active')
        .siblings()
        .removeClass('s-active');
    });
  };

  const scrollMove = () => {
    const menuElem = $('.menu-item a');
    menuElem.on('click', function () {
      const _offset = $('.sub-dream-tab').offset().top;
      const $doc = $('html, body');

      $doc.animate(
        {
          scrollTop: _offset,
        },
        300
      );
    });
  };

  const marqueeFunc = () => {
    $('.marquee_text').marquee({
      direction: 'left',
      duration: 25000,
      gap: 50,
      // delayBeforeStart: 200,
      duplicated: true,
      // startVisible: true,
    });
  };

  const videoWidthFunc = () => {
    const _target = $('.dream-video-wrap');
    ScrollTrigger.matchMedia({
      '(min-width: 1281px)': function () {
        gsap.to('.dream-video-wrap .img-wrap', {
          scrollTrigger: {
            trigger: '.dream-video-wrap',
            scrub: true,
            pin: true,
            // markers: true,
            start: '30% center',
            end: () => `+=${_target.outerHeight()}`,
          },
          width: '100%',
        });
      },
      '(max-width: 1280px)': function () {
        gsap.to('.dream-video-wrap .img-wrap', {
          scrollTrigger: {
            trigger: '.dream-video-wrap',
            scrub: true,
            pin: true,
            // markers: true,
          },
          width: '100%',
          height: '100vh',
        });
      },
    });
  };

  // ------------------------ 공통 함수(공통함수의 수정이 필요한 경우 공유 후 작업) ---------------------------//

  // 타겟 외 클릭시 닫기 함수
  function bodyToggleFn(target, element, callback) {
    $('body').on('click', function (e) {
      if ($(e.target).closest(target).length < 1 && $(e.target).closest(element).length < 1) {
        callback();
      }
    });
  }

  // 팝업 컨트롤러
  var layerPopup = {
    popupArr: [],
    zIndex: 999,
    // 특정 팝업 열기
    openPopup: function (popupId, dimFlag) {
      var $popupEl = $('#' + popupId);
      var _ = this;
      var $closeBtn = $popupEl.find('.popup-close');
      var $popupContainer = $popupEl.find('.popup-container');
      // 팝업 배열에 담기
      _.popupArr.push($popupEl);

      // 팝업 오픈
      $popupEl.addClass('open').css({
        zIndex: _.zIndex + _.popupArr.length,
      });

      // 팝업 위에 팝업띄울때 dim처리
      if (_.popupArr.length > 1) {
        $popupEl.css('background-color', 'rgba(0,0,0,0.5)');
      }

      // body 스크롤 막기
      $('body').addClass('scroll-disable');
      if (!$('.layer-popup-dim').length) {
        // dim없을경우 생성
        $('body').append('<div class="layer-popup-dim"></div>');
      }

      $('.layer-popup-dim').addClass('show');

      // 팝업닫기 눌렀을때
      $closeBtn.off('click');
      $closeBtn.on('click', function (e) {
        e.preventDefault();
        _.closePopup();
      });

      if (!dimFlag) {
        // dim 클릭시 팝업 전부 닫기
        $popupEl.off('click');
        $popupEl.on('click', function (e) {
          if (!$(e.target).closest($popupContainer).length) {
            _.closePopup();
          }
        });
      }
    },
    // 특정 팝업 닫기
    closePopup: function (popupId) {
      var _ = this;
      var $popupEl = popupId ? $('#' + popupId) : _.popupArr[_.popupArr.length - 1];
      $popupEl.removeClass('open');
      _.popupArr = _.popupArr.filter(function (item) {
        return item.attr('id') !== $popupEl.attr('id');
      });
      if (_.popupArr.length === 0) {
        $('.layer-popup-dim').removeClass('show');
        $('body').removeClass('scroll-disable');
      }
    },
    // 모든 팝업 닫기
    closeAllPopup: function () {
      var _ = this;
      for (var i = 0; i < _.popupArr.length; i++) {
        _.popupArr[i].removeClass('open');
      }
      _.popupArr = [];
      $('body').removeClass('scroll-disable');
      $('.layer-popup-dim').removeClass('show');
    },
  };

  // 모바일 햄버거 메뉴 컨트롤러
  var mobileMenuController = {
    // 메뉴 하나로 열기&닫기 사용시
    toggle: function (btn, menuName, bodyFlag) {
      $(btn).toggleClass('active');
      $(menuName).toggleClass('open');
      // 기본적으로 body스크롤 금지, true줄경우 body스크롤 허용
      if (!bodyFlag) {
        $('body').toggleClass('scroll-disable');
      }
    },
    // 메뉴 열기
    open: function (btn, menuName, bodyFlag) {
      $(btn).addClass('active');
      $(menuName).addClass('open');
      if (!bodyFlag) {
        $('body').addClass('scroll-disable');
      }
    },
    // 메뉴 닫기
    close: function (btn, menuName, bodyFlag) {
      $(btn).removeClass('active');
      $(menuName).removeClass('open');
      if (!bodyFlag) {
        $('body').removeClass('scroll-disable');
      }
    },
  };

  // 스크롤 이동 함수
  function scrollMoveTo(id, between, speed) {
    var _speed = speed ? speed : 300;
    if (id) {
      var _id = id.replace('#', '');
      if (!$('#' + _id).length) return;
      var offset = $('#' + _id).offset().top;
      var _between = between ? between : 0;
      $('html, body').animate({scrollTop: offset - _between}, _speed);
    } else {
      $('html, body').animate({scrollTop: 0}, _speed);
    }
  }

  function scrollHeader() {
    headerScrollFn();
    $(window).on('scroll', function () {
      headerScrollFn();
    });

    function headerScrollFn() {
      var _sct = $(window).scrollTop();
      if (_sct > 0) {
        $('#header').addClass('scroll');
      } else {
        $('#header').removeClass('scroll');
      }
    }
  }

  // 슬라이드 생성
  function sliderInit(element, option) {
    if (!$(element).length) return;

    var slider = new Swiper(element, option);
    sliderArr.push(slider);
    return slider;
  }

  // 슬라이드 update(새로고침)
  function sliderUpdate() {
    if (sliderArr[0].length) {
      $.each(sliderArr[0], function (i) {
        sliderArr[0][i].update();
      });
    }
  }

  function selectric() {
    $selectric = $('.selectric');
    if (!$selectric.length) return;
    $selectric.selectric({
      nativeOnMobile: false,
      onInit: function (event, selectric) {
        var $this = $(this);
        initSelectric($this, selectric);
      },
      onRefresh: function (event, selectric) {
        var $this = $(this);
        initSelectric($this, selectric);
      },
      onChange: function () {
        // 셀렉트릭 작동시 select박스 change 트리거
        $(this).trigger('change');
        // float 라벨 있을경우
        if ($(this).hasClass('float')) {
          if ($(this)[0].value) {
            $(this).closest('.selectric-container').addClass('active');
          } else {
            $(this).closest('.selectric-container').removeClass('active');
          }
        }
      },
      onOpen: function () {},
      onClose: function () {},
    });

    // 초기 셋팅 함수
    function initSelectric(target, selectric) {
      // 필수항목일경우
      if (target.hasClass('required') && !target[0].value) {
        selectric.elements.label.append('<span class="required">*</span>');
      }
      // float 라벨 있을경우
      if (target.hasClass('float')) {
        if (target[0].value) {
          target.closest('.selectric-container').addClass('active');
        }
      }
    }
  }

  // 셀렉트릭 새로고침
  function refreshSelectric() {
    $selectric.selectric('refresh');
  }

  function accordionHandler() {
    var accordionContainer = $('.accordion-container');
    if (!accordionContainer.length) return;
    $('body').on('click', '.accordion-header', function () {
      var $this = $(this);
      var _speed = $this.closest('.accordion-container').attr('data-speed');
      _speed = _speed ? parseInt(_speed) : 200;
      accordionFn($this, _speed);
    });
  }

  function accordionFn(el, speed) {
    speed = speed ? speed : 200;
    // 컨테이너에 solo 클래스가 있으면 각각 토글됨
    if (el.closest('.accordion-container').hasClass('solo')) {
      el.closest('.accordion-list').toggleClass('active').find('.accordion-body').stop().slideToggle(speed);
    } else {
      el.closest('.accordion-list').toggleClass('active').find('.accordion-body').stop().slideToggle(speed).closest('.accordion-list').siblings('.accordion-list').removeClass('active').find('.accordion-body').slideUp(speed);
    }
  }

  function tabContentController() {
    var $tabs = $('.ui-tab-item');
    if (!$tabs.length) return;
    $tabs.on('click', function (e) {
      e.preventDefault();
      var $tab = $(this);
      var _id = $tab.find('a').attr('href');

      $tab.addClass('active').siblings('.ui-tab-item').removeClass('active');
      $(_id).show().siblings('.ui-tab-content').hide();
    });
  }

  function inputActiveHandler() {
    var $inputs = $('.input-active');
    if (!$inputs.length) return;

    $inputs.each(function () {
      var $this = $(this);
      var $inputcover = $this.closest('.input-cover');
      if ($this.is('[readonly]') && !$this.hasClass('datepicker-input')) {
        $inputcover.removeClass('active');
        $inputcover.addClass('disable-active');
      } else {
        $inputcover.removeClass('disable-active');
        if ($this.val().length) {
          $inputcover.addClass('active');
        }
      }
    });

    $(document).on('focus change', '.input-active', function (e) {
      var $this = $(this);
      var $inputcover = $this.closest('.input-cover');
      if (!$this.is('[readonly]')) {
        $inputcover.addClass('focus');
        $inputcover.addClass('active');
        $inputcover.removeClass('disable-active');
      }
      if ($this.hasClass('datepicker-input')) {
        $inputcover.addClass('active');
      }
    });

    $(document).on('focusout change', '.input-active', function (e) {
      var $this = $(this);
      var $inputcover = $this.closest('.input-cover');
      var setTimeHandle = setTimeout(function () {
        if (!$this.hasClass('open-datepicker')) {
          $inputcover.removeClass('focus');
          clearTimeout(setTimeHandle);
        }
      }, 100);
      if (!$this.val().length) {
        if (!$this.hasClass('open-datepicker')) {
          $inputcover.removeClass('active');
        }
      }
    });
  }

  function datePicker() {
    var $dateEl = $('.datepicker-input');
    if (!$dateEl.length) return;
    $dateEl.each(function () {
      var $this = $(this);
      if ($this.hasClass('month')) {
        $this.monthpicker({
          monthNames: ['1월(JAN)', '2월(FEB)', '3월(MAR)', '4월(APR)', '5월(MAY)', '6월(JUN)', '7월(JUL)', '8월(AUG)', '9월(SEP)', '10월(OCT)', '11월(NOV)', '12월(DEC)'],
          monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          changeYear: true,
          yearRange: '-60:+0',
          dateFormat: 'yy-mm',
        });
      } else {
        $this.datepicker({
          changeMonth: true,
          changeYear: true,
          yearRange: '-80:+10',
          beforeShow: function () {
            $(this).addClass('open-datepicker');
          },
          onClose: function () {
            $(this).removeClass('open-datepicker');
          },
        });
      }
    });
  }

  function floatBtnTop() {
    $('.float-btn-top').on('click', function () {
      scrollMoveTo();
    });
  }

  function scrollAnimation() {
    var $element = $('.scroll-animate');
    if (!$element.length) return;
    $element.each(function (i) {
      var $this = $(this);
      var delay = $this.attr('data-delay');
      if (delay) {
        $this.css('animation-delay', delay + 's');
      }
      var setTimeHandler = setTimeout(function () {
        animationFn($this);
        clearTimeout(setTimeHandler);
      }, 400);
      $(window).on('scroll', function () {
        animationFn($this);
      });
    });

    function animationFn(element) {
      var _offset = element.offset().top;
      var _sct = $(window).scrollTop();
      var _windowHeight = $(window).height();

      if (_sct + _windowHeight / 1.2 >= _offset) {
        var animationName = element.attr('data-animation') || 'fade-in-bottom';

        element.addClass(animationName);
      }
    }
  }

  function textLengthCheck() {
    var $lengthCheckCover = $('.length-check-cover');
    if (!$lengthCheckCover.length) return;
    var $textElement = $lengthCheckCover.find('.length-check-item');
    $textElement.each(function () {
      setTextCount($(this));
    });
    $('body').on('keyup', '.length-check-item', function () {
      setTextCount($(this));
    });

    function setTextCount(el) {
      var _maxLength = el.attr('data-maxLength');
      var _textLength = el.val().length;
      if (_textLength > _maxLength) {
        _textLength = _maxLength;
      }
      el.val(el.val().substr(0, _maxLength));
      el.closest('.length-check-cover')
        .find('.count')
        .text(Number(_textLength).toLocaleString() + '/' + Number(_maxLength).toLocaleString());
    }
  }

  function contentSpaceFn() {
    var $content = $('#content');
    var setTimeHandler = null;
    if (!$('#header').length) return;
    if ($content.hasClass('space')) {
      setTimeHandler = setTimeout(function () {
        var _headerHeight = $('#header').outerHeight();
        $content.css('paddingTop', _headerHeight);
        clearTimeout(setTimeHandler);
      }, 150);
    }
  }

  function ratingSelectHandler() {
    var container = $('.rating-select-container');
    var inputs = container.find('input[type="radio"]');
    var labels = container.find('label');
    inputs.on('change', function () {
      if ($(this).prop('checked')) {
        labels.each(function () {
          $(this).removeClass('checked');
        });
        $(this).next('label').addClass('checked').prevAll('label').addClass('checked');
      }
    });
  }

  // 숫자 카운팅
  function numberCounter(target) {
    var items = $(target);
    if (!items.length) return;
    gsap.from(items, {
      textContent: 0,
      duration: 3,
      ease: 'power1.in',
      snap: {textContent: 1},
      stagger: {
        each: 1,
        onUpdate: function () {
          this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
        },
      },
    });
  }

  // 콤마 생성
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // ------------------------ 공통 함수 ---------------------------//

  // js 함수 외부사용을 위함

  // 팝업함수
  exports.layerPopup = layerPopup;
  // 모바일메뉴
  exports.mobileMenuController = mobileMenuController;
  // 숫자 카운팅
  exports.numberCounter = numberCounter;

  // --- 비동기 실행후 재실행 함수 모음 -- //
  // 슬라이드 업데이트
  exports.sliderUpdate = sliderUpdate;
  // 셀렉트릭 새로고침
  exports.refreshSelectric = refreshSelectric;
  // 셀렉트릭 생성
  exports.selectric = selectric;
  // --- 비동기 실행후 재실행 함수 모음 -- //
})(this);
