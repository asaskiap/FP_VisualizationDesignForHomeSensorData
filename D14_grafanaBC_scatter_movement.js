const series = context.panel.data.series.map((s) => {
    const sData = s.fields.find((f) => f.type === 'number').values.buffer || s.fields.find((f) => f.type === 'number').values;
    const sTime = s.fields.find((f) => f.type === 'time').values.buffer || s.fields.find((f) => f.type === 'time').values;
  
    return {
      name: s.refId,
      type: 'scatter',
      symbolSize: function (val, params) {
        return parseInt(val[2]) * parseInt(val[2]) / 10
      },
      data: sData.map((d, i) => [sTime[i], 30, d.toFixed()]),
    };
  });
  
  
  
  return {
    backgroundColor: 'transparent',
    title: {
      text: 'Bewegung'
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'time',
      splitNumber: 5,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: function (index, val) {
        }
      },
      show: true
    },
    yAxis: {
      type: 'value',
      min: 'dataMin',
      show: false
    },
    visualMap: {
      type: "piecewise",
      show: false,
      max: 50,
      color: ['#fa817f', '#FCE09B']
  
    },
    grid: {
      left: '12%',
      right: '2%',
      top: '2%',
      bottom: 24,
      containLabel: true,
    },
    series,
  };