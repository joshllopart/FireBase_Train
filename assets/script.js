

 
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBr59Qd0sQQeMsRLMe09EmqdHgDYCFPDBs",
    authDomain: "train-c3bf7.firebaseapp.com",
    databaseURL: "https://train-c3bf7.firebaseio.com",
    projectId: "train-c3bf7",
    storageBucket: "train-c3bf7.appspot.com",
    messagingSenderId: "927049443451"
  };
  

  
  firebase.initializeApp(config);
  
  var database = firebase.database();

$("#submit-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#formGroupExampleInput").val().trim();
  var traDest = $("#formGroupExampleInput2").val().trim();
  var traTime = moment($("#formGroupExampleInput3").val().trim(), "MM/DD/YYYY").format("X");
  var traNext = $("#formGroupExampleInput4").val().trim();

  // Creates local "temporary" object for holding employee data
  var trainInfo = {
    train: trainName,
    dest: traDest,
    fre: traTime,
    next: traNext
  };

  // Uploads TRAIN data to the database
  database.ref().push(trainInfo);

  // Logs everything to console
  console.log(trainInfo.train);
  console.log(trainInfo.dest);
  console.log(trainInfo.fre);
  console.log(trainInfo.next);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#formGroupExampleInput").val("");
  $("#formGroupExampleInput2").val("");
  $("#formGroupExampleInput3").val("");
  $("#formGroupExampleInput4").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var traDest = childSnapshot.val().dest;
  var traTime = childSnapshot.val().fre;
  var traNext = childSnapshot.val().next;

  // Employee Info
  console.log(trainName);
  console.log(traDest);
  console.log(traTime);
  console.log(traNext);

  // Prettify the employee start
  var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment(empStart, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * empRate;
  console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empRole),
    $("<td>").text(empStartPretty),
    $("<td>").text(empMonths),
    $("<td>").text(empRate),
    $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});