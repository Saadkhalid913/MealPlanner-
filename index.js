const express = require("express")
const mongoose = require("mongoose")

// connecting to database 
mongoose.connect("mongodb://localhost:27017/MealPlanner")

const routers = require("./routes")

const DayRouter = routers.DayRouter
const MealRouter = routers.MealRouter

// setting up app 
const app = express()

app.use(express.json())
app.use("/api/saveddays", DayRouter)
app.use("/api/meals", MealRouter)





const PORT = 3000

app.listen(PORT, () => {
  console.log("Listening on port " + PORT)
})

