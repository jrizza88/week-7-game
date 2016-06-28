$(document).ready(function(){


// Initialize Firebase
var config = {
    apiKey: "AIzaSyAX4IBdDfVTHSu8_k_2BpYc2-EUJK8-XQA",
    authDomain: "week-7-game.firebaseapp.com",
    databaseURL: "https://week-7-game.firebaseio.com",
    storageBucket: "week-7-game.appspot.com",
  };
  firebase.initializeApp(config);

// create variable to reference firebase
var db = firebase.database();



  var trainName = "";
  var destination = "";
  var trainTime = "";
  var frequency = "";
  var minutesAway = "";

 console.log(moment().format('hh:mm a'));

$("#addTrainBtn").on('click', function(){



  //user input is grabbed here
  trainName = $("#trainNameInput").val().trim(); 
  destination = $("#destinationInput").val().trim(); 
  trainTime = $("#trainTimeInput").val().trim(); 
  frequency = $("#frequencyInput").val().trim(); 

  // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime,"hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference of time: " + timeDiff);

    // Time remaining
    var timeRemaining = timeDiff % frequency; 
    console.log(timeRemaining);

    // Minute Until Train
    var minutesAway = frequency - timeRemaining;
    console.log("minutes until next arrival: " + minutesAway);

    // Next Train
    var nextTrain = moment().add(minutesAway, "minutes")
    console.log("Arrival time: " + moment(nextTrain).format("hh:mm"))

// temporary data to hold objects
db.ref().push({
  trainName: trainName,
  destination: destination,
  trainTime: trainTime,
  frequency: frequency,
  minutesAway: minutesAway,
  nextTrain: moment(nextTrain).format("hh:mm"),
  dateAdded: firebase.database.ServerValue.TIMESTAMP
});

// clear out typed in form values/strings
  $("#trainNameInput").val(''); 
  $("#destinationInput").val('');
  $("#trainTimeInput").val('');
  $("#frequencyInput").val('');

return false;

});




//Creates firebase to add passenger inputs to the database and rows in html where their inputs live
db.ref().on("child_added", function(childSnapshot){

// console logging to make sure values work in console
console.log(childSnapshot.val());
  console.log(childSnapshot.val().trainName);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().trainTime);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().minutesAway);
  //console.log(childSnapshot.val().currentTime);

// sets the values to not disappear when page gets refreshed
  var passengerInput = childSnapshot.val();
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var trainTime = childSnapshot.val().trainTime;
  var minutesAway = childSnapshot.val().minutesAway;

   $('#trainSchedule > tbody').append("<tr><td>" + 
    trainName + "</td><td>" + destination + "</td><td>" + 
    frequency + "</td><td>" + trainTime + "</td><td>" + minutesAway + "</td></tr>");


}), function (errorObject) {
  console.log("Errors handled: " + errorObject.code);

}
db.ref().orderByChild('dateAdded').limitToLast(1).on("child_added", function(snapshot) {
  $("#trainNameInput").val().trainName; 
  $("#destinationInput").val().destination; 
  $("#trainTimeInput").val().trainTime; 
  $("#frequencyInput").val().frequency; 
})

});


