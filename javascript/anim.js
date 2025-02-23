// shoutout to cassiecodes for this JS! Go team Skillcrush!
// SimpleSlider is an immediately invoked function expression (IIFE)
// It returns an object with public methods and properties that can be used to configure and control the slider without modifying the source code
// it obscures private functions and variables
const SimpleSlider = (function ($) {

  let slider = {},
    $container,
    $slides,
    $prev,
    $next,
    $dots,
    autoSlideInterval;

  slider.config = {
    slideDuration: 20000,  // Time between slides
    auto: true,           // Auto-slide enabled
    containerSelector: '#simpleSlider',
    slideSelector: 'p',
    prevArrowSelector: '.prev',
    nextArrowSelector: '.next',
    dotsSelector: '.dot'
  };

  slider.init = config => {
    if (config && typeof (config) === 'object') {
      $.extend(slider.config, config);
    }

    $container = $(slider.config.containerSelector);
    $slides = $container.find(slider.config.slideSelector);
    $prev = $(slider.config.prevArrowSelector);
    $next = $(slider.config.nextArrowSelector);
    $dots = $(slider.config.dotsSelector);

    $prev.click(() => {
      clearInterval(autoSlideInterval);
      slider.prev();
      if (slider.config.auto) autoNext();
    });

    $next.click(() => {
      clearInterval(autoSlideInterval);
      slider.next();
      if (slider.config.auto) autoNext();
    });

    $dots.each((i, dot) => {
      $(dot).click(() => {
        clearInterval(autoSlideInterval);
        slider.setSlideByIndex($dots.index(dot));
        if (slider.config.auto) autoNext();
      });
    });

    $($slides[0]).addClass('activeText');
    $($dots[0]).addClass('active');

    if (slider.config.auto) autoNext();
  };

  function autoNext() {
    autoSlideInterval = setInterval(slider.next, slider.config.slideDuration);
  }

  slider.next = () => {
    const activeSlide = $slides.filter('.activeText');
    const activeDot = $dots.filter('.active');
    const currentIndex = $slides.index(activeSlide);

    activeSlide.removeClass('activeText').addClass('prevSlide');
    activeDot.removeClass('active');

    if (currentIndex === $slides.length - 1) {
      $($slides[0]).addClass('activeText').removeClass('nextSlide');
      $($dots[0]).addClass('active');
    } else {
      $($slides[currentIndex + 1]).addClass('activeText').removeClass('nextSlide');
      $($dots[currentIndex + 1]).addClass('active');
    }

    // Clean up previous slide
    setTimeout(() => {
      activeSlide.removeClass('prevSlide');
    }, 500); // Match CSS transition duration
  };

  slider.prev = () => {
    const activeSlide = $slides.filter('.activeText');
    const activeDot = $dots.filter('.active');
    const currentIndex = $slides.index(activeSlide);

    activeSlide.removeClass('activeText').addClass('nextSlide');
    activeDot.removeClass('active');

    if (currentIndex === 0) {
      $($slides[$slides.length - 1]).addClass('activeText').removeClass('prevSlide');
      $($dots[$dots.length - 1]).addClass('active');
    } else {
      $($slides[currentIndex - 1]).addClass('activeText').removeClass('prevSlide');
      $($dots[currentIndex - 1]).addClass('active');
    }

    // Clean up next slide
    setTimeout(() => {
      activeSlide.removeClass('nextSlide');
    }, 500); // Match CSS transition duration
  };

  slider.setSlideByIndex = index => {
    const activeSlide = $slides.filter('.activeText');
    const activeDot = $dots.filter('.active');

    activeSlide.removeClass('activeText');
    activeDot.removeClass('active');

    $($slides[index]).addClass('activeText');
    $($dots[index]).addClass('active');
  };

  return slider;

}(jQuery));

// Initialize the slider with auto-slide enabled
SimpleSlider.init({
  containerSelector: "#wrapper",  // Set your custom container
  auto: true  // Enable auto sliding
});


function typeWrite(target) {
  var textHolder = target.text();
  target.text("");
  var toWrite = "";
  var index = 0;
  var interval = setInterval(function () {
    if (index == textHolder.length) {
      clearInterval(interval);
    } else {
      toWrite += textHolder[index];
      index++;
      target.text(toWrite);
    }
  }, 70)
}

$(function () {
  typeWrite($("#text"));
})

$(window).scroll(function () {
  $(".animation .anm_mod").each(function () {
    const position = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll > position - windowHeight) {
      $(this).addClass("active");
    }
    if (scroll < 100) {
      $(this).removeClass("active");
    }
  });
});

$(function () {
  $('a[href^="#"]').click(function () {
    const speed = 800;
    const href = $(this).attr("href");
    const target = $(href == "#" || href == "" ? "html" : href);
    const position = target.offset().top;
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
});
$(document).ready(function () {

  $(".filter-button").click(function () {
    var value = $(this).attr('data-filter');

    if (value == "all") {
      //$('.filter').removeClass('hidden');
      $('.filter').show('1000');
    }
    else {
      //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
      //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
      $(".filter").not('.' + value).hide('3000');
      $('.filter').filter('.' + value).show('3000');

    }
    if ($(".filter-button").removeClass("active")) {
      $(this).removeClass("active");
    }
    $(this).addClass("active");
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const pageNumbers = document.querySelectorAll('.page-num');

  pageNumbers.forEach(page => {
    page.addEventListener('click', function () {
      // Remove active class from all
      pageNumbers.forEach(p => p.classList.remove('active'));

      // Add active class to the clicked page
      this.classList.add('active');
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const items = Array.from(track.children);

  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
});

$(document).ready(function () {
  $('#loading').hide();
  $('#success-message').hide();

  $('form').on('submit', function (event) {
    $('#loading').show();
    event.preventDefault();
    $(this).addClass('was-validated');
    if (this.checkValidity()) {
      var formData = $(this).serialize();

      $.ajax({
        type: 'POST',
        url: '/emailer/post.php', // Replace with your server endpoint URL
        data: formData,
        success: function (response) {
          $('#loading').hide();
          $('form').removeClass('was-validated');
          $('form')[0].reset();
          $('#success-message').show();
          $('#success-message').html('Thank you for submitting !!');
          // $('#success-message').html(response.message);
        },
        error: function (error) {
          $('#loading').hide();
          $('form')[0].reset();
          $('#success-message').show();
          $('#success-message').html('Thank you for submitting !!');
        }
      });
    }
  });
});
