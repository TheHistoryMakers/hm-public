(function ($, Drupal, window, document, undefined) {

  Drupal.behaviors.hm_public_theme = {
    attach: function (context, settings) {
      constants = Drupal.behaviors.fortytwoMain.constants;

      // Store responsive type
      var body = $('body');
      if (body.hasClass('layout-adaptive')) {
        constants.LAYOUT = {
          fluid: false,
          adaptive: true,
        };
      }
      else if (body.hasClass('layout-fluid')) {
        constants.LAYOUT = {
          fluid: true,
          adaptive: false,
        };
      }
    },
  };

})(jQuery, Drupal, this, this.document);

$('.carousel').carousel({
  interval: 5000,
  pause: "true"
});

$(window).scroll(function() {
});
$('#return-to-top').click(function() {      // When arrow is clicked
  $('body,html').animate({
      scrollTop : 0                       // Scroll to top of body
  }, 500);
});

const $scrollButton = document.querySelector('.scroll');
function scrollStep() {
    // Check if we're at the top already.
    window.scrollTo(0, 0);
}
$scrollButton.addEventListener('click', scrollStep);