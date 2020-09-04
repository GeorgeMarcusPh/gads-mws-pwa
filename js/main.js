const form = document.querySelector("form");
const input = document.querySelector(".city-input");
const msg = document.querySelector(".msg");
const list = document.querySelector(".cities");


document.addEventListener('DOMContentLoaded', (event) => {

  // Register the Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js')
      .then( (registration) => {
        // Registration is successful
        console.log('ServiceWorker registered');
      })
      .catch( (error) => {
        // registration failed
        console.log('registration failed: ', error);
      });
  }
  const cities = WeatherHelper.fetchLocalStorageData();

  if(cities){
     WeatherHelper.populateCities(cities, list);
  }
 
});

/* On Form Submit Event Handler */
form.addEventListener("submit", (e) => {
  e.preventDefault();
    const cityInput = input.value;
    if(cityInput){
       WeatherHelper.fetchCity(cityInput, list, msg);
     }else{
      msg.textContent = "City textbox cannot be empty"
     }
   
   form.reset();
   input.focus();
});
