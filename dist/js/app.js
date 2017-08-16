$(function () {

  // Check current URL for main nav
  var currentUrl = window.location.pathname.toLowerCase().substr(1);
  $("nav.dpmc-navigation a").each(function() {
    var href = $(this).attr('href').toLowerCase();
    if (href === currentUrl) {
      $(this).addClass("isActive");
    }
  });

  // Smooth scroll
  $('a.smooth').click(function(event) {
    var speed = 1000;
    var href = $(this).attr("href").split('#')[1]
    if (href) {
      var position = $('#' + href).offset().top - $('.mdl-layout__header-row').css('height').slice(0, 2);
      $(".mdl-layout__content").animate({ scrollTop: position }, speed, "swing");
      event.preventDefault();
    }
  });

  // Skip to main content link
  $(".skip-to-content").click(function (event) {
    console.log(event);
    var skipTo = "#" + this.href.split('#')[1];
    $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
      $(this).removeAttr('tabindex');
    }).focus(); // focus on the content container
  });

});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKSB7XG5cbiAgLy8gQ2hlY2sgY3VycmVudCBVUkwgZm9yIG1haW4gbmF2XG4gIHZhciBjdXJyZW50VXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnRvTG93ZXJDYXNlKCkuc3Vic3RyKDEpO1xuICAkKFwibmF2LmRwbWMtbmF2aWdhdGlvbiBhXCIpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhyZWYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChocmVmID09PSBjdXJyZW50VXJsKSB7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKFwiaXNBY3RpdmVcIik7XG4gICAgfVxuICB9KTtcblxuICAvLyBTbW9vdGggc2Nyb2xsXG4gICQoJ2Euc21vb3RoJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgc3BlZWQgPSAxMDAwO1xuICAgIHZhciBocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKS5zcGxpdCgnIycpWzFdXG4gICAgaWYgKGhyZWYpIHtcbiAgICAgIHZhciBwb3NpdGlvbiA9ICQoJyMnICsgaHJlZikub2Zmc2V0KCkudG9wIC0gJCgnLm1kbC1sYXlvdXRfX2hlYWRlci1yb3cnKS5jc3MoJ2hlaWdodCcpLnNsaWNlKDAsIDIpO1xuICAgICAgJChcIi5tZGwtbGF5b3V0X19jb250ZW50XCIpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHBvc2l0aW9uIH0sIHNwZWVkLCBcInN3aW5nXCIpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFNraXAgdG8gbWFpbiBjb250ZW50IGxpbmtcbiAgJChcIi5za2lwLXRvLWNvbnRlbnRcIikuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgIHZhciBza2lwVG8gPSBcIiNcIiArIHRoaXMuaHJlZi5zcGxpdCgnIycpWzFdO1xuICAgICQoc2tpcFRvKS5hdHRyKCd0YWJpbmRleCcsIC0xKS5vbignYmx1ciBmb2N1c291dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICB9KS5mb2N1cygpOyAvLyBmb2N1cyBvbiB0aGUgY29udGVudCBjb250YWluZXJcbiAgfSk7XG5cbn0pO1xuIl19
