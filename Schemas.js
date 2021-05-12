const mongoose = require("mongoose")

const MealSchema = new mongoose.Schema({
  name: String,
  description: String,
})

const ArchivedDaySchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  DayId: Number,
  Meals: [Object]
})

module.exports.Meal = MealSchema
module.exports.ArchivedDay = ArchivedDaySchema 


