// You're going to create a server using Node and Express. 
// This server is going to have the endpoint /compare and will return the amount 
// that bitcoin's value in USD has either risen or fallen between the current day and the previous. 
// You will get this data by using the provided api. 
// Make two separate requests, one for the previous value and one for the current.

const fetch = require('node-fetch');
const CUR_BPI_URI = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const PREV_BPI_URI = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';


function getBPIs() {
    return new Promise((resolve, reject) => {
        fetch(PREV_BPI_URI)
        .then(prevBpi => prevBpi.json())
        .then(prevBpi => {
            const prevBpiObj = prevBpi.bpi;
            let prevBpiValue = 0;
            for (let key in prevBpiObj) {
                if (prevBpiObj.hasOwnProperty(key)) {
                    preBpiValue = prevBpiObj[key];
                }
            }
            fetch(CUR_BPI_URI)
            .then(curBpi => curBpi.json())
            .then(curBpi => {
                const curBpiValue = curBpi.bpi.USD.rate_float;
                const diffNum = curBpiValue - preBpiValue;
                const diffStr = diffNum.toFixed(4);
                if (diffNum < 0) {
                    // res.status(STATUS_SUCCESS);
                    // res.send(`Bitcoin price fell by ${diffStr}`);
                    resolve(`Bitcoin price fell by ${diffStr}`);
                } else if (diffNum === 0) {
                    // res.status(STATUS_SUCCESS);
                    // res.send('Bitcoin price has not changed');
                    resolve('Bitcoin price has not changed');
                } else {
                    // res.status(STATUS_SUCCESS);
                    // res.send(`Bitcoin price rose by ${diffStr}`);
                    resolve(`Bitcoin price rose by ${diffStr}`);
                }
            })
        })
        .catch(err => {
            reject(err);
        });
    });
}

module.exports = getBPIs;