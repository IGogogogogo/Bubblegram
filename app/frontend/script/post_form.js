document.addEventListener("turbolinks:load", () => {
    ////select2
    $(".taged_users").select2({
      tags: true,
      tokenSeparators: [',', ' '],
    })
})
