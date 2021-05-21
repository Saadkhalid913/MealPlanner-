
const GetCurrentDate = function() {
  // returns the current day as the number of days passed since january 1, 1970 
  const MillisecondsInDay = 86400000;
  const offset = 14400000 
  return Math.floor((Date.now() - offset) / MillisecondsInDay)
  //18758 at 8PM 
}

function main() {
  const sideBarToggleButton = document.getElementById("add-button")
  sideBarToggleButton.addEventListener("click", SideBarToggle)
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
  CompletedButton.innerHTML = "Completed"
  CompletedButton.addEventListener("click", () => {
    console.log(ID)
  })
  
  const DescriptionDiv = document.createElement("div")
  DescriptionDiv.className = "accordion-answer"

  NewListItem.appendChild(LinkTag)
  NewListItem.appendChild(CompletedButton)
  NewListItem.appendChild(DescriptionDiv)

  document.getElementById("meal-list").appendChild(NewListItem)
}

async function GetMeals() {
  const res = await fetch("http://localhost:3000/api/meals")
  const meals = await res.json()
  for (let meal of meals)
    AddMeal(meal)
}

function SideBarToggle(){
  const sidebar = document.getElementById("sidebar")
  if (sidebar.style.left == "0%") sidebar.style.left = "-30%"
  else sidebar.style.left = "0%" 
}

async function postmeal(meal) {
  if (!("name" in meal && "description" in meal))
    throw new Error("Invalid Meal")

  const response = await fetch("http://localhost:3000/api/meals", 
  {method: "POST",
   headers: {
    'Content-Type': 'application/json'
  },
   body: JSON.stringify(meal)}) 

  const JsonResponse = await response.json()
  console.log(JsonResponse)
}

main()