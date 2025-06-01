const series = context.panel.data.series.map((s) => {
    const sData = s.fields.find((f) => f.type === 'number').values.buffer || s.fields.find((f) => f.type === 'number').values;
    const sTime = s.fields.find((f) => f.type === 'time').values.buffer || s.fields.find((f) => f.type === 'time').values;
  
    return {
      name: s.refId,
      type: 'scatter',
      symbolSize: function (val, params) {
        return parseInt(val[2]) * parseInt(val[2]) / 100
      },
      data: sData.map((d, i) => [sTime[i], 30, d?.toFixed()]),
    };
  });
  
  
  
  return {
    backgroundColor: 'transparent',
    title: {
      text: 'Lautstärke max.'
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'time',
      splitNumber: 3,
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
      pieces: [
        { max: 40, color: '#E5EAFF', label: 'Flüstern' },
        { min: 41, max: 60, color: '#bdfcd3', label: 'Regen' },
        { min: 61, max: 80, color: '#70faa0', label: 'Sprechen' },
        { min: 81, max: 90, color: '#e3fa70', label: 'Verkehrslärm' },
        { min: 90, max: 110, color: '#faca70', label: 'Baulärm' },
        { min: 111, color: '#fc6a2b', label: 'Gefahr!' }
      ],
      show: true,
      min: 30,
      max: 200,
      top: "middle",
      color: ['#FCE09B', '#fa817f']
  
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