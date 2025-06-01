// QUERY : SELECT mean("humidity") FROM "hygrometer" WHERE ("deviceNo"::tag =~ /^$deviceNo$/) AND $timeFilter GROUP BY time(24h), "deviceNo" fill(null)
const series = context.panel.data.series.map((s) => {
    const sData = s.fields.find((f) => f.type === 'number').values.buffer || s.fields.find((f) => f.type === 'number').values;
    const sTime = s.fields.find((f) => f.type === 'time').values.buffer || s.fields.find((f) => f.type === 'time').values;
  
    return {
      name: s.name,
      type: 'bar',
      showSymbol: false,
      areaStyle: {
        opacity: 0.1,
      },
      lineStyle: {
        width: 1,
      },
      markLine: {
        lineStyle: {
          color: '#17dd90',
          width: 2,
          symbolSize: 0,
          label: {
            show: true,
            formatter: 'Obergrenze'
          }
        },
        data: [
          {
            yAxis: 65,
            name: 'Obergrenze'
          },
  
        ]
      },
      data: sData.map((d, i) => [new Date(sTime[i]).toLocaleDateString('de', {
        weekday:
          'long'
      }), d?.toFixed()]),
    };
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
    gradientColor: ['#f0e69c', "#c6ed77", "#54bf9d", "#345d94"],
    visualMap: {
      type: 'piecewise',
      min: 20,
      max: 80,
      top: 'center',
      pieces: [
        { min: 0, max: 40, label: 'zu niedrig' },
        { min: 41, max: 48, label: 'unterer Optimalbereich' },
        { min: 49, max: 57, label: 'mittlerer Optimalbereich' },
        { min: 58, max: 65, label: 'oberer Optimalbereich' },
        { min: 66, max: 100, label: 'zu hoch' },
      ],
      outOfRange: {
        color: '#d13d4e'
      }
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
      type: "category",
      data: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    },
    yAxis: {
      show: false,
      type: 'value',
      min: 30,
      max: 80
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