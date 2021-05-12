const express = require("express")
const mongoose = require("mongoose")

const MealSchema = require("./Schemas").Meal
const ArchivedDaySchema =  require("./Schemas").ArchivedDaySchema

const Day = mongoose.model("PreviousDays", ArchivedDaySchema)
const Meal = mongoose.model("Meal", MealSchema)

mongoose.connect("mongodb://localhost:27017/MealPlanner")



// testing 

// async function addMeal() {
//   const meal = new Meal({
//     name: "meal1",
//     description: "desc1",
//     test: {hello: "hello"}
//   });

//   try{
//     const result = await meal.save()
//     console.log(result)
//   }
//   catch(err) {
//     console.log(err)
//   }
// }
// addMeal()

