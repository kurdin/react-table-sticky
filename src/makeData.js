import namor from 'namor'

let startWeek = 1;
// total number of rows to load (vertical scale)
const totalRows = 300;

// total number of days to load (horizonal scale)
const totalDays = 300;

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

export const dayForHeaders = [...Array(totalDays).keys()].filter(n => n > 0).map(n => ({Header: `Day ${n}`, accessor: `day${n}`, day: n }))

export const daysHeaders = dayForHeaders.reduce((arr,day) => {
  arr.push({
    Header: `Week ${startWeek}`,
    accessor: `week${startWeek}`,
    columns: [
      {...day}
    ]
  })
  if (day.day % 7 === 0) {
    startWeek = startWeek + 1;
  }

  return arr;
}, []);

const newData = () => {
  const cols = {
    col1: namor.generate({ words: 1, numbers: 0 }),
    col2: namor.generate({ words: 1, numbers: 0 })
  }
  const days = [...Array(totalDays).keys()].map(n => ({[`day${n + 1}`]: Math.floor(Math.random() * 20) }))

  const daysObj = days.reduce((obj,item) => { 
    const [key, value] = Object.entries(item)[0];
        return {...obj, ...{[key]: value < 5 ? '-' : value} }
   }, {} );

  return {...daysObj, ...cols}


}

function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map((d, i) => {
      return {
        ...newData(),
        col1: i + 1,
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}

export default makeData(totalRows);

