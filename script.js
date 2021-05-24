
const GetCurrentDate = function () {
  // returns the current day as the number of days passed since january 1, 1970 
  const MillisecondsInDay = 86400000;
  const offset = 14400000
  return Math.floor((Date.now() - offset) / MillisecondsInDay)
  //18758 at 8PM 
}

function main() {
  const sideBarToggleButton = document.getElementById("add-button")
  sideBarToggleButton.addEventListener("click", SideBarToggle)

  const SideBarSubmitButton = document.getElementById("sidebar-submit")
  SideBarSubmitButton.addEventListener("click", MealFromSideBar)
  GetMeals()
}


function AddMeal(Meal) {
  const ID = Meal._id;
  const name = Meal.name;
  const description = Meal.description;

  const NewListItem = document.createElement("li");
  NewListItem.className = "accordion-link"
  NewListItem.id = ID

  const LinkTag = document.createElement("a")
  LinkTag.href = `#${ID}`
  LinkTag.innerText = name

  const CompletedButton = document.createElement("button")
  CompletedButton.innerHTML = "Complete"
  CompletedButton.addEventListener("click", async function() {
    const response = await fetch("http://localhost:3000/api/meals/current/" + ID, {method: "put"})
    const js = await response.json()

    if (js.IsCompleted) {this.parentNode.style.backgroundColor = "blue"; 
      this.innerText = "completed"}
    else {this.parentNode.style.backgroundColor = "white"; 
      this.innerText = "Complete"}
  })

  const DescriptionDiv = document.createElement("div")
  DescriptionDiv.className = "accordion-answer"
  DescriptionDiv.innerText = description

  NewListItem.appendChild(LinkTag)
  NewListItem.appendChild(CompletedButton)
  NewListItem.appendChild(DescriptionDiv)
  if (Meal.IsCompleted) NewListItem.style.backgroundColor = "blue"
  else NewListItem.style.backgroundColor = "white"

  document.getElementById("meal-list").prepend(NewListItem)
}

// we need to use this endpoint on startup 
async function GetMeals() {
  const res = await fetch("http://localhost:3000/api/saveddays/current")
  if (res.status == 400) alert("Bad Request")
  const savedday = await res.json()
  const meals = savedday.meals
  console.log(savedday)
  console.log(meals)
  for (let meal of meals)
    AddMeal(meal)
}

function SideBarToggle() {
  const sidebar = document.getElementById("sidebar")
  if (sidebar.style.left == "0%") sidebar.style.left = "-30%"
  else sidebar.style.left = "0%"
}

async function postmeal(meal) {
  if (!("name" in meal && "description" in meal))
    throw new Error("Invalid Meal")

  const response = await fetch("http://localhost:3000/api/meals",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(meal)
    })

  if (response.status == 400) return alert("Bad Request")
  const JsonResponse = await response.json()
  AddMeal(JsonResponse)
}

function RemoveAllMeals() {
  document.getElementById("meal-list").innerHTML = ""
}

function MealFromSideBar() {
  const name = document.getElementById("meal-name-input").value
  const description = document.getElementById("description-box").value
  const meal = {name, description}
  postmeal(meal)
  SideBarToggle()
}



async function UpdateMeal(meal) {
  const id = meal._id;
  const response = await fetch("http://localhost:3000/api/meals/current/" + id)
}
main()