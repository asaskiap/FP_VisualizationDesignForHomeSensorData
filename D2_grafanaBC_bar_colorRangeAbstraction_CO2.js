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
      // markArea: {
      //   itemStyle: {
      //     color: '#17dd90',
      //     opacity: 0.1
      //   },
      //   data: [
      //     [
      //       {
      //         name: 'optimal',
      //         yAxis: 200
      //       },
      //       {
      //         yAxis: 850
      //       }
      //     ],
      //   ]
      // },
      data: sData.map((d, i) => [sTime[i], d?.toFixed()]),
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
    gradientColor: ['#CCEEFF', '#9adcfc', '#6b99fa', "#bc6bfa", "#fcce83", "#fcab83"],
    visualMap: {
      type: 'piecewise',
      min: 200,
      max: 1500,
      top: 'center',
      pieces: [
        { min: 200, max: 400, label: 'frische Außenluft' },
        { min: 401, max: 600, label: 'gute Innenluft' },
        { min: 601, max: 1000, label: 'akzeptable Innenluft' },
        { min: 1001, max: 1500, label: 'stickig, abgestanden' },
        { min: 1501, max: 2000, label: 'Konzentrationsprobleme\nmgl' },
        { min: 2001, max: 2500, label: 'schlechte Luft' },
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


  // version as state timeline w. color based range abstraction
//   const series = context.panel.data.series.map((s) => {
//     const sData = s.fields.find((f) => f.type === 'number').values.buffer || s.fields.find((f) => f.type === 'number').values;
//     const sTime = s.fields.find((f) => f.type === 'time').values.buffer || s.fields.find((f) => f.type === 'time').values;
  
//     return {
//       name: s.name,
//       type: 'bar',
//       showSymbol: false,
//       barCategoryGap: '2%',
//       areaStyle: {
//         opacity: 0.1,
//       },
//       lineStyle: {
//         width: 1,
//       },
//       data: sData.map((d, i) => [sTime[i], 10, d?.toFixed()]),
//     };
//   });
  
//   context.panel.chart.on('datazoom', function (params) {
//     const startValue = params.batch[0]?.startValue;
//     const endValue = params.batch[0]?.endValue;
//     locationService.partial({ from: startValue, to: endValue });
//   });
  
//   return {
//     backgroundColor: 'transparent',
//     tooltip: {
//       trigger: 'axis',
//     },
//     gradientColor: ['#CCEEFF', '#9adcfc', '#6b99fa', "#bc6bfa", "#fcce83", "#fcab83"],
//     visualMap: {
//       type: 'piecewise',
//       min: 200,
//       max: 1500,
//       orient: 'horizontal',
//       dimension: 2,
//       pieces: [
//         { min: 200, max: 400, label: 'frische Außenluft' },
//         { min: 401, max: 600, label: 'gute Innenluft' },
//         { min: 601, max: 1000, label: 'akzeptable Innenluft' },
//         { min: 1001, max: 1500, label: 'stickig, abgestanden' },
//         { min: 1501, max: 2000, label: 'Konzentrationsprobleme\nmgl' },
//         { min: 2001, max: 2500, label: 'schlechte Luft' },
//       ],
//       outOfRange: {
//         color: '#d13d4e'
//       }
//     },
//     toolbox: {
//       feature: {
//         dataZoom: {
//           yAxisIndex: 'none',
//           icon: {
//             zoom: 'path://',
//             back: 'path://',
//           },
//         },
//         saveAsImage: {},
//       }
//     },
//     xAxis: {
//       type: 'time',
//       splitNumber: 3
//     },
//     yAxis: {
//       show: false,
//       type: 'value',
//       min: 'dataMin',
//       max: 10,
//     },
//     grid: {
//       left: '2%',
//       right: '2%',
//       top: '2%',
//       bottom: '30%',
//       containLabel: true,
//     },
//     series,
//   };