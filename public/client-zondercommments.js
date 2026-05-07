
const commentForm = document.querySelector("form")
const formInput = document.querySelector(".verstuur-knop")
const comments = document.querySelector("#comment-lijst")

commentForm.addEventListener("submit", async function(event) {
    event.preventDefault()

formInput.classList.add("loading") 
formInput.textContent = "Versturen..."
formInput.disabled = true;

let formData = new FormData(commentForm);

const response = await fetch(commentForm.action, {
    method: commentForm.method,
    body: new URLSearchParams(formData)
})

console.log("Response status:", response.status)

const responseData = await response.text()

const parser = new DOMParser()

const responseDOM = parser.parseFromString(responseData, 'text/html')

const newState = responseDOM.querySelector('#comment-lijst')

comments.innerHTML = newState.innerHTML

const nieuwsteComment = responseDOM.querySelector('#comment-lijst p:first-of-type')
if (nieuwsteComment) {
    window.location.hash = nieuwsteComment.id
}

console.log("Loading state weghalen")
formInput.classList.remove("loading")
formInput.classList.add('succes')
formInput.textContent = "✔ Verstuurd"

commentForm.reset()

setTimeout(() => {

formInput.classList.remove('succes')
formInput.textContent = 'Verzenden'

}, 2500)
})