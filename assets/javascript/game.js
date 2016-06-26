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

//function clearform() {
 // }
// var randomDate = 
 var currentTime = moment().format();
  var trainName = "";
  var destination = "";
  var trainTime = moment().format('hh:mm');
  var frequency = "";
  var minutesAway = moment(currentTime).diff( moment(), "mm");

$("#addTrainBtn").on('click', function(){


  //user input is grabbed here
  trainName = $("#trainNameInput").val().trim(); 
  destination = $("#destinationInput").val().trim(); 
  trainTime = $("#trainTimeInput").val().trim(); 
  frequency = $("#frequencyInput").val().trim(); 

// temporary data to hold objects
var newPassenger = {
  trainName: trainName,
  destination: destination,
  trainTime: trainTime,
  frequency: frequency,
  minutesAway: minutesAway,
  //dateAdded: Firebase.ServerValue.TIMESTAMP
}
//database.ref().set(newPassenger);
//moment().endOf('day').fromNow();

// upload passenger input data to firebase

db.ref().push(newPassenger);

 $("#trainNameInput").val(''); 
  $("#destinationInput").val('');
  $("#trainTimeInput").val('');
  $("#frequencyInput").val('');

  //db.ref().set(newPassenger);
// console logging purposes

console.log(newPassenger.trainName)
console.log(newPassenger.destination)
console.log(newPassenger.trainTime)
console.log(newPassenger.frequency)

// clear out typed in form values/strings


return false;
});




//Creates firebase to add passenger inputs to the database and rows in html where their inputs live
db.ref().on("child_added", function(childSnapshot){

console.log(childSnapshot.val());
  console.log(childSnapshot.val().trainName);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().trainTime);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().minutesAway);

  var passengerInput = childSnapshot.val();
  //var timestamp = childSnapshot.val().dateAdded;

   $('#trainSchedule > tbody').append("<tr><td>" + 
    trainName + "</td><td>" + destination + "</td><td>" + 
    trainTime + "</td><td>" + frequency + "</td><td>" + minutesAway + "</td></tr>");


  console.log(childSnapshot.val());
  console.log(trainName);
  console.log(childSnapshot.val().destination);
  console.log(trainTime);
  console.log(childSnapshot.val().frequency);



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


