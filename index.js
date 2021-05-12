const express = require("express")
const mongoose = require("mongoose")

// setting up app 
const app = express()
app.use(express.json())

//local imports 
const GetDayId = require("./HelperFunctions").GetCurrentDate
const MealSchema = require("./Schemas").Meal
const ArchivedDaySchema =  require("./Schemas").ArchivedDay
const router = require("./routes")

app.use("/", router)

// models 
const Day = mongoose.model("Day", ArchivedDaySchema)
const Meal = mongoose.model("Meal", MealSchema)

// connecting to database 
mongoose.connect("mongodb://localhost:27017/MealPlanner")



// testing 



const PORT = 3000

app.listen(PORT, () => {
  console.log("Listening on port " + PORT)
})

