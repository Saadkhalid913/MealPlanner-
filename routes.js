// importing modules 
const express = require("express")
const mongoose = require("mongoose")
const Models = require("./Schemas")

//importing functions 
const GetCurrentDay = require("./HelperFunctions")
const { query } = require("express")

// getting models from schemas module 
const Meal = Models.Meal
const SavedDay = Models.SavedDay

// creating routes 
const DayRouter = express.Router()
const MealRouter = express.Router()

//  ---------------------------- meals API ---------------------------- 

MealRouter.get("/", async (req, res) => {
  const result = await Meal.find().sort("name").catch((e) => {console.log(e)});
  res.send(result)
})

// MealRouter.get("/current", async (req,res) => {
//   const CurrentDayID = GetCurrentDay()
//   const result = await SavedDay.find({CurrentDayID})
//   if (!result[0]) {
//     const meals = await Meal.find().catch((err) => res.send("Error"))
//     const day = new SavedDay({meals: meals})
//     const result = await day.save().catch((err) => res.send("There was an error saving"))
//     res.send(await SavedDay.find({CurrentDayID: CurrentDayID})
//                            .populate("meals"))
//     return
//   }
//   const CurrentDay = result[0]
//   res.send(CurrentDay.meals)
// })

MealRouter.put("/current/:id", async (req,res) => {
  // update meal on current day 
  const id = req.params.id;
  const CurrentDayID = GetCurrentDay() 
  
  const day = await SavedDay.find({CurrentDayID: CurrentDayID});
  const dayID = day[0]._id
  
  const response = await SavedDay.findById(dayID);
  const meal = response.meals.find(c => c._id == id) 
  // toggle completed 
  meal.IsCompleted = (meal.IsCompleted) ? false : true  
  response.save()
  res.send(meal)
})

MealRouter.post("/", async (req, res) => { 
  const body = req.body
  let NewMeal = new Meal(body)
  try {
    const result = await NewMeal.save()
    res.status(200).send(result)
  }

  catch(e){
    res.status(400).send(e)}
  }
)

MealRouter.delete("/:id", async (req,res) => {
  const id = req.params.id
  const result = await Meal.findByIdAndDelete(id).catch((err) => res.send("Invalid id"))
  res.send(result)
})

MealRouter.put("/:id", async (req, res) => {
  const id = req.params.id
  const body = req.body
  const result = await Meal.findByIdAndUpdate(id, body).catch((err) => res.send("Invalid request body"))
  res.send(result)
})


//  ---------------------------- Current Day API ----------------------------

DayRouter.get("/current", async  (req, res) => {
  const CurrentDayID = GetCurrentDay() 
  const Query = await SavedDay.find({CurrentDayID: CurrentDayID})
                              .populate("meals")
  if (Query.length < 1) {
    const meals = await Meal.find().catch((err) => res.send("Error"))
    const day = new SavedDay({meals: meals})
    const result = await day.save().catch((err) => res.send("There was an error saving"))
    res.send(await SavedDay.find({CurrentDayID: CurrentDayID})
                           .populate("meals"))
    return
  }
  res.send(Query[0])
})

DayRouter.get("/", async (req,res) => {
  const Query = await SavedDay.find()
  .populate("meals")
  .sort("_id")
  .catch(c => res.send(c))
  res.send(Query)
})




// ---------------------------- notes ---------------------------- 
// Finish CRUD requsts for the Meals API --DONE 
// Work on the CURRENT DAY GET CRUD Method for the SavedDay API --DONE 
// do some frontend cleanup 

// exports 
module.exports.MealRouter = MealRouter
module.exports.DayRouter = DayRouter
