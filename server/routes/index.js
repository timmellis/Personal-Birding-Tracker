const mongoose = require('mongoose');
const { Router } = require('express');
const router = Router();

const { Park, Bird } = require('../models');

///// ROUTES:
router.get('/', (req, res) => {
  res.send('This is (G)root!');
})

////////// "PARKS" ROUTES ////////// 
// Get all parks (GET)
router.get('/parks', 
  async (req, res) => {
    const allparks = await Park.find();
    console.log(`All parks should arrive!`);
    return res.json(allparks);
  }
)
// Get Park by ID (GET)
router.get('/parks/:id', 
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) throw Error ("Nope, that's not a valid MongoDB ObjectId string.");

      const thisPark = await Park.findById(id);
      
      if(!thisPark) throw Error (`Oops, that park doesn't seem to exist.`);

      res.json(thisPark);

    } catch (e) {
      console.error(e);
      return res.send(`parks/:id ERROR LOG: ${e.message}`)    
    }
  }
)
// Create new Park (POST)
router.post('/parks/create', 
  async (req, res) => {
    try {
      const newPark = await Park(req.body);
      await newPark.save();
      return res.json({ newPark });
    } catch (e) {
      console.error(e);
      return res.send({ error: e.message })
    }
  }
)
// UPDATE existing Park (PUT)
router.put('/parks/update/:id', 
  async (req, res) => {
    try {
      const {id} = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) throw Error (`Nope, that's not a valid MongoDB ObjectId string!`);
  
      const thisPark = await Park.findById(id);
      if (!thisPark) throw Error (`Oops, that park doesn't seem to exist.`);
  
      let {name, location, address, gallery, img, description, notes } = req.body;     
      await Park.findByIdAndUpdate(id, req.body, {new: false})

      res.send(`Successfully updated Park: ${name} <img src=${gallery[0].url} style="max-width:350px;" />${gallery[0].note}`);
  
    } catch (e) {
      return res.send({ error: e.message })
    }
  }
);

router.delete('/parks/delete/:id', 
  async (req, res) => {
    try {
      const {id} = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) throw Error (`Nope, that's not a valid MongoDB ObjectId string!`);
  
      const thisPark = await Park.findByIdAndDelete(id, function (err, resp) {
        if (err) {
          console.error(`ERROR in Park.findByIdAndDelete`);
          throw Error (`Hmm... There was a problem deleting that entry.`);
        }
        else {
          console.log("Deleted: ", resp);
          res.send(`Successfully deleted entry: ${resp}`);
        }});
  
    } catch (e) {
      return res.send({ error: `This message: ${e.message}` })
    }
  }  
)





////////// "BIRDS" ROUTES: ////////// 
// Get all birds (GET)
router.get('/birds', 
  async (req, res) => {
    const allbirds = await Bird.find();
    console.log(`All birds should arrive!`);
    res.json(allbirds);
  }
)
//Get Bird by ID (GET)
router.get('/birds/:id', 
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) throw Error (`Nope, that's not a valid MongoDB ObjectId string!`);

      const thisBird = await Bird.findById(id);
      if(!thisBird) throw Error (`Oops, that bird doesn't seem to exist.`);

      res.json(thisBird);

    } catch (e) {
      console.error(e);
      return res.send(`birds/:id ERROR LOG: ${e.message}`)    
    }
  }
)




module.exports = router;
