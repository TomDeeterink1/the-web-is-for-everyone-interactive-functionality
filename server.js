// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Haal data op uit de FDND API, ga pas verder als de data gedownload is
const data = await fetchJson('https://fdnd-agency.directus.app/items/oba_item')

// console.log(data); // uncomment om de opgehaalde data te checken

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')
// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

// Maak een GET route voor de index
app.get('/', function (request, response) {
  // Render index.ejs uit de views map en geef uit FDND API opgehaalde data mee
  response.render('index', data)
})

// Maak een GET route voor een detailpagina met een request parameter id
app.get('/detail/:id', function (request, response) {
    // Gebruik de request parameter id en haal de juiste persoon uit de WHOIS API op
    fetchJson(`https://fdnd-agency.directus.app/items/oba_item/${request.params.id}`).then((items) => {
    response.render('detail', { items: items.data} );
})

  })

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})