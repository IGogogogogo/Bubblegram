window.addEventListener('turbolinks:load', function (e) {
  let post_id = this.data.get('id')
  let num = document.querySelectorAll('.thumb-up strong')
  num.forEach(function (e) {
    console.log(e.target.post_id)
  })
})
