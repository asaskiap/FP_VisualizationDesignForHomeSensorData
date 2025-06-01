// Handelbars
// {{!-- {{json @root}} --}}
// <div>
// {{#if (high data)}}
// <image width="1200" src ="https://i.postimg.cc/h4k84h2H/Firefly-A-potted-plant-with-roots-stems-leaves-and-lush-blooming-multicolored-flowers-in-bright-67.jpg">
// {{/if}}
// {{#if (medhigh data)}}
// <image width="1200" src ="https://i.postimg.cc/zBCjGTHB/Firefly-A-potted-plant-with-roots-stems-leaves-and-lush-blooming-multicolored-flowers-in-bright-50.jpg">
// {{/if}}
// {{#if (med data)}}
// <image width="1200" src="https://i.postimg.cc/vTWm4LW4/Firefly-A-potted-plant-with-roots-stems-leaves-and-lush-blooming-pale-dried-flowers-40.jpg">
// {{/if}}
// {{#if (low data)}}
// <image width="1200" src="https://i.postimg.cc/rF8nZyK4/Firefly-A-potted-plant-with-roots-stems-leaves-and-lush-blooming-pale-dried-flowers-30.jpg">
// {{/if}}
// <h1 style="position: fixed; bottom: 8rem; right: 2rem; font-size: 4rem">
//   <b style="color: #692d00; padding: 1px 8px;  background-color: rgba(245, 241, 220, 0.3)" >{{truncateHum data}}%</b></h1>
// <h1 style="position: fixed; bottom: 14rem; right: 2rem; font-size: 4rem">
//   <b style="color: #692d00; padding: 1px 8px;  background-color: rgba(245, 241, 220, 0.3)" >{{truncateCo2 data}}ppm</b></h1>
// <h1 style="position: fixed; bottom: 2rem; right: 2rem; font-size: 4rem">
//   <b style="color: #692d00; padding: 1px 8px;  background-color: rgba(245, 241, 220, 0.3)" >{{truncateTemp data}}°</b></h1>
// </div> 
// </image>

{/* JS */}

handlebars.registerHelper("high", function (data) {
  let co2 = data[1]?.Mean.toFixed();
  let temp = data[2]?.Mean.toFixed();
  let humidity = data[0]?.Mean.toFixed();
  return calculateRoomClimate(co2, temp, humidity) > 80;
})
handlebars.registerHelper("medhigh", function (data) {
  let co2 = data[1]?.Mean.toFixed();
  let temp = data[2]?.Mean.toFixed();
  let humidity = data[0]?.Mean.toFixed();
  let res = calculateRoomClimate(co2, temp, humidity);
  return res < 80 && res > 60;

})
handlebars.registerHelper("med", function (data) {
  let co2 = data[1]?.Mean.toFixed();
  let temp = data[2]?.Mean.toFixed();
  let humidity = data[0]?.Mean.toFixed();
  let res = calculateRoomClimate(co2, temp, humidity)
  return res < 60 && res > 35;
})
handlebars.registerHelper("low", function (data) {
  let co2 = data[1]?.Mean.toFixed();
  let temp = data[2]?.Mean.toFixed();
  let humidity = data[0]?.Mean.toFixed();
  return calculateRoomClimate(co2, temp, humidity) < 35;
})

handlebars.registerHelper('truncateHum', function (val) {
  return val[0]?.Mean.toFixed()
})
handlebars.registerHelper('truncateCo2', function (val) {
  return val[1]?.Mean.toFixed()
})
handlebars.registerHelper('truncateTemp', function (val) {
  return val[2]?.Mean.toFixed()
})

//
function calculateRoomClimate(co2, temperature, humidity) {
  function getCO2Score(co2) {
    if (co2 < 600) return 100;
    if (co2 < 1000) return 80;
    if (co2 < 1500) return 50;
    if (co2 < 2500) return 20;
    return 0;
  }

  function getTemperatureScore(temp) {
    if (temp >= 19 && temp <= 24) return 100;
    if ((temp >= 15 && temp < 19) || (temp > 24 && temp <= 27)) return 70;
    return 30;
  }

  function getHumidityScore(humidity) {
    if (humidity >= 40 && humidity <= 60) return 100;
    if ((humidity >= 30 && humidity < 40) || (humidity > 60 && humidity <= 70)) return 70;
    if (humidity > 80) return 0;
    return 30;
  }

  let co2Score = getCO2Score(co2);
  let tempScore = getTemperatureScore(temperature);
  let humidityScore = getHumidityScore(humidity);

  let overallScore = (co2Score + tempScore + humidityScore) / 3;

  return Math.round(overallScore); // Returns a score between 0 - 100
}

// SELECT mean("humidity") FROM "hygrometer" 
// WHERE ("deviceNo"::tag = '1') AND time >= 1743458400000ms and time <= 1744149599000ms 
// GROUP BY time(15m), "deviceNo" fill(null);
// SELECT mean("co2") FROM "co2" WHERE ("deviceNo"::tag = '4') AND time >= 1743458400000ms and time <= 1744149599000ms 
// GROUP BY time(15m) fill(null);
// SELECT mean("ambientTemperature") FROM "thermometer" 
// WHERE ("deviceNo"::tag = '1') AND time >= 1743458400000ms and time <= 1744149599000ms 
// GROUP BY time(15m) fill(null)