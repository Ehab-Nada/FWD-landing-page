//select sections from html file
const sections = document.getElementsByTagName("section");

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
    //creact a element
    let anc = document.createElement("a");
    // add class to the a
    anc.className = "menu__link";
    //give text to the name of section
    anc.textContent = secName;
    //set href attribue to the id of section in order to jumb
    anc.setAttribute("href", `#${secLink}`);
    //append a element to the li element
    listItem.append(anc);
    //add created list into navbar using fregmant virtual dom
    fragment.appendChild(listItem);
  }
  //append lists with anchors that create to the ul in the navbar
  document.getElementById("navbar__list").appendChild(fragment);
}

// determine if any part of element visible in viewport
function isInViewport(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  let width = el.offsetWidth;
  let height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    left < window.pageXOffset + window.innerWidth &&
    top + height > window.pageYOffset &&
    left + width > window.pageXOffset
  );
}

//add active class to the section at the viewport
function scrollActive() {
  for (let section of sections) {
    //check if the section in viewport to add or remove active class
    isInViewport(section)
      ? section.classList.add("your-active-class")
      : section.classList.remove("your-active-class");
  }
}

//an app function that runs all program
function App() {
  //add scroll behavior smooth to style of the whole html
  document.documentElement.style.scrollBehavior = "smooth";
  //run Create list function that take sections names and id to add them into li in the ul
  createListItems();
  //when user scroll the page this event listener will define which function at the view port to add active class
  document.addEventListener("scroll", scrollActive);
}

//run the appliction
App();
