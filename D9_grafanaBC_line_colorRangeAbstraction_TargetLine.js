// QUERY: SELECT mean("humidity") FROM "hygrometer" WHERE ("deviceNo"::tag =~ /^$deviceNo$/) AND $timeFilter GROUP BY time(1h), "deviceNo" fill(null)
const series = context.panel.data.series.map((s) => {
    const sData = s.fields.find((f) => f.type === 'number').values.buffer || s.fields.find((f) => f.type === 'number').values;
    const sTime = s.fields.find((f) => f.type === 'time').values.buffer || s.fields.find((f) => f.type === 'time').values;
  
    return {
      name: s.name,
      type: 'line',
      showSymbol: false,
      lineStyle: {
        width: 3,
      },
      markLine: {
        lineStyle: {
          color: '#17dd90',
          width: 1,
  
          label: {
            show: true,
            formatter: 'Obergrenze'
          }
        },
        data: [
  
          {
            yAxis: 65,
            symbol: 'none',
            name: 'Obergrenze'
          },
        ]
      },
      data: sData.map((d, i) => [sTime[i], d?.toFixed()]),
    };
  });
  
  /**
   * Enable Data Zoom by default
   */
  setTimeout(() => context.panel.chart.dispatchAction({
    type: 'takeGlobalCursor',
    key: 'dataZoomSelect',
    dataZoomSelectActive: true,
  }), 500);
  
  /**
   * Update Time Range on Zoom
   */
  context.panel.chart.on('datazoom', function (params) {
    const startValue = params.batch[0]?.startValue;
    const endValue = params.batch[0]?.endValue;
    locationService.partial({ from: startValue, to: endValue });
  });
  
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      left: '0',
      bottom: '0',
      data: context.panel.data.series.map((s) => s.refId),
      textStyle: {
        color: 'rgba(128, 128, 128, .9)',
      },
    },
    gradientColor: ['#e3ca86', "#c6ed77", "#54bf9d", "#345d94"],
    visualMap: {
      type: 'piecewise',
      min: 20,
      max: 80,
      top: 'center',
      pieces: [
        { min: 0, max: 40, label: 'zu niedrig' },
        { min: 40, max: 65, label: 'optimal' },
        { min: 65, max: 100, label: 'zu hoch' },
      ],
      // outOfRange: {
      //   color: '#d13d4e'
      // }
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
    xAxis: {
      type: 'time',
      splitNumber: 3
    },
    yAxis: {
      show: false,
      type: 'value',
      min: 'dataMin',
    },
    grid: {
      left: '10%',
      right: '2%',
      top: '2%',
      bottom: 24,
      containLabel: true,
    },
    series,
  };