  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAW0HeKoWv6GOoLdN1cLefoazTY7nTyOCE",
    authDomain: "zepher-express.firebaseapp.com",
    databaseURL: "https://zepher-express.firebaseio.com",
    projectId: "zepher-express",
    storageBucket: "zepher-express.appspot.com",
    messagingSenderId: "1044678323580"
  };
  firebase.initializeApp(config);

  let database = firebase.database();

  // console.log(database);

  $("#add-train-btn").on('click', (event) => {
    event.preventDefault();

    let name = $("#train-name").val().trim();
    let destination = $("#train-destination").val().trim();
    let initialTime = moment($("#initial-time").val().trim(), "HH:mm").unix();
    let frequency = parseInt($("#train-frequency").val().trim());

    let newTrain = {
      name: name,
      destination: destination,
      initialTime: initialTime,
      frequency: frequency
    };

    database.ref().push(newTrain);

    $("#train-name").val('');
    $("#train-destination").val('');
    $("#initial-time").val('');
    $("#train-frequency").val('');

    // console.log(initialTime);
    // return false;
  });

  // listener for adding trains to database and to the table
  database.ref().on("child_added", (childSnapshot, prevChildkey) => {
    let name = childSnapshot.val().name;
    let destination = childSnapshot.val().destination;
    let initialTime = moment.unix(childSnapshot.val().initialTime);
    let frequency = childSnapshot.val().frequency;
    let minutesElapsed = moment().diff(initialTime, 'minutes');


    //convert intialtime to unix

    let minutesAway = frequency - minutesElapsed % frequency;

    let nextArrival = moment().add(minutesAway, "m").format("HH:mm");
    console.log(initialTime);

    $("#train-table > tbody").append(`<tr><td> ${name} </td><td> ${destination} </td><td> ${frequency} </td><td> ${nextArrival} </td><td> ${minutesAway} `)

  });