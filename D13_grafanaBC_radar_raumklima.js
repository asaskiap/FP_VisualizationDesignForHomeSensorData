function getCO2Score(co2) {
    if (co2 < 400) return 20;
    if (co2 < 500) return 35;
    if (co2 < 600) return 40;
    if (co2 < 1000) return 50;
    if (co2 < 1200) return 60;
    if (co2 < 1500) return 70;
    if (co2 < 2500) return 90;
    return 100;
  }
  
  function getTemperatureScore(temp) {
    if (temp < 16) return 20;
    if (temp < 18) return 35;
    if (temp < 20) return 40;
    if (temp < 22) return 50;
    if (temp < 24) return 60;
    if (temp < 27) return 65;
    if (temp < 29) return 70;
    if (temp < 33) return 90;
    return 100;
  }
  
  function getHumidityScore(humidity) {
    return humidity;
  }
  
  // calculate overall score
  function calculateAirQuality(co2, temperature, humidity) {
    let co2Score = getCO2Score(co2);
    let tempScore = getTemperatureScore(temperature);
    let humidityScore = getHumidityScore(humidity);
  
    let overallScore = (co2Score + tempScore + humidityScore) / 3;
  
    return Math.round(overallScore); // Returns a score between 0 - 100
  }
  
  console.log(context.panel.data.series)
  const series = [];
  
  const values = context.panel.data.series.map((s, sensorIndex) => {
  
    const sData = s.fields.find((f) => f.type === 'number').values.buffer || s.fields.find((f) => f.type === 'number').values;
    const sTime = s.fields.find((f) => f.type === 'time').values.buffer || s.fields.find((f) => f.type === 'time').values;
    let dataval = null;
    while (!dataval) {
      dataval = sData.pop();
    }
    return dataval;
  })
  
  
  
  series.push({
    type: "radar",
    data: [
      {
        value: [
          getCO2Score(values[3]), // co2
          getHumidityScore(values[0]), // h1
          getHumidityScore(values[1]), // h2
          getHumidityScore(values[2]), //h3
          getTemperatureScore(values[4]), // t1
          getTemperatureScore(values[5]), // t2
          getTemperatureScore(values[6]), // t3
        ],
        name: "Momentan",
      },
    ],
    areaStyle: {
      color: "rgba(184, 136, 176, 0.2)"
    }
  })
  series.unshift({
    type: "radar",
    itemStyle: {
      showSymbol: false
    },
    areaStyle: {
      color: 'rgba(136, 172, 184, 0.2)',
    },
    data: [
      {
        value: [60, 60, 60, 60, 60, 60, 60],
        name: "Obere Grenze Optimalbereich",
      },
    ],
  })
  series.push({
    type: "radar",
    areaStyle: {
      color: 'rgba(255, 204, 213, 0.5)',
    },
    data: [
      {
        value: [30, 30, 30, 30, 30, 30, 30],
        name: "Untere Grenze Optimalbereich",
      },
    ],
  })
  
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
          icon: {
            zoom: 'path://',
            back: 'path://',
          },
        },
        saveAsImage: {},
      }
    },
    title: {
      text: "Raumklima",
    },
    legend: {
      data: ["Untere Grenze Optimalbereich", "Momentan", "Obere Grenze Optimalbereich"],
    },
    color: ['#FFCCD5', "#b888b7", '#72658f'].reverse(),
    radar: {
      indicator: [
        { name: "Co2", min: 0, max: 60 },
        { name: "Luftfeuchtigkeit WZ", min: 0, max: 60 },
        { name: "Luftfeuchtigkeit Küche", min: 0, max: 60 },
        { name: "Luftfeuchtigkeit Bad", min: 0, max: 60 },
        { name: "Temperatur WZ", min: 0, max: 60 },
        { name: "Temperatur Küche", min: 0, max: 60 },
        { name: "Temperatur Bad", min: 0, max: 60 },
      ],
      radius: 200,
      shape: "circle",
      splitArea: {
        show: true,
      }
    },
    series,
  };