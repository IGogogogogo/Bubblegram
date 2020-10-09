import axios from "axios"
window.addEventListener("turbolinks:load",()=>{
  const followingsBtns = document.querySelectorAll(".user-followings-container .btn-follow a")
  let token = document.querySelector("meta[name=csrf-token]").content
  axios.defaults.headers.common['X-CSRF-Token']= token

  followingsBtns.forEach((followingsBtn)=>{
    if(!followingsBtn)return
    followingsBtn.addEventListener("click",(e)=>{
      e.preventDefault();
      e.stopPropagation();
      let target = e.target.href
      if(e.target.dataset.method === "delete"){
        e.target.classList.remove("cancel-follow")
        e.target.classList.add("follow")
        e.target.textContent = "追蹤"
        e.target.dataset.method = "post"
        axios.delete(target,{
            data: {
              authenticity_token: token,
            }
        })
      }else{
        e.target.classList.remove("follow")
        e.target.classList.add("cancel-follow")
        e.target.textContent = "取消追蹤"
        e.target.dataset.method = "delete"
        axios({
          url: target,
          method: "post"
        })
      }

    })
  })
})
