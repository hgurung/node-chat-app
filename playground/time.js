var moment = require('moment');

var timestamps = moment().valueOf(); 
console.log(timestamps);
var createdAt = moment().valueOf(); 
var date = moment(createdAt);
console.log(date.format('h:mm a'));
