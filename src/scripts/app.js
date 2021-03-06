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
  
  var extensionList = ['.pdf','.doc','.docx','.xls','.xslx','.rtf','.mp4','.srt','.ppt','.pptx'];
  $.each(extensionList, function(index, extension) {
    $('a[href$="' + extension + '"]').click(function(e) {
      var pathName = e.currentTarget.pathname;
      var eventCategory = pathName.substr(pathName.lastIndexOf('.') +1).toUpperCase();
      e.currentTarget.title ? eventLabel = e.currentTarget.title : eventLabel = decodeURI(pathName.substr(pathName.lastIndexOf('/') +1));
      ga('send', 'event', eventCategory, 'Download', eventLabel);
    });
  });
});
