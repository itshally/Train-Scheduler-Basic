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
  minutessAaway = 0;


//a click event for the add button
$("#add-btn").on("click", function(event) {
    event.preventDefault();

    //getting the input value with the global variables
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    trainTime = moment($("#train-time").val()).format('h:mm');
    frequency = $("#frequency").val().trim();

    //pushing the values to the database
    database.ref().push({
      TRAIN_NAME : trainName, 
      DESTINATION : destination, 
      TRAIN_TIME : trainTime,
      FREQUENCY : frequency
    });

    //a function to clear the input fields once the user submitted the info
    Clear();

    //fading in the train schedules while the "add form" hides after the submission
    $('.train-schedules-container').fadeIn();
    $('.add-schedule-container').hide();
    $('#add-icon').show();
});

//getting all the data from the database to display on the page
database.ref().on("child_added", function(snapshot) {

  //Calculations to get the next arrival and the minutes left
  //convert the first train time with the help of the moment.js
  var first_train_converter = moment(snapshot.val().TRAIN_TIME, 'h:mm A');

  //getting the time difference between the current time and the first train time in minutes
  var time_difference = moment().diff(moment(first_train_converter), 'minutes');

  //getting the time apart with the frequency
  var time_appart = time_difference % snapshot.val().FREQUENCY;

  //getting the minutes left
  var minutes_left = snapshot.val().FREQUENCY - time_appart;
  
  //calculating the next train
  var next_train = moment().add(minutes_left, 'minutes').format('h:mm A');
  
  //appending the data in a row
  var rowData = $('<div class="container train-row">').append(
    $('<div class="container">').html(
      "<p id='train-names'><i class=\"fas fa-train\"></i>&nbsp;" + snapshot.val().TRAIN_NAME //train name
      + "&nbsp;&nbsp;<i class=\"fas fa-long-arrow-alt-right\"></i>&nbsp;&nbsp;" 
      + "<i class=\"fas fa-train\"></i>&nbsp;" + snapshot.val().DESTINATION + //destination
      "</p><p class='train-info'><label class='train-row-labels'>Frequency: </label>&nbsp;" + snapshot.val().FREQUENCY + //frequency
      " mins</p><p class='train-info'><label class='train-row-labels'>Next Arrival: </label>&nbsp;" + next_train + //next train
      "</p><p class='train-info'><label class='train-row-labels'>Minutes Away: </label>&nbsp;" + minutes_left + "</p>" //minutes left
    )
    
  );

  //appending each row in the container 
  $('.train-rows-container').append(rowData);
            
// Handle the errors
}, function(errorObject) {
console.log("Errors handled: " + errorObject.code);
});

//a clear function to clear all the input fields after the submission
function Clear(){
  $("#train-name").val('');
  $("#destination").val('');
  $("#train-time").val('');
  $("#frequency").val('');
}

//jQuery Effects 
$('.add-schedule-container').hide();

$('#add-icon').on('click', function(){
  $('.train-schedules-container').hide();
  $('.add-schedule-container').fadeIn();
  $('#add-icon').hide();
})

$('#cancel-btn').on('click', function(){
  $('.train-schedules-container').fadeIn();
  $('.add-schedule-container').hide();
  $('#add-icon').fadeIn();
})
