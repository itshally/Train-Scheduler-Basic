//Web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCi10rJRJ7ybW0vjNV0Rj2_JLtlsCt_qK8",
    authDomain: "train-scheduler-c5d44.firebaseapp.com",
    databaseURL: "https://train-scheduler-c5d44.firebaseio.com",
    projectId: "train-scheduler-c5d44",
    storageBucket: "https://train-scheduler-c5d44.firebaseio.com",
    messagingSenderId: "175410410431",
    appId: "1:175410410431:web:e7d040bb85418bcd"
};

// Initialize Firebase MUST be always below the Firebas's configuration
firebase.initializeApp(firebaseConfig);

//declaring variables
  var database = firebase.database(),
  trainName ="",
  destination = "",
  frequency = 0,
  nextArrival = 0,
  minutessAaway = 0,

  //array for the data objects
  trainData = [];


//Add Button 
$("#add-btn").on("click", function(event) {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#train-time").val().trim();
    frequency = $("#frequency").val().trim();
    
    database.ref().push({
      TRAIN_NAME : trainName, 
      DESTINATION : destination, 
      TRAIN_TIME : trainTime,
      FREQUENCY : frequency
    });

    Clear();
});

//  Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("child_added", function(snapshot) {


    console.log(snapshot.val());
    console.log(snapshot.val().length)
    
    var rowData = $('<tr>').append(
      $('<td>').text(snapshot.val().TRAIN_NAME),
      $('<td>').text(snapshot.val().DESTINATION),
      $('<td>').text(snapshot.val().FREQUENCY)
    );
     
    
    $('tbody').append(rowData);
      
    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


function Clear(){
  $("#train-name").val('');
  $("#destination").val('');
  $("#train-time").val('');
  $("#frequency").val('');
}
