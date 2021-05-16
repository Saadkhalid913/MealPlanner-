const express = require("express")
const mongoose = require("mongoose")
const Models = require("./Schemas")

const Meal = Models.Meal
const SavedDay = Models.SavedDay

const DayRouter = express.Router()
const MealRouter = express.Router()

// meals API 

MealRouter.get("/", async (req, res) => {
  try {
    const result = await Meal.find().sort("name");
    console.log(result)
    res.send(result)
  }
  catch(ex) {
    console.log(ex)
    res.send("Sorry, there was an error")
  }
})

// exports 
module.exports.MealRouter = MealRouter
module.exports.DayRouter = DayRouter
