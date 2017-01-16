var tableArray = [];

$(document).ready(function(){
  // Update table every 3minutes
  setInterval(function(){getNextTrain()},60000*3);
})


$('#submit').on('click',function(){
  //if formValidation() is true then we submit all values
  if(formValidation()){
    var trainName = $('#train_name').val().trim();
    var destination = $('#destination').val().trim();
    var firstTrainTime = $('#train_time').val().trim();
    var trainFrequency = $('#train_frequency').val().trim();

    $('input').val('');
    // $('input').removeClass('active')
    Materialize.updateTextFields();
    

    writeNewPost(trainName,destination,firstTrainTime,trainFrequency);
  }
  return false
});

function formValidation(){
  var regex = /^[0-9]+$/; //regExpression checking for only digits
  var inputs = $('input'); //short hand for all form inputs
  var isReady = true; //bool to be used to check if form is ready to submit
  //check if all form inputs have information
  for (i = 0; i < inputs.length; i++){ 
    if(inputs[i].value == ''){
      console.log('please fill all required');
      isReady = false;
    }
  }
  // check if both train time and train frequency are numbers
  if (!regex.test(inputs[2].value) || !regex.test(inputs[3].value)){
    console.log('need numbers')
    isReady = false;
  }
  // check if train time is in military form (4 digits)
  if(inputs[2].value.length != 4){
    isReady = false;
    console.log('need military time')
  }

  // check if train time hour is valid <24
  if(parseInt(inputs[2].value.substring(0,2)) > 24){
    isReady = false;
    console.log('invalid hour')
  }
  
  // check if train time minutes are valid < 60
  if(parseInt(inputs[2].value.substring(2)) > 60){
    isReady = false;
    console.log('invalid minutes')
  }
  // finalize validation
  if(isReady){
    return true
  }
  else{return false}
}

// Calculates next train and minutesAway using the global tableArray
function getNextTrain(){
  for(row = 0; row < tableArray.length; row++){
    // define firstTrainTime and trainFrequency
    var firstTrainTime = tableArray[row][2];
    var trainFrequency = tableArray[row][3];
    // calculate time difference between now and firstTrainTime
    var timeDifference = moment().diff(moment(firstTrainTime,'HHmm'),        'minutes');
    // calculate the remainder of timeDifference and trainFrequency
    var remainder = parseInt(timeDifference)%trainFrequency;
    // minutesAway = remainder - trainFrequency. use absolute value to only get positive minutes.
    var minutesAway = Math.abs(remainder-trainFrequency);
    // add minutesAway to now to get when nextTrain arrives
    var nextTrain = moment().add(minutesAway,'minutes').format('HH:mm');

    // set values in tableArray for minutesAway and nextTrain
    tableArray[row][4] = minutesAway;
    tableArray[row][5] = nextTrain;
  }
  updateTable();
}

function updateTable(){
  $('tbody').empty();
  for(row = 0; row < tableArray.length; row++){
    trainName = tableArray[row][0];
    destination = tableArray[row][1];
    trainFrequency = tableArray[row][3];
    minutesAway = tableArray[row][4];
    nextArrival = tableArray[row][5];
    
    idtr = 'd'+row;//short hand for id given to table tags

    tr = $('<tr></tr>');
    tr.attr({id: 't'+row});

    // create html tags for table values
    td_trainName = $('<td></td>');
    td_destination = $('<td></td>');
    td_trainFrequency = $('<td></td>');
    td_nextArrival = $('<td></td>');
    td_minutesAway = $('<td></td>');

    // add table information and append to tr
    td_trainName.attr({id: idtr}).text(trainName).appendTo(tr);
    td_destination.attr({id: idtr}).text(destination).appendTo(tr);
    td_trainFrequency.attr({id: idtr}).text(trainFrequency).appendTo(tr);
    td_nextArrival.attr({id: idtr}).text(nextArrival).appendTo(tr);
    td_minutesAway.attr({id: idtr}).text(minutesAway).appendTo(tr);
    
    tr.appendTo($('tbody'));
  }
}