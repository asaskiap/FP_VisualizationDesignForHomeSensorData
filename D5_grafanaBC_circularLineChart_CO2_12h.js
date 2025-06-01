
const now = Date.now(); // Get current timestamp in milliseconds
const series = context.panel.data.series.map((s) => {
  sData = s.fields.find((f) => f.type === 'number').values.buffer || s.fields.find((f) => f.type === 'number').values;
  sTime = s.fields.find((f) => f.type === 'time').values.buffer || s.fields.find((f) => f.type === 'time').values;
  data = [];
  time = [];
  const twelveHoursAgo = now - (12 * 60 * 60 * 1000); // 12 hours in milliseconds
  sData.map((d, i) => data.push({ time: sTime[i], val: d }));

  data = data.filter(td => new Date(td.time) >= twelveHoursAgo)
  time = data.map(td => {
    return new Date(td.time).getHours() + 'h'
  })
  return {
    name: s.refId,
    type: 'line',
    showSymbol: false,
    areaStyle: {
      opacity: 0.3,
    },
    lineStyle: {
      width: 1,
    },
    coordinateSystem: 'polar',
    data: data.map(td => td.val?.toFixed()),
  };
});

const startAngle = - new Date(now).getHours() % 12 * 30 + 60
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
  radiusAxis: {
    // type: 'value',
    min: 0,
    max: 2000,
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitArea: {
      show: true,
      areaStyle: {
        //color: ['rgba(21,76,121, 0.1)', 'rgba(16,76,121, 0.1)', 'rgba(118,181,197, 0.1)', 'rgba(118,181,197, 0.1)', 'rgba(234,182,118, 0.1)', "rgba(238,238,228, 0.1)",],
        color: ['#a4d3ed', '#8ab19f', '#A3B18A', '#E9C46A', '#EBCFB2', '#FFCCD5',],
        opacity: 0.2
      }
    }
  },
  angleAxis: {
    type: 'category',
    boundaryGap: false,
    startAngle: startAngle,
    splitLine: {
      show: true
    },
    axisLine: {
      show: false
    },
    data: time
  },
  polar: {},
  series,
};