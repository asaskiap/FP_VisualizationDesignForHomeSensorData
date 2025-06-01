const smiley = "path://M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,16.9705627 7.02943725,21 12,21 Z M15,13.5 C15,13.2238576 15.2238576,13 15.5,13 C15.7761424,13 16,13.2238576 16,13.5 C16,15.4329966 14.4329966,17 12.5,17 L11.5,17 C9.56700338,17 8,15.4329966 8,13.5 C8,13.2238576 8.22385763,13 8.5,13 C8.77614237,13 9,13.2238576 9,13.5 C9,14.8807119 10.1192881,16 11.5,16 L12.5,16 C13.8807119,16 15,14.8807119 15,13.5 Z M9,11 C8.44771525,11 8,10.5522847 8,10 C8,9.44771525 8.44771525,9 9,9 C9.55228475,9 10,9.44771525 10,10 C10,10.5522847 9.55228475,11 9,11 Z M15,11 C14.4477153,11 14,10.5522847 14,10 C14,9.44771525 14.4477153,9 15,9 C15.5522847,9 16,9.44771525 16,10 C16,10.5522847 15.5522847,11 15,11 Z"
const frown = 'path://M8.36,15.33a1,1,0,0,0-.13,1.4,1,1,0,0,0,1.41.13,3.76,3.76,0,0,1,4.72,0,1,1,0,0,0,1.41-.13,1,1,0,0,0-.13-1.4A5.81,5.81,0,0,0,8.36,15.33ZM9,11a1,1,0,1,0-1-1A1,1,0,0,0,9,11Zm3-9A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM15,9a1,1,0,1,0,1,1A1,1,0,0,0,15,9Z'
const neutral = 'path://M8 15H16M15 9H15.01M9 9H9.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.5 9C15.5 9.27614 15.2761 9.5 15 9.5C14.7239 9.5 14.5 9.27614 14.5 9C14.5 8.72386 14.7239 8.5 15 8.5C15.2761 8.5 15.5 8.72386 15.5 9ZM9.5 9C9.5 9.27614 9.27614 9.5 9 9.5C8.72386 9.5 8.5 9.27614 8.5 9C8.5 8.72386 8.72386 8.5 9 8.5C9.27614 8.5 9.5 8.72386 9.5 9Z'

let heatmapData = [];
let values = [];
const sData = context.panel.data.series[0]?.fields[1].values;
const sTime = context.panel.data.series[0]?.fields[0].values;
sData?.map((d, i) => {
  let date = (new Date(sTime[i]).toISOString()).split('T')[0];
  let val = d > 65 ? "Schimmel mgl" : d >= 40 ? "gut" : 'trocken';
  heatmapData.push([date, d?.toFixed()]);
  values.push([date, val]);
})



return {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
  },
  gradientColor: ['#e3ca86', "#c6ed77", "#54bf9d", "#345d94"],
  visualMap: {
    type: 'piecewise',
    min: 0,
    max: 100,
    top: 'center',
    pieces: [
      { min: 0, max: 40, label: 'zu niedrig' },
      { min: 40, max: 48 },
      { min: 48, max: 57 },
      { min: 57, max: 65 },
      { min: 65, max: 100, label: 'zu hoch' },
    ],
  },
  calendar: [
    {
      left: 'center',
      top: 'middle',
      cellSize: [70, 70],
      yearLabel: { show: true, position: 'left' },
      orient: 'vertical',
      dayLabel: {
        show: true,
        firstDay: 1,
        nameMap: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],

      },
      monthLabel: {
        show: true
      },
      range: '2025-05'
    }
  ],
  series: [
    {
      type: 'scatter',
      coordinateSystem: 'calendar',
      symbolSize: 0,
      label: {
        show: true,
        formatter: function (params) {
          var d = new Date(params.value[0]);
          return d.getDate() + '\n\n';
        },
        color: '#000'
      },
      data: heatmapData,
      silent: true
    },
    {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: heatmapData
    },
    {
      type: 'scatter',
      coordinateSystem: 'calendar',
      symbolSize: 0,
      color: '#a00',
      symbolOffset: [0, 15],
      // symbol: function (params) {
      //   if (parseInt(params[1]) > 65) {
      //     return frown;
      //   }
      //   if (parseInt(params[1]) > 40) {
      //     return smiley;
      //   }
      //   return neutral;
      // },
      label: {
        show: false,
        formatter: function (params) {
          return '' + (params.value[1] || '');
        },
        fontSize: 14,
        fontWeight: 700,
        color: '#a00'
      },
      data: values,
      silent: true
    },

  ]
};