
const series = context.panel.data.series.map((s) => {
    const sData = s.fields.find((f) => f.type === 'number').values.buffer || s.fields.find((f) => f.type === 'number').values;
    const sTime = s.fields.find((f) => f.type === 'time').values.buffer || s.fields.find((f) => f.type === 'time').values;
    const today = new Date().toDateString();
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
            fill: api.visual("color"),
            stroke: "#fff"
          }),
        };
      },
      data: data
    }
  });
  
  const hours = ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h'];
  
  const timebarData = [];
  const now = new Date().getHours();
  if (now > 12) {
    for (let i = 12; i < 24; i++) {
      (i == (now)) ? timebarData.push([0, i - 12, 70]) : timebarData.push([0, i - 12, 0])
    }
  } else {
    for (let i = 1; i < 13; i++) {
      (i == (now)) ? timebarData.push([0, i, 70]) : timebarData.push([0, i, 70])
    }
  }
  
  const timebar = {
    type: 'bar',
    coordinateSystem: "polar",
    itemStyle: {
      color: "#fff",
    },
    data: timebarData
  }
  
  
  series.push(timebar)
  return {
    backgroundColor: 'transparent',
    gradientColor: ['#e3e386', "#c6ed77", "#54bf9d", "#345d94"],
    polar: {},
    tooltip: {},
    visualMap: {
      type: "piecewise",
      min: 40,
      max: 65,
      top: "middle",
      dimension: 2,
      pieces: [
        { min: 0, max: 40, label: 'zu niedrig' },
        { min: 41, max: 48, label: 'unterer Optimalbereich' },
        { min: 49, max: 57, label: 'Optimalbereich' },
        { min: 58, max: 65, label: 'oberer Optimalbereich' },
        { min: 66, max: 100, label: 'zu hoch' },
      ],
      outOfRange: {
        color: '#B2003C'
      }
  
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