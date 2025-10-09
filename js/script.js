const test_lat=30.2;
const test_long=-90.4;

const response = await fetch(`https://api.weather.gov/points/${test_lat},${test_long}`)
console.log(response)