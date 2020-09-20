document.addEventListener("turbolinks:load",()=>{
  const message_box = document.querySelector(".message_box")
  if(!message_box)return
  // const text_form = document.forms[0]
  const image_form =document.forms[1]
  const text_area = document.getElementById("message_content")
  const image_value= image_form.elements["message[image]"]
  const text_submit = document.querySelector("input[type='submit']")
  const message_text_area = document.querySelector(".message_text_area")

  message_text_area.scrollTop += message_text_area.scrollHeight
  text_area.addEventListener("keyup",()=>{
    // console.log(text_area.value.split(" ").join(""))
    if(text_area.value.split(" ").join("") !== ""){
      text_submit.classList.remove("disappear")
      image_form.classList.add("disappear")
      text_submit.removeAttribute("disabled", false)
    }else{
      text_submit.setAttribute("disabled", true)
      text_submit.classList.add("disappear")
      image_form.classList.remove("disappear")
    }
  })

  image_value.addEventListener("change",()=>{
    image_form.submit()
    image_value.value = ""

  })

    // text_form.addEventListener("submit",(e)=>{
    //   text_submit.setAttribute("disabled", true)
    //   console.log(text_area.value)
    //   text_submit.classList.add("disappear")
    //   image_form.classList.remove("disappear")
    //   message_text_area.scrollTop += message_text_area.scrollHeight
    // })



})
