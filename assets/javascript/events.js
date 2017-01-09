$('#submit').on('click',function(){
  //if formValidation() is true then we submit all values
  if(formValidation()){
    trainName = $('#train_name').val().trim();
    destination = $('#destination').val().trim();
    firstTrainTime = $('#train_time').val().trim();
    trainFrequency = $('#train_frequency').val().trim();

    $('#train_name').val('');
    $('#destination').val('');
    $('#train_time').val('');
    $('#train_frequency').val('');
    
    $('tbody').empty();

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
  // finalize validation
  if(isReady){
    return true
  }
  else{return false}
}

function updateTable(trainName, destination, trainFrequency){
  console.log('in')
  // $('tbody').empty();
  tr = $('<tr></tr>');
  td_trainName = $('<td></td>');
  td_destination = $('<td></td>');
  td_trainFrequency = $('<td></td>');
  td_nextArrival = $('<td></td>');
  td_minutesAway = $('<td></td>');

  td_trainName.text(trainName);
  td_destination.text(destination);
  td_trainFrequency.text(trainFrequency);
  td_nextArrival.text('');
  td_minutesAway.text('');

  td_trainName.appendTo(tr);
  td_destination.appendTo(tr);
  td_trainFrequency.appendTo(tr);
  td_nextArrival.appendTo(tr);
  td_minutesAway.appendTo(tr);

  tr.appendTo($('tbody'));
}