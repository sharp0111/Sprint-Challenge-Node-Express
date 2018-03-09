// You're going to create a server using Node and Express. 
// This server is going to have the endpoint /compare and will return the amount 
// that bitcoin's value in USD has either risen or fallen between the current day and the previous. 
// You will get this data by using the provided api. 
// Make two separate requests, one for the previous value and one for the current.
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3040;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;
const CUR_BPI_URI = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const PREV_BPI_URI = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';

app.get('/compare', (req, res) => {
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
                res.status(STATUS_SUCCESS);
                res.send(`Bitcoin price fell by ${diffStr}`);
            } else if (diffNum === 0) {
                res.status(STATUS_SUCCESS);
                res.send('Bitcoin price has not changed');
            } else {
                res.status(STATUS_SUCCESS);
                res.send(`Bitcoin price rose by ${diffStr}`);
            }
        })
    })
    .catch(err => {
        res.status(STATUS_USER_ERROR);
        res.send( {err: err} );
      });
});

// app.get('/place', (req, res) => {
//   let search = req.query.search.split(' ');
//   search = search.join('+');
//   const searchUrl = URI_TEXT_SEARCH + search + '&key=' + KEY_GMAPS_PLACES;
//   console.log("url", searchUrl);
//   fetch(searchUrl, { method: 'GET'})
//     .then(places => places.json())
//     .then(places => {
//       const placeId = places.results[0].place_id;
//       const detailsUrl = URI_PLACE_DETAILS + placeId + '&key=' + KEY_GMAPS_PLACES;
//       fetch(detailsUrl)
//         .then(details => details.json())
//         .then(details => {
//           res.status(STATUS_SUCCESS);
//           res.send(details.result);
//         })
//         .catch(err => {
//           console.log(err);
//           res.status(STATUS_USER_ERROR);
//           res.send({ err: err} );
//         });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(STATUS_USER_ERROR);
//       res.send( {err: err} );
//     });
// });

// app.get('/places', (req, res) => {
//   const search = req.query.search;
//   const searchUrl = URI_TEXT_SEARCH + search + '&key=' + KEY_GMAPS_PLACES;

//   fetch(searchUrl)
//     .then(places => places.json())
//     .then(places => {
//       placeIds = places.results.map(place => place.place_id);
//       details = placeIds.map(id => {
//         const detailsUrl = URI_PLACE_DETAILS + id + '&key=' + KEY_GMAPS_PLACES;
//         return fetch(detailsUrl)
//           .then(detailed => detailed.json())
//           .then(detailed => detailed.result);
//       });

//       Promise.all(details)
//         .then(details => {
//           res.status(STATUS_SUCCESS);
//           res.send( {places: details} )
//         })
//         .catch(err => {
//           console.log(err)
//           res.status(STATUS_USER_ERROR);
//           res.send( {err: err});
//         });
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(STATUS_USER_ERROR);
//       res.send( {err: err} );
//     });
// });

app.listen(PORT, err => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});

