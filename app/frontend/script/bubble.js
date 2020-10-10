window.addEventListener('turbolinks:load', function () {

  const indexlogo = document.querySelector('#index-logo')
  const home = document.querySelector("#home")
  //btn.addEventListener('click', function () {
  if (!indexlogo) return
  for (let i = 0; i < 25; i++) {
    let bubble = document.createElement('div');
    bubble.className = 'bubble';
    let size = Math.random() * 40 + 25 + 'px';  // 取得亂數決定泡泡大小
    bubble.style.width = size;
    bubble.style.height = size;
    bubble.style.bottom = Math.random() * 1000 + 'px';  // 亂數決定泡泡在不同的 bottom 位置產生
    bubble.style.left = Math.random() * home.offsetWidth + 'px';  // 亂數決定泡泡在不同的方向
    home.appendChild(bubble);
    Animate(bubble)
  }

  function Animate(bubble) {

    $(bubble).animate({
      bottom: home.offsetHeight + 'px',
      left: '+=' + ((Math.random() * 50) - 25) + 'px'
    }, Math.random() * 4000 + 2000, 'linear', function () {
      bubble.style.bottom = '0px';
      Animate(bubble)
    });
  }


  // Gsap JS 製作動畫的套件
  gsap.to("#index-logo", { duration: 1.5, y: -150, delay: 2 })
  gsap.from('.login-form', { duration: 1.5, delay: 2.8, opacity: 0 })

})
