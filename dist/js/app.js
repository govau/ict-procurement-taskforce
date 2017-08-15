(function () {
    'use strict';
    webshims.polyfill('forms');

    $(function () {
        // Check current URL for main nav
        var currentUrl = window.location.href.toLowerCase();
        $("nav.dpmc-navigation a").removeClass("isActive");

        if (currentUrl.indexOf("index") > -1) {
            //$("nav.dpmc-navigation a:contains('Overview')").addClass("isActive");
        }
        else if (currentUrl.indexOf("overview") > -1) {
            $("nav.dpmc-navigation a:contains('Overview')").addClass("isActive");
        }
        else if (currentUrl.indexOf("snapshot") > -1) {
            $("nav.dpmc-navigation a:contains('Snapshot')").addClass("isActive");
        }
        else if (currentUrl.indexOf("rule") > -1) {
            $("nav.dpmc-navigation a:contains('Rules')").addClass("isActive");
        }
        else if (currentUrl.indexOf("capability") > -1) {
            $("nav.dpmc-navigation a:contains('Capability')").addClass("isActive");
        }
        else if (currentUrl.indexOf("culture") > -1) {
            $("nav.dpmc-navigation a:contains('Culture')").addClass("isActive");
        }
        else if (currentUrl.indexOf("submission") > -1) {
            $("nav.dpmc-navigation a:contains('Submissions')").addClass("isActive");
        }
        else {
            $("nav.dpmc-navigation a").removeClass("isActive");
        }

        // Back to top
        /*$(document).scroll(function() {
            var y = $(this).scrollTop();
            if (y > 800) {
                $('.goToTop').fadeIn();
            } else {
                $('.goToTop').fadeOut();
            }
        });
        */


        // Validate Form
        $('form#webform-client-form-ict').each(function (form) {
            var $form = $(this);
            $form.prop('noValidate', true);

            $form.on('submit', function (e) {
                if (!$form.checkValidity()) {
                    event.preventDefault();
                    $form.find('input:invalid, select:invalid, textarea:invalid').eq(0).focus();
                }

                else {
                    //alert("This has been submitted")
                    //dialog.showModal();
                }
            });

            $form.on('focusout', function (e) {
                if ($(e.target).is(':invalid')) {
                    setInvalid(e.target);
                } else {
                    removeInvalid(e.target);
                }
            });

            $form.on('invalid', function (e) {
                setInvalid(e.target);
            });
        });

        function setInvalid(element) {
            var $parent = $(element).parent();

            if (!$parent.hasClass('has-error')) {
                $parent
                    .addClass('has-error')
                    .append('<div class="help-block">' + $.prop(element, 'validationMessage') + '</div>')
                ;
            } else {
                $parent.find('.help-block').html(element.validationMessage);
            }
        }

        function removeInvalid(element) {
            var $parent = $(element).parent();
            if ($parent.hasClass('has-error')) {
                $parent
                    .removeClass('has-error')
                    .find('.help-block')
                    .remove()
                ;
            }
        }


        // Form success dialog
        /*var dialogButton = document.querySelector('.dialog-button');
        var dialog = document.querySelector('#dialog');
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialogButton.addEventListener('click', function () {
            dialog.showModal();
        });
        dialog.querySelector('button:not([disabled])').addEventListener('click', function () {
            dialog.close();
            $("#webform-client-form-ict")[0].reset();
            //window.location.reload();
        });*/



        // Smooth scroll
        $('a.smooth').click(function () {
            var speed = 1000;
            var target = '#' + $(this).attr("href").split('#')[1];
            if (target.length > 0) {
              var position = $(target).offset().top;
              $(".mdl-layout__content").animate({ scrollTop: position }, speed, "swing");
              event.preventDefault();
            }
        });

        // Skip to main content link
        $(".skip-to-content").click(function (event) {
            var skipTo = "#" + this.href.split('#')[1];
            $(skipTo).attr('tabindex', -1).on('blur focusout', function () {
                $(this).removeAttr('tabindex');
            }).focus(); // focus on the content container
        });

    });
})();
