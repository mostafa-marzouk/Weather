"use strict";
const list = document.getElementById("list");
const bar = document.getElementById("bar");
const listMobile = document.getElementById("mobile-navbar")
const search = document.getElementById("search")
const btnSearch = document.getElementById("btnSearch")
let row = document.querySelector(".row")

let data 
let allDate = [] 

bar.addEventListener("click", function () {
  if (listMobile.classList.contains("hidden")) {
      listMobile.classList.remove("hidden"); // Remove hidden to make it visible
      setTimeout(() => listMobile.classList.add("active"), 10); // Add active class for animation
  } else {
      listMobile.classList.remove("active"); // Remove active to start closing animation
    listMobile.addEventListener("transitionend",
      () => listMobile.classList.add("hidden"), // Add hidden after transition ends
          { once: true } // Ensure it runs only once
      );
  }
  
});


search.addEventListener("input", () => {
  getApi(search.value)
  display()
 
})

btnSearch.addEventListener("click", () => {
    display()
})


function display() {

  let div = `
  
                  <div class="col-lg-4">
                  <div class="item1">
                    <div
                      class="title d-flex justify-content-between rounded-left-top"
                    >
                      <small>${allDate[0]} ${allDate[2]}</small>
                      <small>${allDate[1]}</small>
                    </div>
                    <div class="info bg-main rounded-left-buttom">
                      <p class="text-gray ps-3 pt-4 fs-17">${data.location.name}</p>
                      <p class="fs-90 fw-bold m-0 ps-3 mb-4 text-white">
                        ${data.current.temp_c}<sup>o</sup>C
                      </p>
                      <img src="${data.current.condition.icon}" alt="weather">
                      <p class="color-secondary1 mt-2 ps-4">${data.current.condition.text}</p>
                      <div>
                        <i
                          class="fa-solid fs-2 text-gray ps-4 pb-5 fa-cloud-moon-rain"
                        ></i>
                        <i
                          class="fa-solid fs-2 text-gray pb-5 ms-4 fa-cloud-moon-rain"
                        ></i>
                        <i
                          class="fa-solid fs-2 text-gray pb-5 ms-4 fa-cloud-moon-rain"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="item2">
                    <div
                      class="title d-flex justify-content-center align-items-center"
                    >
                      <small>${dayNameTomorrow}</small>
                    </div>
                    <div class="info text-center p-5 text-white">
                    <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="weather">
                      <p class="fs-4 fw-bold m-0">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
                      <p class="text-gray mb-4">${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</p>
                      <p class="color-secondary1">${data.forecast.forecastday[1].day.condition.text}</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="item3">
                    <div
                      class="title rounded-right-top d-flex justify-content-center align-items-center"
                    >
                      <small>${dayThreeDisplay}</small>
                    </div>
                    <div
                      class="info text-center p-5 text-white rounded-right-buttom"
                    >
                    <img src="${data.forecast.forecastday[2].day.condition.icon}" alt="weather">

                      <p class="fs-4 fw-bold m-0">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
                      <p class="text-gray mb-4">${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</p>
                      <p class="color-secondary1">${data.forecast.forecastday[2].day.condition.text}</p>
                    </div>
                  </div>
                </div>

  
  `
  row.innerHTML = div
}



async function getApi(country = "cairo") {
  
  let myRes = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=43e74d45590a4005a9f181921241212&q=${country}&days=3
`)
  data = await myRes.json()
  
  const localTime = data.location.localtime;
  const date = new Date(localTime); 
  const dayName = date.toLocaleString('en-US', { weekday: 'long' });
  const monthName = date.toLocaleString('en-US', { month: 'long' });

  allDate.push(dayName,monthName)  
  let hh = localTime.split(" ",)
  let uu = hh[0].split("-")
  let dayNum = uu[2]
  allDate.push(dayNum)  
  display()
  console.log(data.current.temp_c);

}


// Create a Date object for today
const today = new Date();
// Create a Date object for tomorrow
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1); // Add 1 day to today's date
// Get tomorrow's name
const dayNameTomorrow = tomorrow.toLocaleString('en-US', { weekday: 'long' });
const dayThree = new Date()
dayThree.setDate(tomorrow.getDate() + 1)
const dayThreeDisplay = dayThree.toLocaleString('en-US', { weekday: 'long' });
// console.log(`Tomorrow is: ${dayThreeDisplay}`); // Example: Tomorrow is: Thursday

getApi()




