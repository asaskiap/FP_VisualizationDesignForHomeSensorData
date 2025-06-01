let rangeCounts = [];
let rangeNames = ['Frische Außenluft ', 'Gute Innenluft ', 'Akzeptable Innenluft ', 'Stickig, Abgestanden ', 'Konzentrationsprobleme/ Kopfschmerzen mgl. ', 'Schlechte Innenluft ', 'Sehr schlecht!! ']
for (let i = 0; i < 8; i++) {
  rangeCounts.push(0);
}
let count = 0;

const series = context.panel.data.series.map((s) => {
  const sData = s.fields.find((f) => f.type === 'number').values.buffer || s.fields.find((f) => f.type === 'number').values;
  const sTime = s.fields.find((f) => f.type === 'time').values.buffer || s.fields.find((f) => f.type === 'time').values;

  sData.map(d => {
    if (d <= 400) rangeCounts[0]++;
    if (d > 400 && d <= 600) rangeCounts[1]++;
    if (d > 600 && d <= 1000) rangeCounts[2]++;
    if (d > 1000 && d <= 1500) rangeCounts[3]++;
    if (d > 1500 && d <= 2000) rangeCounts[4]++;
    if (d > 2000 && d <= 2500) rangeCounts[5]++;
    if (d > 2500) rangeCounts[6]++;
    count++;
  })

  let data = [];
  for (let i = 0; i < 8; i++) {
    if (rangeCounts[i] > 0) {
      data.push({
        name: rangeNames[i] + (rangeCounts[i] * 100 / count).toFixed() + '%', value: rangeCounts[i]
      })
    }
  }
  return {
    name: s.name,
    type: 'pie',
    showSymbol: false,
    center: ['50%', '50%'],
    radius: ['30%', '70%'],
    data: data
    // roseType: 'area',
    //   data: [
    //      { name: 'Frische Außenluft ' + (rangeCounts[0] * 100 / count).toFixed() + '%', value: rangeCounts[0] },
    //      { name: 'Gute Innenluft ' + (rangeCounts[1] * 100 / count).toFixed() + '%', value: rangeCounts[1] },
    //      { name: 'Akzeptable Innenluft ' + (rangeCounts[2] * 100 / count).toFixed() + '%', value: rangeCounts[2] },
    //      { name: 'Stickig, Abgestanden ' + (rangeCounts[3] * 100 / count).toFixed() + '%', value: rangeCounts[3] },
    //      { name: 'Konzentrationsprobleme/ Kopfschmerzen mgl. ' + (rangeCounts[4] * 100 / count).toFixed() + '%', value: rangeCounts[4] },
    //      { name: 'Schlechte Innenluft ' + (rangeCounts[5] * 100 / count).toFixed() + '%', value: rangeCounts[5] },
    //      { name: 'Sehr schlecht!! ' + (rangeCounts[6] * 100 / count).toFixed() + '%', value: rangeCounts[6] },
    //   ]
  };
});

return {
  title: {
    text: 'Luftqualität im ausgewählten Zeitraum'
  },
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
  },
  color: ['#CCEEFF', '#9adcfc', '#6b99fa', "#bc6bfa", "#fcce83", "#fcab83", "#d13d4e"],
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
  series,
};