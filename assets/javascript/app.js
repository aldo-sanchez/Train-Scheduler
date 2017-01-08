console.log('hello world');
console.log(moment('20111031', 'YYYYMMDD').fromNow());
var firstTrainTime = '0700';
var trainFrequency = 30;
var testTime = '1010';
var timeDifference = moment().diff(moment(firstTrainTime,'HHmm'),'minutes');

var remainder = parseInt(timeDifference)%trainFrequency
var nextTrain = Math.abs(remainder-trainFrequency);
