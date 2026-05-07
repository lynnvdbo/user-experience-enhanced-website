
import express from 'express'

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

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

const engine = new Liquid()
app.engine('liquid', engine.express())

app.set('views', './views')

const baseURL = 'https://fdnd-agency.directus.app/items/frankendael_news'

app.get('/', async function (request, response) {
    const res = await fetch(baseURL);
    const result = await res.json();

    response.render('index.liquid', {
      news: result.data,
      activeIcon: 'home',
    });
})

app.get('/veldverkenner', async function (request, response) {
  // console.log(tempDummyNews)
   response.render('veldverkenner.liquid', {
    nieuws: tempDummyNews.data,
    activeIcon: 'veldverkenner',
  })
})

app.get('/nieuws', async function (request, response) {

    const res = await fetch(baseURL);
    const result = await res.json();

    response.render('nieuws.liquid', {
      news: result.data,
      activeSort: 'alle',
      activeIcon: 'nieuws',
    });
   })


app.get('/laatste-oudste', async function (request, response) {
  const params = {
      'sort': '-date',
  }
  const personResponse = await fetch(baseURL + '?' + new URLSearchParams(params))

  const personResponseJSON = await personResponse.json()
  response.render('nieuws.liquid', {
      news: personResponseJSON.data,
      activeSort: '-date',
      activeIcon: 'nieuws',
    });
})

app.get('/oudste-laatste', async function (request, response) {
  const params = {
      'sort': 'date',
  }
  const personResponse = await fetch(baseURL + '?' + new URLSearchParams(params))

  const personResponseJSON = await personResponse.json()
  response.render('nieuws.liquid', {
      news: personResponseJSON.data,
       activeSort: 'date',
       activeIcon: 'nieuws',
    });
})


app.get('/nieuws/:slug', async function (request, response) {
    const res = await fetch('https://fdnd-agency.directus.app/items/frankendael_news/?filter[slug]=' + request.params.slug);
    const result = await res.json();
    const commentParams = new URLSearchParams({
      'filter[news]': result.data[0].id,
      'sort' : '-date_created'  
    })

   const commentResponse = await fetch('https://fdnd-agency.directus.app/items/frankendael_news_comments?' + commentParams)
   const commentResponseJSON = await commentResponse.json()
    response.render('artikel.liquid', {
      news: result.data,
      newsId: result.data.id,
      comments: commentResponseJSON.data,
      activeIcon: 'nieuws',
    });
  })


app.post('/nieuws/:slug', async (request, response) => { 
  
    console.log(request.body)
    const postResponse = await fetch(
      'https://fdnd-agency.directus.app/items/frankendael_news_comments', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          news: request.body.id,     
          comment: request.body.comment,  
          activeIcon: 'nieuws',
        })
      }
    )

    const postJSON = await postResponse.json()

    response.redirect(`/nieuws/${request.params.slug}#${postJSON.data.id}`)
})


app.post('/nieuws/:id/:slug/verwijder', async (request, response) => {
  const commentId =  request.body.comment_id
  const slug = request.params.slug
 
  await fetch(`https://fdnd-agency.directus.app/items/frankendael_news_comments/${commentId}`, {
      method: 'DELETE'
    });
 
  response.redirect(`/nieuws/${slug}#comment-lijst`) // als de post gelukt is een redirect naar de get route VAN HET NIEUWS ARTIKEL
})


app.get('/collectie', async function (request, response) {
   response.render('collectie.liquid', {
    nieuws: tempDummyNews.data,
    activeIcon: 'collectie',
  }) 
})

app.get('/nadebloei', async function (request, response) {
   response.render('nadebloei.liquid', {
    nieuws: tempDummyNews.data
  })
})

app.get('/indebloei', async function (request, response) {
   response.render('indebloei.liquid', {
    nieuws: tempDummyNews.data
  })
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ jouw interactieve website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
})

app.use((req, res, next) => {
  res.status(404).render("error.liquid")
})