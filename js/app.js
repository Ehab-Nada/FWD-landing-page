//select sections from html file
const sections = document.getElementsByTagName("section");
const links = document.getElementsByClassName("menu__link");

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
    //append a element to the li element
    listItem.append(anc);
    //add created list into navbar using fregmant virtual dom
    fragment.appendChild(listItem);
  }
  //append lists with anchors that create to the ul in the navbar
  document.getElementById("navbar__list").appendChild(fragment);
}
//clicking link item scroll to specific section
function scrollToSection() {
  for (let item of links) {
    item.addEventListener("click", function clicked() {
      let active = document.getElementsByClassName("active");
      if (active.length === 0) {
        item.classList.add("active");
      } else {
        active[0].classList.remove("active");
        item.classList.add("active");
      }
      for (let section of sections) {
        if (section.getAttribute("data-nav") === item.textContent) {
          section.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  }
}

// determine if any part of element visible in viewport
function isInViewport(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */
  );
}

//add active class to the section at the viewport
function scrollActive() {
  for (let section of sections) {
    //check if the section in viewport to add or remove active class
    if (isInViewport(section)) {
      section.classList.add("your-active-class");
      let active = document.getElementsByClassName("active");
      for (let item of links) {
        if (item.textContent === section.getAttribute("data-nav")) {
          if (active.length === 0) {
            item.classList.add("active");
          } else {
            active[0].classList.remove("active");
            item.classList.add("active");
          }
        }
      }
    } else {
      section.classList.remove("your-active-class");
    }
  }
}

//an app function that runs all program
function App() {
  //run Create list function that take sections names and id to add them into li in the ul
  createListItems();
  //when user scroll the page this event listener will define which function at the view port to add active class
  document.addEventListener("scroll", scrollActive);
  scrollToSection();
}

//run the appliction
App();
