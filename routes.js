const express = require("express");

const mongoose = require("mongoose")

const MealSchema = require("./Schemas").Meal
const ArchivedDaySchema =  require("./Schemas").ArchivedDay

const Day = mongoose.model("Day", ArchivedDaySchema)
const MealModel = new mongoose.model("Meals", MealSchema)

mongoose.connect("mongodb://localhost:27017/MealPlanner")

const router = new express.Router()

router.get("/api/meals", async function(req,res) {
  try {
    await MealModel.find().lean().exec(function(err, meal){
      if (!err){
        res.set("Access-Control-Allow-Origin", "*") // setting origin headers 
        return res.send(JSON.parse(JSON.stringify(meal))) // sending JSON object to client 
      }
    })
  }
  catch (e) {
    console.log(e)
  }
})


router.get("/api/meals/:id", (req,res) => {
  res.send("hello world GET")
})

router.post("/api/meals", async function(req,res) {
  const json = req.body
  console.log("in function")
  if (!(("name" in json) && ("description" in json)))
    return res.send("Bad request body")
  const meal = new MealModel(json);
  const response = await meal.save()
  res.send(response)
})

router.delete("/api/meals/:id", (req,res) => {  
})


module.exports = router