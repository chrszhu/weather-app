const yargs = require('yargs');
const axios = require('axios');
const config = require('./config.js');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  const encodedAddress = encodeURIComponent(argv.address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${config.geocodeKey}`;
  axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
      throw new Error('unable to find address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;

    var weatherUrl = `https://api.darksky.net/forecast/${config.darkskyKey}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);

  }).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
  }).catch((e) => {
    if(e.code === 'ENOTFOUND') {
      console.log('unable to connect');
    }
    console.log(e.message);
  })
