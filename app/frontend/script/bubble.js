window.addEventListener('turbolinks:load', function () {

  const indexlogo = document.querySelector('#index-logo')
  const home = document.querySelector("#home")
  //btn.addEventListener('click', function () {
  if (!indexlogo) return
  for (var i = 0; i < 20; i++) {
    var d = document.createElement('div');
    d.className = 'bubble';
    var a = Math.random() * 40 + 25 + 'px';  //get the random number
    d.style.width = a;
    d.style.height = a;
    d.style.bottom = Math.random() * 1000 + 'px';  //where bubble come out of bottom of the screen
    d.style.left = Math.random() * home.offsetWidth + 'px';  //where bubble come out of left of the screen
    document.body.appendChild(d); //put d into body
    Animate(d)
  }

  function Animate(a) {

    $(a).animate({
      bottom: home.offsetHeight + 'px',
      left: '+=' + ((Math.random() * 45) - 25) + 'px'  //control the direction of the bubble
    }, Math.random() * 4000 + 2000, 'linear', function () {
      a.style.bottom = '0px'; // where bubble come out of bottom of the screen
      Animate(a)
    });
  }

  gsap.to("#index-logo", { duration: 1.5, y: -150, delay: 2 })
  gsap.from('.login-form', { duration: 1.5, delay: 3, opacity: 0 })

})
