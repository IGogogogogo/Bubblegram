function addAutoResize() {
  document.querySelectorAll('.auto-size-textarea').forEach(function (element) {
    element.style.boxSizing = 'border-box';
    var offset = element.offsetHeight - element.clientHeight;
    element.addEventListener('input', function (event) {
      event.target.style.height = 'auto';
      event.target.style.height = event.target.scrollHeight + offset + 'px';
    });
    element.removeAttribute('.auto-size-textarea');
  });
}

window.addEventListener('turbolinks:load', function () {
  addAutoResize()
})
