// Add your Javascript effects here.

window.addEventListener('load', function() {

  var myCard = document.querySelector('#klausholder');
  var flipButtons = Array.prototype.slice.call(myCard.querySelectorAll('i.flip'));
  
  flipButtons.forEach(function(button) {

    button.addEventListener('click', function() {
     myCard.classList.toggle('flipped');
    });
  });
});