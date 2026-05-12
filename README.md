
# Enhanced website

Ontwerp en maak een interactieve website die snel laadt en prettig te gebruiken is.

# Bloemenveld Frankendael - Webapp
Het Bloemenveld in Park Frankendael is een bijzondere plek in het park, waar veel groeit en leeft. Toch blijft de waarde van het veld voor veel voorbijgangers verborgen. Wat er groeit, bloeit en leeft, is niet altijd zichtbaar of makkelijk te begrijpen. Terwijl juist dit soort plekken een grote rol spelen in het versterken van stedelijke natuur en het vergroten van het bewustzijn rondom een duurzame leefomgeving. Daarom is er een duidelijke behoefte aan manieren om bewoners van Amsterdam Oost (Watergraafsmeer) op een laagdrempelige manier kennis te laten maken met de natuur dichtbij huis. Een ervaring die verder gaat dan alleen kijken en waarin bezoekers actief kunnen ontdekken, beleven en leren wat er in hun omgeving leeft.

#### Vraag van de opdrachtgever
Ontwerp en ontwikkel een webapp met een interactieve veldverkenner waarbij bezoekers in verschillende zones van de Bloementuin aan de hand van opdrachten planten en bloemen kunnen ontdekken. Bij het goed maken van de opdrachten kunnen badges worden verdiend

Check [hier](https://server-side-rendering-server-side-website-qfhx.onrender.com/) de website.

## Inhoudsopgave Readme

  * [Beschrijving](#beschrijving)
  * [Huisstijl](#huisstijl)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar je live site 🌐-->
Voor de opdrachtgever maken wij een website wat eigenlijk een webapp is. Het is de bedoeling dat de bezoeker een QR code kan scannen en dan vervolgens op de webapp komt. Er is dan een veldverkenner die je laat zien waar je op dat moment bevindt in het bloemenveld en dan kan je zelf op verschillende zones drukken in de app. Vervolgens krijg je een opdracht en informatie over de de debetreffende plant.

De afgelopen weken heb ik mij gefocust op de performance van de website en aan de loading en succes state van de commments bij een artikel aan de hand met client side javascript.

## Huisstijl
Van de opdrachtgever hebben wij een prototype gekregen van het design in een [figma bestand](https://www.figma.com/design/9UctVXSWnspKX72xtLvNQ5/Prototype-Bloemenveld?node-id=0-1&p=f&t=qHEk4ifRm1wbrbWr-0) Op basis van dat prototype design ben ik mijn website gaan maken. Ik heb dezelfde kleuren, afbeeldingen, fonts etc gebruikt en toegepast op de website.

## [Loading state](https://github.com/lynnvdbo/user-experience-enhanced-website/issues/21)

Ik heb bij de verzendknop voor de comments een loading state toegevoegd, zodat de gebruiker ziet wat er gebeurd en weet dat de comment wordt geplaatst.

https://github.com/lynnvdbo/user-experience-enhanced-website/blob/26d443a07c4d9ec1c84b6502203525b128fbd72e/public/client.js#L17-L19

## [Succes state](https://github.com/lynnvdbo/user-experience-enhanced-website/issues/21)

Naast de loading state heb ik ook een succes state toegevoegd om te laten weten dat de comment goed is verstuurd.

https://github.com/lynnvdbo/user-experience-enhanced-website/blob/26d443a07c4d9ec1c84b6502203525b128fbd72e/public/client.js#L72-L77

## Disabled

En daarbij heb ik ook toegepast dat je als gebruiker maar een comment kan achterlaten zodat er niet gespamt kan worden.

https://github.com/lynnvdbo/user-experience-enhanced-website/blob/26d443a07c4d9ec1c84b6502203525b128fbd72e/public/style.css#L411-L414

https://github.com/lynnvdbo/user-experience-enhanced-website/blob/26d443a07c4d9ec1c84b6502203525b128fbd72e/public/client.js#L20-L21

https://github.com/user-attachments/assets/cd9aeaf4-1934-48b6-bd67-cf028d5e2e6b

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->
De website is gebouwd met HTML, CSS en JS, NodeJS, Express, JSON en Liquid

## [Performance technieken](https://github.com/lynnvdbo/user-experience-enhanced-website/issues/22) die ik hebt toegepast

- Responsive images
- Lazy loading
- Layout shift

### Responsive images [#18](https://github.com/lynnvdbo/user-experience-enhanced-website/issues/18)

Ik heb <[picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture)> en <[srcset ](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset)>property gebruikt bij mijn afbeeldingen. Dit geeft de browser een keuze uit meerdere versies van dezelfde afbeelding.

https://github.com/lynnvdbo/user-experience-enhanced-website/blob/0d126fe5bbd5b71aba143e2ed900f9bfcafa5925/views/index.liquid#L36-L42

### Lazy loading [#17](https://github.com/lynnvdbo/user-experience-enhanced-website/issues/17)

Ik heb [lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading) state toegevoegd op afbeeldingen waarbij nodig is. Die zorgt ervoor dat de afbeeldingen pas geladen worden op het moment dat ze nodig zijn, in plaats van meteen bij het openen van de pagina. Dit zorgt ervoor dat de website sneller is.

Ik heb ook juist het tegenovergestelde toegevoegd en dat is [loading eager](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#eager). Ik heb dit toegepast op de eerste 2 afbeeldingen die tevoorschijn komen op nieuwspagina. De loading eager zorgt er namelijk voor dat de eerste 2 afbeeldingen meteen geladen wordt zodra de pagina opent.

In dit issue staat meer informatie hoe ik dit heb toegepast https://github.com/lynnvdbo/user-experience-enhanced-website/issues/22#issuecomment-4386300508

https://github.com/lynnvdbo/user-experience-enhanced-website/blob/0d126fe5bbd5b71aba143e2ed900f9bfcafa5925/views/index.liquid#L44-L49

### Layout Shift [#20](https://github.com/lynnvdbo/user-experience-enhanced-website/issues/20)

Ik heb bij de afbeeldingen een width en height toegevoegd zodat de browser al weet hoeveel ruimte ze innemen. Daardoor verschuift de layout minder tijdens het laden

https://github.com/lynnvdbo/user-experience-enhanced-website/blob/0d126fe5bbd5b71aba143e2ed900f9bfcafa5925/views/index.liquid#L50-L51

https://github.com/lynnvdbo/user-experience-enhanced-website/blob/26d443a07c4d9ec1c84b6502203525b128fbd72e/views/partials/navbar.liquid#L10-L11

Daarnaast heb ik ook een [Performance Audit](https://github.com/lynnvdbo/user-experience-enhanced-website/issues/25) test gedaan op de website

## Installatie
<!-- Bij Installatie staat hoe een andere developer aan jouw repo kan werken -->
1. Clone als eerst deze repository
2. Open hem in VSCodium of een code editor
3. Open dan de terminal en type npm install
4. Start vervolgens de website door npm start in te typen
5. Open vervolgens http://localhost:8000 om de website te zien in de browser

## Bronnen
[Figm bestand prototpye](https://www.figma.com/design/9UctVXSWnspKX72xtLvNQ5/Prototype-Bloemenveld?node-id=0-1&p=f&t=qHEk4ifRm1wbrbWr-0)

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
