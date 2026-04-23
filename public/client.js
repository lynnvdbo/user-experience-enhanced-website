
// met “document.querySelector” zoek je naar een element in de HTML. 
// In dit geval zoek ik naar de form, button en comment lijst
const commentForm = document.querySelector("form")
const formInput = document.querySelector(".verstuur-knop")
const comments = document.querySelector("#comment-lijst")

// met “addEventListener” zorg je ervoor dat er iets gaat gebeuren wat de gebruiker doet. 
// zoals klikken op een knop en een formulier opsturen

// bij mij is nu het geval als iemand op de submit button klikt voer dan deze code uit
commentForm.addEventListener("submit", async function(event) {
    // om de standaard submit van de browser te voorkomen overschrijf je met dit stukje code de default loading state van de browser
    event.preventDefault()


// vervolgens om de loading state te tonen voegen we een classList toe
formInput.classList.add("loading") 
formInput.textContent = "Versturen..."

// formdata voorbereiden
let formData = new FormData(commentForm);

// DATA FETCHEN
// doet een fetch naar server
const response = await fetch(commentForm.action, {
    // dit is de POST method die in mijn HTML staat
    method: commentForm.method,
    // dit heb je nodig omdat server.js anders niet met de formulier data kan werken
    // en die formData  is informatie wat in het form wordt ingevuld
    body: new URLSearchParams(formData)
})

console.log("Response status:", response.status)

// jouw server.js geeft data terug als het posten goed gaat
const responseData = await response.text()

// normaal zou de browser die HTML parsen en weergeven
// maar omdat dit nu in client.-side JS staat moet we dit omzetten naar HTML
// parse de nieuwe HTML en maak onderwater een nieuw document object model
const parser = new DOMParser()

// FromString zegt doe alsof dit een echte pagina is 
// responseData de tekst die van de server kwam
// ‘text/html’ zegt:  behandel dit als HTML (niet als XML of iets anders)
// zet dus de opgehaalde data weer om in HTML code
const responseDOM = parser.parseFromString(responseData, 'text/html')

// Zoek in de onderwater DOM de nieuwe state op
const newState = responseDOM.querySelector('#comment-lijst')

// vervangt HTML met de nieuwe HTML
// en gaan de nieuwe state toevoegen aan de DOM, aan de commentLijst
comments.innerHTML = newState.innerHTML

// dit stukje code zorgt ervoor dat de animatie weer werkt
// zoekt in de onderwater DOM (responseDOM) de eerste p in de comment lijst op
// :first-of-type pakt de eerste p, wat de nieuwste comment is omdat die bovenaan staat
const nieuwsteComment = responseDOM.querySelector('#comment-lijst p:first-of-type')
// controleert of er wel een comment gevonden is, want als er geen comments zijn crasht de code
if (nieuwsteComment) {
    // verander de hash in de URL naar het id van de nieuwste comment
    // bijvoorbeeld: /nieuws/artikel-naam#78
    // dit zorgt ervoor dat de :target animatie in de CSS weer werkt
    // want :target kijkt naar wat er achter de # in de URL staat
    window.location.hash = nieuwsteComment.id
}

// nu kan je waarschijnlijk de loading state vervangen door een success state
console.log("Loading state weghalen")
// loading state weghalen
formInput.classList.remove("loading")
formInput.textContent = "Verstuur"

// maakt het formulier leeg nadat het bericht is verstuurd
commentForm.reset()
})