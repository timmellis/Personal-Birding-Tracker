const mongoose = require('mongoose');
const { Router } = require('express');
const router = Router();

const { Park, Bird } = require('../models');

///// ROUTES:
router.get('/', (req, res) => {
  res.send('This is (G)root!');
})

// ROUTE(s): Get all parks, birds
router.get('/parks', 
  async (req, res) => {
    const allparks = await Park.find();
    console.log(`All parks should arrive!`);
    return res.json(allparks);
  }
)

router.get('/birds', 
  async (req, res) => {
    const allbirds = await Bird.find();
    console.log(`All birds should arrive!`);
    res.json(allbirds);
  }
)

// ROUTE(S): Get park, bird by ID
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




module.exports = router;
