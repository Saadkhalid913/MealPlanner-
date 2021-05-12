const mongoose = require("mongoose")

const MealSchema = require("./Schemas").Meal
const ArchivedDaySchema =  require("./Schemas").ArchivedDay

const Day = mongoose.model("Day", ArchivedDaySchema)
const MealModel = new mongoose.model("Meals", MealSchema)

mongoose.connect("mongodb://localhost:27017/MealPlanner")

async function AddMeal(obj) {
  const meal = new MealModel(obj
    )
  try {
    const result = await meal.save();
    console.log(result)
  }
  catch (e) {
    console.log(e)
  }
}

async function GetMeals() {
  try {
    const result = await MealModel.find().exec(
      function (err, meals) {
    return JSON.stringify(meals);
    })
    return result 
  }

  catch (e) {
    console.log(e)
  }
}


console.log(GetMeals())