const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/MealPlanner")

const GetCurrentDay = require("./HelperFunctions")

const MealSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
    
    validate: {
      validator: function(v) {return (v && v.length > 3)},
      message: "Please enter a name longer than 3 letters"
    },

    trim: true
  },

  description: {
    type:String,
    required: true,

    validate: {
      validator: function(v) {return v && v.length > 0}
    },

    trim: true
  }
})

const SavedDaySchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  meals: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Meals",
    required: true
  },
  
  
  CurrentDayID: {
    type: Number,
    default: GetCurrentDay
   }
})

const Meal = mongoose.model("Meals", MealSchema)
const SavedDay = mongoose.model("Saved Days", SavedDaySchema)

module.exports.Meal = Meal;
module.exports.SavedDay = SavedDay;
