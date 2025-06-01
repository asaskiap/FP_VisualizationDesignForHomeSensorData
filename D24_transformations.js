const series = []; 
const mondays = [];
const tuesdays = [];
const wednesdays = [];
const thursdays = [];
const fridays = [];
const saturdays = [];
const sundays = [];
context.panel.data.series.map((s) => {
    const sData = s.fields.find((f) => f.type === 'number').values.buffer || s.fields.find((f) => f.type === 'number').values;
    const sTime = s.fields.find((f) => f.type === 'time').values.buffer || s.fields.find((f) => f.type === 'time').values;

    sData.map((d,i) => {
        // new date(sTime[i]) -> check weekday --> weekday.push([d, new Date(sTime[i]]) )
    })
});