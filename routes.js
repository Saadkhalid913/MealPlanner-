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
        console.log("Request handled")
        return res.send(JSON.parse(JSON.stringify(meal))) 
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
router.post("/api/meals", (req,res) => {
  res.send("hello world GET")
})
router.delete("/api/meals/:id", (req,res) => {
  res.send("hello world GET")
})



module.exports = router