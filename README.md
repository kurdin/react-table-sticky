This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and Rescripts.

### Install

`npm i`

### Run

`npm start`

### Change table rows render methods

open src/indexjs and uncomment desired App section

```
// load all rows into the scrolling table
ReactDOM.render(<App />, document.getElementById('root'))

// load rows with @react-libraries/virtual-window 
// ReactDOM.render(<App2 />, document.getElementById('root'))

// load all rows and display those with paganition
// ReactDOM.render(<App3 />, document.getElementById('root'))
```

### Change number of generated rows 

open src/makeData.js and change 

```
// total number of rows to load (vertical scale)
const totalRows = 300;

// total number of days to load (horizonal scale)
const totalDays = 300;
```
