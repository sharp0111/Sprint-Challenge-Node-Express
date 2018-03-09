const express = require('express');
const bitcoinsRouter = require('./controllers/bitcoins.js');

const app = express();
const PORT = 3040;

app.use(bitcoinsRouter);

app.listen(PORT, err => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});

// Non-MC solution
// const express = require('express');
// const fetch = require('node-fetch');

// const app = express();
// const PORT = 3040;
// const STATUS_SUCCESS = 200;
// const STATUS_USER_ERROR = 422;
// const CUR_BPI_URI = 'https://api.coindesk.com/v1/bpi/currentprice.json';
// const PREV_BPI_URI = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';

// app.get('/compare', (req, res) => {
//     fetch(PREV_BPI_URI)
//     .then(prevBpi => prevBpi.json())
//     .then(prevBpi => {
//         const prevBpiObj = prevBpi.bpi;
//         let prevBpiValue = 0;
//         for (let key in prevBpiObj) {
//             if (prevBpiObj.hasOwnProperty(key)) {
//                 preBpiValue = prevBpiObj[key];
//             }
//         }
//         fetch(CUR_BPI_URI)
//         .then(curBpi => curBpi.json())
//         .then(curBpi => {
//             const curBpiValue = curBpi.bpi.USD.rate_float;
//             const diffNum = curBpiValue - preBpiValue;
//             const diffStr = diffNum.toFixed(4);
//             if (diffNum < 0) {
//                 res.status(STATUS_SUCCESS);
//                 res.send(`Bitcoin price fell by ${diffStr}`);
//             } else if (diffNum === 0) {
//                 res.status(STATUS_SUCCESS);
//                 res.send('Bitcoin price has not changed');
//             } else {
//                 res.status(STATUS_SUCCESS);
//                 res.send(`Bitcoin price rose by ${diffStr}`);
//             }
//         })
//     })
//     .catch(err => {
//         res.status(STATUS_USER_ERROR);
//         res.send( {err: err} );
//       });
// });
