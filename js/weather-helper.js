/**
 * Common helper functions.
 */
class WeatherHelper {

  /**
   * Fetch weather data
   */


 static populateCities(cities, list) {
  if(cities){
    cities.forEach(city => {
      WeatherHelper.generateMarkup(city, list)
    })
  }
}


  static fetchCity(input, list, msg) {
    const apiKey = "dc9ed5a451686e719ca4fc272a8e4739";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        if(data.cod == 404){

          throw data.msg;
        }

        if(WeatherHelper.storeCityInLocalStorage(data)){

            WeatherHelper.generateMarkup(data, list);
        }else {
            WeatherHelper.updateMarkup(data);
        }
        
        msg.textContent = "";
      })
    .catch(() => {
      msg.textContent = "The city you entered isn't valid";
    });
  }

  /**
   * Generate City Markup.
   */

   static markupString(data){
      const { main, name, sys, weather } = data;
      const icon = `./weather icon packs/colorful/${weather[0].icon}.png`;
      return`<div class="card bg-success border-primary">
      <div class="card-header">${sys.country}</div>
      <img class="card-img-top" src="${icon}" alt="${
        weather[0]["description"]
      }">
      <div class="card-body">
        <h2 class="card-title">${name}</h2>
        <h3 class="card-text">${weather[0]["description"]}</h3>
        <h3 class="card-text">${Math.round(main.temp)} <sup>&deg;C</sup></h3>
        <br>
      </div>
      </div>
      <hr>`;
   }

  static generateMarkup(data, list) {
      const markup = WeatherHelper.markupString(data);
      const div = document.createElement("div");
      div.id = data.name
      div.classList.add("col-md-3");
      div.innerHTML = markup;
      list.appendChild(div);
  }

  static updateMarkup(data){
     const cities = WeatherHelper.fetchLocalStorageData(); 
      if(cities){
           const city = cities.find(cityToFind => cityToFind.name == data.name);
           if(city){
            const markup = WeatherHelper.markupString(data);
            document.querySelector(`#${name}`).innerHTML = markup
           }
      }

  }

  static fetchLocalStorageData(){
    return JSON.parse(localStorage.getItem('cities'));
  }

  static storeCityInLocalStorage(cityData){
      const cities = WeatherHelper.fetchLocalStorageData();

      if(cities){
        const city = cities.find(city => city.name === cityData.name);

        if(!city){
          cities.push(cityData);
          localStorage.setItem('cities',JSON.stringify(cities));
          return true;

        }else if(cityData.main.temp != city.main.temp){
         const updatedCities = cities.map(cityToMap => {
            if(cityToMap.name == city.name){
              cityToMap = city
            }
          });
          localStorage.setItem('cities',JSON.stringify(updatedCities));
          return false;
        }

        return false;
      }

      const newCities = [];
      newCities.push(cityData);
      localStorage.setItem('cities', JSON.stringify(newCities));

      return true;
    }
}