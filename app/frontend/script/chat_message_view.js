document.addEventListener("turbolinks:load",()=>{
  const message_box = document.querySelector(".message_box")
  if(!message_box)return
  const text_form = document.forms[0]
  const image_form =document.forms[1]
  const text_area = document.getElementById("message_content")
  const image_value= image_form.elements["message[image]"]
  const text_submit = document.querySelector("input[type='submit']")

  text_area.addEventListener("keyup",()=>{
    if(text_area.value !== ""){
      text_submit.classList.remove("none")
      image_form.classList.add("none")
      text_submit.removeAttribute("disabled", false)
    }else{
      text_submit.setAttribute("disabled", true)
      text_submit.classList.add("none")
      image_form.classList.remove("none")
    }
  })

  text_form.addEventListener("submit",(e)=>{
    text_submit.classList.add("none")
    image_form.classList.remove("none")
  })

  image_value.addEventListener("change",()=>{
    image_form.submit()
    image_value.value = ""

  })



})
