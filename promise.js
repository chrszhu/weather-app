
const request = require('request');
const config = require('./config.js');
//
var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    console.log(config.geocodeKey)

    const encodedAddress = encodeURIComponent(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${config.geocodeKey}`,
      json: true
    }, (error, response, body) => {

      if (error) {
        console.log("hello2")
        reject('Unable to connect to Google servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        console.log("hello")

        reject('Unable to find that address.');
      } else if (body.status === 'OK') {
        console.log("hello3")

        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });

});
}

geocodeAddress('00000').then((location) => {
  console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage) => {
  console.log(errorMessage);
});

// const request = require('request');
//
// var geocodeAddress = (address) => {
//   return new Promise((resolve, reject) => {
//     var encodedAddress = encodeURIComponent(address);
//
//     request({
//       url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${config.geocodeKey}`,
//       json: true
//     }, (error, response, body) => {
//       if (error) {
//         reject('Unable to connect to Google servers.');
//       } else if (body.status === 'ZERO_RESULTS') {
//         reject('Unable to find that address.');
//       } else if (body.status === 'OK') {
//         resolve({
//           address: body.results[0].formatted_address,
//           latitude: body.results[0].geometry.location.lat,
//           longitude: body.results[0].geometry.location.lng
//         });
//       }
//     });
//   });
// };
//
// geocodeAddress('00000').then((location) => {
//   console.log(JSON.stringify(location, undefined, 2));
// }, (errorMessage) => {
//   console.log(errorMessage);
// });
