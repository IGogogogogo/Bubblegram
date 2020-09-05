document.addEventListener("turbolinks:load",()=>{
  const image_form =document.forms[1]
  console.log(image_form)
  const text_area = document.getElementById("message_content")
  const text_submit = document.querySelector("input[type='submit']")

  if(text_area.value !== ""){
    text_submit.setAttribute("disable",true)
  }

  text_area.addEventListener("keyup",()=>{
    if(text_area.value !== ""){
      text_submit.classList.remove("none")
      image_form.classList.add("none")
    }else{
      text_submit.classList.add("none")
      image_form.classList.remove("none")
    }
  })


})
