
const series = context.panel.data.series.map((s) => {
    const sData = s.fields.find((f) => f.type === 'number').values.buffer || s.fields.find((f) => f.type === 'number').values;
    const sTime = s.fields.find((f) => f.type === 'time').values.buffer || s.fields.find((f) => f.type === 'time').values;
    const today = new Date(sTime[0]).toDateString();
    const data = sData.map((d, i) => {
      let date = new Date(sTime[i]);
      let hour = date.getHours();
      if (date.toDateString() == today) {
        let val = d?.toFixed() ?? 0;
        return [0, hour, val];
      }
      else return [0, hour, '']
    });
  
    return {
      type: "custom",
      coordinateSystem: "polar",
      itemStyle: {
        color: "#240046",
      },
      renderItem: function (params, api) {
        var values = [api.value(0), api.value(1)];
        var coord = api.coord(values);
        var size = api.size([1, 1], values);
        return {
          type: "sector",
          shape: {
            cx: params.coordSys.cx,
            cy: params.coordSys.cy,
            r0: coord[2] - size[1] / 2,
            r: coord[2] + size[0] / 2,
            startAngle: -(coord[3] + size[1] / 2),
            endAngle: -(coord[3] - size[1] / 2),
          },
          style: api.style({
            fill: api.value(2) ? api.visual("color") : '#fff',
            // stroke: "#fff"
          }),
        };
      },
      data: data
    }
  });
  
  const hours = ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h'];
  
  return {
    backgroundColor: 'transparent',
    gradientColor: ['#e3e386', "#c6ed77", "#54bf9d", "#345d94"],
    polar: {},
    tooltip: {},
    visualMap: {
      type: "continuous",
      min: 35,
      max: 65,
      top: "middle",
      dimension: 2,
      calculable: true,
    },
    angleAxis: {
      type: "category",
      data: hours,
      boundaryGap: false,
      splitLine: {
        show: false,
        lineStyle: {
          color: "#ddd",
          type: "dashed",
        },
      },
      axisLine: {
        show: false,
      },
    },
    radiusAxis: {
      type: "category",
      data: 1,
      show: false,
      z: 100,
    },
    axisLabel: {
      padding: 4,
    },
    series,
  };