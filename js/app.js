//select sections from html file
const sections = document.querySelectorAll("section");

//select the unorderd list to append list items on it
const ul = document.getElementById("navbar__list");

//create List Items li in the unorderd list navbar__list
function createListItems() {
  // using virsual Document Fragment to avoid reflow and repaint
  let fragment = new DocumentFragment();
  // I choose for....of because I need to loop all sections without using length and make this very easy
  for (let section of sections) {
    //get section name from the data-nav attribute
    let secName = section.getAttribute("data-nav");
    //get id attribute to jumb into section after clicked
    let secLink = section.getAttribute("id");
    //create list that holds section name
    let listItem = document.createElement("li");
    listItem.innerHTML = `<a class="menu__link" href="#${secLink}">${secName}</a>`;
    //add created list into navbar
    fragment.appendChild(listItem);
  }
  ul.appendChild(fragment);
}

//add active class to the section at the viewport
function Active() {
  for (let section of sections) {
    //getBoundingClientRect is built-in function that return postion of the element at the viewport
    let bounding = section.getBoundingClientRect();
    let height = window.innerHeight;
    if (bounding.top >= -100 && bounding.bottom <= height + 100) {
      //checks if section at the viewport to add or remove active class
      if (!section.classList.contains("your-active-class")) {
        section.classList.add("your-active-class");
      }
    } else {
      section.classList.remove("your-active-class");
    }
  }
}

//an app function that runs all program
function App() {
  document.documentElement.style.scrollBehavior = "smooth";
  //run Create list function that take sections names and id to add them into li in the ul
  createListItems();
  //when user scroll the page this event listener will define which function at the view port to add active class
  document.addEventListener("scroll", Active);
}

//run the appliction
App();
