const db = require('../db')
console.log("db required success");
const { Park, Bird } = require('../models');

db.on('error', console.error.bind(console, '<seed> MongoDB connection error:'))

const main = async () => {

  // const mtAuburnCemetery = await new Park({
  const parks = [
    {
     name: "Mount Auburn Cemetery",
    location: "Cambridge, MA",
    address: "580 Mt Auburn St, Cambridge, MA 02138",
    gallery: [
      {url: "https://mountauburn.org/wp-content/uploads/November-4-07-29.jpg"}, 
      {url: "https://thumbs.dreamstime.com/b/washington-tower-mount-auburn-cemetery-fall-watertown-greater-boston-area-massachusetts-usa-125394101.jpg"}
    ],
    img: "http://www.matthewiphotoblog.com/wp-content/uploads/2013/05/Mary-Baker-Eddy-Memorial_final-1024x704.jpg",
    description: "Mount Auburn Cemetery is the first rural, or garden, cemetery in the United States, located on the line between Cambridge and Watertown in Middlesex County, Massachusetts, 4 miles west of Boston. A registered arboretum and well-known wildlife hotspot, it is the burial site of many prominent figures, as well as being a National Historic Landmark.",  
    notes: "Key spots: 1. Willow lake. 2. Auburn Lake. "
  },
  // )
  // mtAuburnCemetery.save(); 
  // console.log("created Mt Auburn Cemetery");

  // const blacksNook = await new Park({
  {
    name: "Fresh Pond Reservoir - Black's Nook",
    location: "Cambridge, MA",
    address: "Blacks Nook, Cambridge, MA 02138",
    gallery: [
      {url: "https://www.cambridgema.gov/-/media/Images/waterdepartment/freshpond/Projects/blacksnook/09bnfinished.JPG", note: "View from tiny boardwalk."}
    ],
    img: "https://www.cambridgema.gov/-/media/Images/waterdepartment/freshpond/Projects/blacksnook/09bnfinished.JPG?mw=450&mh=334",
    description: "Black's Nook is a little pond set back inside Fresh Pond Reservation, where waterfowl like hooded mergansers and green herons like to stop over.",  
    notes: "Hooded mergansers: fall; Green herons: late summer. "
  }
]
  // )
  // blacksNook.save(); 
  // console.log("created Blacks Nook");
  await Park.insertMany(parks)
  console.log('Parks added');






// RIDES CREATIONS:    
  const birds = [
    { 
      name: "Dumb Goose",
      species_code: "cagoo",
      keywords: ["goose, waterfowl, angry, dumb"],
      sightings: [
        {
          timestamp: new Date('2021-03-30T18:30:01-05:00'),
          park_id: mtAuburnCemetery._id,
          notes: "Geese are dumb and noisy."
        }
      ],
      gallery: [{url: "dummyimage.jpg", note: ""}],
      img: "https://instagram.fphl1-1.fna.fbcdn.net/v/t51.2885-15/185257520_463720784855441_6179216105824427990_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fphl1-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=6eQQYyrL3JEAX-l7_Zd&edm=ALQROFkBAAAA&ccb=7-4&ig_cache_key=MjU3MzkyNzY1ODEwNjc3NTUwMQ%3D%3D.2-ccb7-4&oh=00_AT8EMjCXthMgnml0NmVycvxzpToqA9WZ0z0OuIEbfPA0YQ&oe=6247D96E&_nc_sid=30a2ef",
      description: "Canada goose. Super dumb and obnoxious, but the bebes are suuuuper fluffy.",
      notes: "Everywhere. Cannot avoid even if you tried." 
    },
    {
      name: "Green Heron",
    species_code: "greher",
    keywords: ["heron", "wader", "fishing"],
    sightings: [
      {
        timestamp: new Date('2021-07-25T18:30:01-05:00'),
        park_id: blacksNook._id,
        notes: "Lots of frogs to eat."
      }
    ],
    gallery: [
      {url: "dummyimage.jpg", note: ""}
    ],
    img: "https://instagram.fphl1-2.fna.fbcdn.net/v/t51.2885-15/240088329_343765804008745_6333007499240369021_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fphl1-2.fna.fbcdn.net&_nc_cat=101&_nc_ohc=i5YT9pcRuW8AX9Az5t9&tn=Ocs-LACPLkJ5B5yQ&edm=ALQROFkBAAAA&ccb=7-4&ig_cache_key=MjY0NDY4NzM4Nzg5MDY4MzQ3Nw%3D%3D.2-ccb7-4&oh=00_AT-HFAFol03XmI2-744HfBDOzeA2sf9Faa3AyvQMS45EKw&oe=62488C63&_nc_sid=30a2ef", 
    notes: "Can usually find in Black's Nook, mid to late summer, morning and evening."
    }

  ]
      
    await Bird.insertMany(birds)
    console.log('Birds added')
}

const run = async () => {
    await main()
    db.close()
}

run()