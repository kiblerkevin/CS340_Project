const express = require('express');
const mysql = require('../dbcon.js')
const router = express.Router();

const locationController = require(`../controllers/locations/locations.js`);

router.get('/', async function(req, res, next) {
    console.log('here')
    var context = {};
   
   locationController.get_locations(req, res, context).then((promiseResult) => {
       console.log(promiseResult.context)
        res.render('edit_location', promiseResult.context)
    }).catch(err => console.log(err)); 
  

});

router.post('/', async (req, res) =>{
    var context = {};
    context.confirm_text = "Deleted location"

    locationController.delete_location(req, res, context)
    .then((promiseResolve) => {
        locationController.get_locations(promiseResolve.req, promiseResolve.res, promiseResolve.context)
        .then((promiseInfo) => {
            res.render('edit_location', promiseInfo.context)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
});

module.exports = router