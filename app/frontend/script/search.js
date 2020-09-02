import axios from 'axios'

const url = 'http://localhost:3000'

document.addEventListener("turbolinks:load", () => {
  console.log("start")
  const searchForm = document.querySelector(".search-form")
  const searchResult = document.querySelector(".search-result")

  if(searchForm){
    searchForm.addEventListener("submit", (e) => searchUser(e))
    searchForm.addEventListener("keyup", (e) => searchUser(e))
  }

  const searchUser = (e) => {
    e.preventDefault()
    const keyword = searchForm.keyword.value

    searchResult.innerHTML = ''
    console.log("rrrrr")

    axios.get(
      `${url}/api/v1/search.json`, {
      params: {
        keyword: keyword
      }
    })
    .then(response => response.data)
    .then((users) => {
      users.forEach((user) => createUserItem(user))
    })
  }

  const createUserItem = (user) => {
    const t = document.querySelector("#user-item")
    const clone = document.importNode(t.content, true)
    console.log(clone)
    clone.querySelector(".user-link").setAttribute("href", `users/${user.id}`)
    clone.querySelector(".user-avatar").src = user.avatar.url
    clone.querySelector(".user-name").textContent = user.nick_name
    searchResult.appendChild(clone)
  }

})
