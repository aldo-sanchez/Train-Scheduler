// Initialize Firebase
var config = {
  apiKey: "AIzaSyCHX9IXmH8cEPlE3VJAULeEprfYZFqn9mc",
  authDomain: "train-scheduler-1757c.firebaseapp.com",
  databaseURL: "https://train-scheduler-1757c.firebaseio.com",
  storageBucket: "train-scheduler-1757c.appspot.com",
  messagingSenderId: "288530015477"
};
firebase.initializeApp(config);

function writeNewPost(trainName, destination, firstTrainTime, trainFrequency) {
  // Post entry.
  var postData = {
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    trainFrequency: trainFrequency
  };

  // Get a key.
  var newPostKey = firebase.database().ref().push().key;

  // Write the new data under key
  var updates = {};
  updates[newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

var database = firebase.database().ref();
database.on('value', function(snapshot) {
  // var tableArray = [];
  var count = 0;//counter to be used for html ids
  snapshot.forEach(function(childSnapshot){
    
    var key = childSnapshot.key;

    // get values for nodes under key
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var trainFrequency = childSnapshot.val().trainFrequency;

    //populate tableArray
    tableArray[count] = [trainName,destination,firstTrainTime,trainFrequency]

    // getNextTrain(count);
    
    count++;    
  })
  getNextTrain();
});