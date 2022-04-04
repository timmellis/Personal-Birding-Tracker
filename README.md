# Personal Birding Tracker

## by Tim Ellis
*General Assembly SEI - Project 2 - Full MERN Stack application*

<div style="text-align:center;"><img style="margin: 8px;" src="https://scontent.fphl1-1.fna.fbcdn.net/v/t1.6435-9/169444843_10225369573046920_8341168125664901718_n.jpg?stp=dst-jpg_p206x206&_nc_cat=103&ccb=1-5&_nc_sid=da31f3&_nc_ohc=wYomG7CTLCkAX8oH_Ta&_nc_ht=scontent.fphl1-1.fna&oh=00_AT-Ue2Yo7pV8po3RZTe_57frV9Tjc0Q9ePCJzNiqDzNlVA&oe=6267031F" /><img style="margin: 8px;" src="https://scontent.fphl1-1.fna.fbcdn.net/v/t1.6435-9/186052556_10225648202452481_601438004031258796_n.jpg?stp=c52.0.206.206a_dst-jpg_p206x206&_nc_cat=105&ccb=1-5&_nc_sid=da31f3&_nc_ohc=5VGfkSFqDUYAX-Zn_80&_nc_ht=scontent.fphl1-1.fna&oh=00_AT81SE74Gh5iKLapJ77UelsX2xz60yTDMVxH9MdLB6SjGA&oe=62661BD2"/><img style="margin: 8px;" src="https://scontent.fphl1-1.fna.fbcdn.net/v/t1.6435-9/186188299_10225648190092172_7408273608219299405_n.jpg?stp=dst-jpg_p206x206&_nc_cat=105&ccb=1-5&_nc_sid=da31f3&_nc_ohc=OFHOzflao6wAX-2ZllG&_nc_ht=scontent.fphl1-1.fna&oh=00_AT-gHiW9VJZue4fMmamOmK4pUzT6IGRPaW6SU3Y4jnRLtw&oe=626547E5" /><img  style="margin: 8px;" src="https://scontent.fphl1-1.fna.fbcdn.net/v/t1.6435-9/156094355_10225098804077865_5174164032334517388_n.jpg?stp=c52.0.206.206a_dst-jpg_p206x206&_nc_cat=102&ccb=1-5&_nc_sid=da31f3&_nc_ohc=oCEcc8fIOYEAX_YYvB0&tn=7PrnmIrGtbHAY7kb&_nc_ht=scontent.fphl1-1.fna&oh=00_AT-dWubQJ-B9cU4UmVe_MlINFA7RMc_nQ_uuC8Dh7BjlHw&oe=6266A6D9" /></div>

## Summary
The purpose of this project is to develop a full-stack web application that uses both front-end and back-end technologies, including MongoDB, Express, React, and Node.js --- or: *the MERN stack*. 

My application will be a personalized tracker for bird watching and identification at different locations in the greater Boston area, tracking patterns and frequencies of sightings. Using a simple navigation bar, the user will be able to view data by location ("Parks") or by species ("Birds"), search for a specific location or species, and see details about locations and identified species. There will also be a capability to create, update or delete entries from both data collections. 

## Back End
Using Mongoose (MongoDB) and Express, data will be stored in two collections: "Parks" and "Birds". Each Schema will allow the user to store details, link to photos, and keep notes that will help keep track of trends and locations for all bird sightings. 

### Schemas
The "Parks" Schema will require a name, location and thumbnail photo (url). It will also have optional inputs for an address, description, notes, and an array of images (or rather, an array of objects, each containing an image urls and an optional note to be used for caption or clarification). The address will hopefully be later used to embed a Google Maps feature for the location of the Park.

the "Birds" Schema will require a name and species code (to correspond with the eBirds API), as well as at least one sighting, which is stored within a nested Array of objects, (each containing the ObjectID of the Park where it was spotted, as well as a timestamp and notes). There will also be optional inputs for keywords, descriptions, notes, and an Array of images (as above).

<center><img src="https://drive.google.com/uc?id=10f7JJwMWTSWuFJUYfzx0Q1rjwLTdrOm_" style="margin: 16px; border: solid 6px #999; border-radius: 16px;" /></center>


### Information Seed
The database collections will be seeded using existing data from my own eBird lists from the past 15 months.

### CRUD operations
To access the database collections, there will be a minimum of 4 query methods per collection to GET all data as well as specific data by ID ("Read"), to POST new entries to the databse ("Create"), to edit and add to existing entries ("Update"), and remove erroneous or redudant entries ("Delete"). These methods will be made possible by the unique ObjectIDs created automatically by MongoDB. 

## Front End
The front end of the application will feature a landing page with a nav bar, and a main page that will ask the user what they want to do: search for a bird, search for a park, add a bird, or add a park. The nav bar will also include links to each page to "view all birds" or "view all parks". As a post-MVP feature, there might also be a randomly selected gallery of birds featured at the bottom of the page. 

<center><img src="https://drive.google.com/uc?id=1fhGc4uEieISN6Ub4mmPlcp1wk8frXjhn" style="margin: 16px; border: solid 6px #999; border-radius: 16px;" /></center>

### Searches Components
The two **Search** components will both make use of simple keyword searches to match words in the name value; the Bird search will additionally search the "keywords" value for any matches to the search term.

### Birds / Parks
Each **landing page** will display *all* birds/parks by default, and will also allow the user to use the corresponding Search component to narrow down the displayed entries. Items will be displayed using the "BirdCard" or "ParkCard" components to present a grid or clickable cards. These will link directly to the "BirdDetails" or "ParkDetails" pages. 

### Cards 
Both **"BirdCard"** and **"ParkCard"** components will display a simple card showing the name of the entry, along with a thumbnail image, and provide a link to the details page for its respective content.

### Details Pages
The **Details** pages will be accesssed through the unique ObjectID for each entry, and will display all of the user's previous sightings either a) of the given bird, or b) at the given location. They will also include a cross-reference feature which will display either a) all of the parks where the given bird has been sighted, or b) all of the birds that have been spotted at the given park.

### Gallery Component
Because each item will have an array of image urls nested within the "img" object key, the **Gallery** component will access the given entry, iterate through the array of images, and create a self-contained gallery to display all images and their captions. This gallery should work the same for both Birds and Parks entries, since the "img" array format will be the same for each.

## Post-MVP Features
[x] A **Code Lookup** feature that will make use of the eBirds API (pre-downloaded) and allow the user to search the taxonomy database for the correct taxonomy code for the bird being added.
[] An **eBird details** component that will make a direct axios call to the eBird API and receive additional taxonomical details.
[] A **Login** component that will simulate a multi-user functionality, where each user would have their own unique database of bird sightings and locations visited. 

## Technologies Used
1. MongoDB
1. Mongoose
1. Express
1. React
1. Node.js
1. Axios, React-Router-Dom
1. HTML, CSS
1. VSCode
1. Insomnia (for API testing)

## Resources:
- Trello Board: https://trello.com/b/KpD42VpH/ga-project-2-mern-stack-birding-tracker
- ERD diagrams: https://app.diagrams.net/?libs=general;er#G1AZH4cYJPncqYbh4jSPPMo555I4RMyvip
- Component Hierarchy diagrams: https://app.diagrams.net/?libs=general;flowchart#G1ph-aA-1rjVIFyapykpZd-jIRFsqxe4m7
- Wireframes: https://wireframe.cc/pro/pp/9b3686222533063

Credit / Special Thanks:
Images: 
- Page banner: https://www.ualberta.ca/folio/media-library/2019/11/191105-oped-wetlands-birds-banner-382324.jpg

- Background: https://nas-national-prod.s3.amazonaws.com/web_aud_mountain-bluebird_08695_photo-evan-barrientos.jpg

- "BirdsDetails" title backgroud image: Photo by Dejan Zakic on Unsplash

Special thanks to MANY classmates: 
- Alex, David, Piero, DeJuan, Yusong, Austin for help with ideas, debugging, and HEROKU DEPLOYMENT OH MY GOD. 