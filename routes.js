const express = require("express");
const GetCurrentDate = require("./HelperFunctions")
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


// need to review
router.get("/api/saveddays", async function(req, res) {
  try {
    await Day.find().lean().exec(function(err, day) {
      if (!err) {
        res.set("Access-Control-Allow-Origin", "*");
        res.send(JSON.parse(JSON.stringify(day)))
      }
    })
  }
  catch (e) {
    console.log(e)
  }

})


// returns the current day object, unless it does not exist, otherwise, we return the a new day object 
router.get("/api/saveddays/current", async function(req, res) {
  const id = GetCurrentDate()
  const CurrentDay = await Day.find({DayId: id})
  if (CurrentDay.length === 0)
    return AddDay(res, id)
  console.log("Found the Id")
  res.send(CurrentDay)
})

// adds a new day object in the database with the current date 
async function AddDay(res) {
  const meals = await MealModel.find({})
  const day = new Day({DayId: GetCurrentDate(),
    Meals: meals }) 

  const result = await day.save()
  if (!result) 
    res.send("ERROR") // change later
  res.send(result)
}

router.post("/api/saveddays/current/:id", async function(req,res) {
  const id = req.params.id;
  
  try {
    const Query = await Day.find({DayId: GetCurrentDate()}); // find the current dat 
    const CurrentDay = Query[0]

    const targetIndex = CurrentDay.Meals.findIndex(f => (f._id == id)); // find the index of a meal in the array 
    const arr = CurrentDay.Meals // copy the array 
    const target = arr[targetIndex] // update the item in the array
    target.name = "Thismon" 

    const result = await CurrentDay.update({
      Meals: arr
    })
    res.send(result)
  }
  catch (e) {
    console.log(e)
  }
  
  // try {
  //   await CurrentDay.save()
  // }
  // catch (e) {
  //   console.log(e)
  // }
  // console.log(CurrentDay)
  // res.send(CurrentDay)
})


module.exports = router