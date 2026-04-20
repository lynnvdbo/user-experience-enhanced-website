// console.log('Hier komt je server voor Sprint 10.')





// console.log('Gebruik uit Sprint 9 alleen de code die je mee wilt nemen.')

// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';

const tempDummyNews = {
  data: [
    {
      id: 1,
      slug: "laatste-kans-nabloei-duizendblad",
      title: "Laatste kans om de nabloei te zien van de duizendblad",
      body: "De bloei van duizendblad is bijna voorbij, maar de plant is nog goed te zien. De bloemen zijn aan het opdrogen en blijven nog even zichtbaar. Dit is een laatste moment om te zien hoe duizendblad eruitziet na de bloei, voordat de bloemen niet meer zichtbaar zijn. Wat wel mooi zichtbaar blijft zijn de mooie bladeren.",
      date: "2025-11-20",
      image: "ccc47447-c2db-441b-a18b-183ab5a0b280"
    },
    {
      id: 2,
      slug: "zadenknoppen-teunisbloem",
      title: "De zadenknoppen van de teunisbloem zijn nu goed te zien",
      body: "De bloei van duizendblad is bijna voorbij, maar de plant is nog goed te zien. De bloemen zijn aan het opdrogen en blijven nog even zichtbaar. Dit is een laatste moment om te zien hoe duizendblad eruitziet na de bloei, voordat de bloemen niet meer zichtbaar zijn. Wat wel mooi zichtbaar blijft zijn de mooie bladeren.",
      date: "2025-11-20",
      image: "ccc47447-c2db-441b-a18b-183ab5a0b280"
    },
    {
      id: 3,
      slug: "teunisbloem-zaden-3",
      title: "De zadenknoppen van de teunisbloem zijn nu goed te zien 3",
      body: "De bloei van duizendblad is bijna voorbij, maar de plant is nog goed te zien. De bloemen zijn aan het opdrogen en blijven nog even zichtbaar. Dit is een laatste moment om te zien hoe duizendblad eruitziet na de bloei, voordat de bloemen niet meer zichtbaar zijn. Wat wel mooi zichtbaar blijft zijn de mooie bladeren.",
      date: "2025-11-20",
      image: "ccc47447-c2db-441b-a18b-183ab5a0b280"
    },
    {
      id: 4,
      slug: "teunisbloem-zaden-4",
      title: "De zadenknoppen van de teunisbloem zijn nu goed te zien 4",
      body: "De bloei van duizendblad is bijna voorbij, maar de plant is nog goed te zien. De bloemen zijn aan het opdrogen en blijven nog even zichtbaar. Dit is een laatste moment om te zien hoe duizendblad eruitziet na de bloei, voordat de bloemen niet meer zichtbaar zijn. Wat wel mooi zichtbaar blijft zijn de mooie bladeren.",
      date: "2025-11-20",
      image: "ccc47447-c2db-441b-a18b-183ab5a0b280"
    }
  ]
}

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid()
app.engine('liquid', engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get('/', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
    const res = await fetch('https://fdnd-agency.directus.app/items/frankendael_news');
    const result = await res.json();

    response.render('index.liquid', {
      news: result.data,
      activeIcon: 'home',
    });
})

// !!! route naar VELDVERKENNER PAGINA !!!  
app.get('/veldverkenner', async function (request, response) {
  // console.log(tempDummyNews)
   response.render('veldverkenner.liquid', {
    nieuws: tempDummyNews.data,
    activeIcon: 'veldverkenner',
  })
})

// !!! route naar NIEUWS PAGINA !!! 
app.get('/nieuws', async function (request, response) {

    const res = await fetch('https://fdnd-agency.directus.app/items/frankendael_news');
    const result = await res.json();

    response.render('nieuws.liquid', {
      news: result.data,
      activeSort: 'alle',
      activeIcon: 'nieuws',
    });
   })


// zorgt voor LAATSTE-OUDSTE
app.get('/laatste-oudste', async function (request, response) {
  const params = {
      'sort': '-date',
  }
  const personResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news/?' + new URLSearchParams(params))

  const personResponseJSON = await personResponse.json()
  response.render('nieuws.liquid', {
      news: personResponseJSON.data,
      activeSort: '-date',
      activeIcon: 'nieuws',
    });
})

// zorgt voor OUDSTE-LAATSTE
app.get('/oudste-laatste', async function (request, response) {
  const params = {
      'sort': 'date',
  }
  const personResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news/?' + new URLSearchParams(params))

  const personResponseJSON = await personResponse.json()
  response.render('nieuws.liquid', {
      news: personResponseJSON.data,
       activeSort: 'date',
       activeIcon: 'nieuws',
    });
})


// !!! dit zorgt ervoor dat het artikel die je aanklikt op de nieuwspagina het goede artikel verschijnt vanuit database !!!  
app.get('/nieuws/:slug', async function (request, response) {
    // const artikel = tempDummyNews.data.find(item => item.slug === nieuwSlug)
    // deze code hieronder haalt data uit database op
    const res = await fetch('https://fdnd-agency.directus.app/items/frankendael_news/?filter[slug]=' + request.params.slug);
    const result = await res.json();
// console.log(result.data[0].id)
    const commentParams = new URLSearchParams({
      'filter[news]': result.data[0].id,
      'sort' : '-date_created'  
    })

   const commentResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news_comments?' + commentParams)
   const commentResponseJSON = await commentResponse.json()
  //  console.log(commentResponseJSON)
    response.render('artikel.liquid', {
      news: result.data,
      newsId: result.data.id,
      comments: commentResponseJSON.data,
      activeIcon: 'nieuws',
    });
  })


// <form action="/nieuws/{{ news.id }}/{{ news.slug }}" method="POST"> vanuit formulier op de nieuwspagina wordt deze post route aangestuurd
app.post('/nieuws/:slug', async (request, response) => { 
  
    console.log(request.body)
    const postResponse = await fetch(
      'https://fdnd-agency.directus.app/items/frankendael_news_comments', // API n point van de nieuws comments (hier kan je een GET en POST doen)
      {
        // dit is JSON object met de benodigde data om wat op te slaan
        method: 'POST', // methode post meegeven zodat de server weet dat er data opgeslagen moet worden
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          news: request.body.id,     
          comment: request.body.comment,  // dit is wat er in het formulierelement staat <textarea name="comment" required maxlength="100" style="height: 30px;"></textarea>
          name: request.body.name,
          activeIcon: 'nieuws',
        })
      }
    )

    const postJSON = await postResponse.json()

    // response.redirect(`/nieuws/${request.params.slug}`) // als de post gelukt is eeen redirect naar de get route VAN HET NIEUWA ARTIKEL
    response.redirect(`/nieuws/${request.params.slug}#${postJSON.data.id}`)
})


// DELETE knop
app.post('/nieuws/:id/:slug/verwijder', async (request, response) => {
  const commentId =  request.body.comment_id
  const slug = request.params.slug
 
  await fetch(`https://fdnd-agency.directus.app/items/frankendael_news_comments/${commentId}`, {
      method: 'DELETE'
    });
 
  response.redirect(`/nieuws/${slug}#comment-lijst`) // als de post gelukt is een redirect naar de get route VAN HET NIEUWS ARTIKEL
})


// !!! route naar COLLECTIE PAGINA !!!  
app.get('/collectie', async function (request, response) {
  // console.log(tempDummyNews)
   response.render('collectie.liquid', {
    nieuws: tempDummyNews.data,
    activeIcon: 'collectie',
  }) 
})

// !!! route naar COLLECTIE NADEBLOEI PAGINA !!!  
app.get('/nadebloei', async function (request, response) {
  // console.log(tempDummyNews)
   response.render('nadebloei.liquid', {
    nieuws: tempDummyNews.data
  })
})

// !!! route naar COLLECTIE INDEBLOEI PAGINA !!!  
app.get('/indebloei', async function (request, response) {
  // console.log(tempDummyNews)
   response.render('indebloei.liquid', {
    nieuws: tempDummyNews.data
  })
})


// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})

// !!!  404 error pagina !!! 
app.use((req, res, next) => {
  res.status(404).render("error.liquid")
})