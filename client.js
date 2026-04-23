
// STAP 1: zoekt het form op 
const commentForm = document.querySelector("form")
// STAP 1: zoekt de button op
const formButton = document.querySelector("form button")
// STAP 1: zoekt de #comment lijst op
const commentLijst = document.querySelector("#comment-lijst")


// STAP 2: Met “addEventListener” zorg je ervoor dat iets gaat gebeuren wat de gebruiker doet. 
// Zoals klikken op een knop of een formulier opsturen

// bij mij is nu het geval als iemand op de submit button klikt voer dan deze code uit
commentForm.addEventListener("submit", async function(event) {
    event.preventDefault()
})