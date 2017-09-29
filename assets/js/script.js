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

  console.log(database);

  $("#add-train-btn").on('click', (event) => {
    event.preventDefault();
    
    let name = $("#train-name").val().trim();
    let destination = $("#train-destination").val().trim();
    let initialTime = $("#initial-time").val().trim();
    let frequency = $("#train-frequency").val().trim();
    
    let newTrain =  {
        name: name,
        destination: destination,
        initialTime: initialTime,
        frequency: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    // return false;
  });