// Initialize Firebase
var config = {
  apiKey: "AIzaSyAzKfrg0zcsFVhiNaOCElZyH9EBVOgdW8Y",
  authDomain: "rpshomework-2ee53.firebaseapp.com",
  databaseURL: "https://rpshomework-2ee53.firebaseio.com",
  projectId: "rpshomework-2ee53",
  storageBucket: "rpshomework-2ee53.appspot.com",
  messagingSenderId: "284876442910"
};
firebase.initializeApp(config);

// Get a reference to the database service
// var playerOne = $('playerOne').val();

var databaseRef = firebase.database().ref();
var userName = '';
var userId = firebase.database().ref().child('users').push().key
var userNumericId = 0; // might need this.
// $(document).on("click", '.startGame', function (event) {
//   event.preventDefault();
//   userName = $('.form-control').val().trim();
//   console.log(name);
//   // call adduser funcation with param
//   saveUsers();
//   // startGame(name)
//   playerOne()
//   // playerTwo()
// });

// function to call firbase and add user json file to firbase db
function saveUsers() {
  
  var userData = {
    userId: userId,
    userName: userName,
    wins: 0,
    losses: 0
  }

  var updates = {}
  updates['users/' + userId] = userData

  // add new users
  databaseRef.update(updates)

  // call funcation and wait for second user
}

$(document).ready(function(event){
  // event.preventDefault();
  firebase.database().ref('/users/' +  userId).once('value').then(function(snapshot) {
    var dbUserName = (snapshot.val() && snapshot.val().userName);
      console.log("on ready, ", dbUserName)
    if(dbUserName){
      $('#playone').text("Player One " + dbUserName)
     $('.startGame').text("Waiting on player Two")
    } else{
      alert('add user name')
      $('.startGame').on('click', function(event){
        userName = $('.form-control').val().trim();
        event.preventDefault()
        saveUsers()
        playerOne();

      })

      
    }
    
    
 
   });
})




function playerOne(){
  var dbUserName = ''
  firebase.database().ref('/users/' +  userId).on('child_added',function(snapshot) {
   dbUserName = (snapshot.val() && snapshot.val().userName);
   $('#playone').text("Player One " + dbUserName)
   $('.startGame').text("Waiting on player Two")

  });
  console.log(dbUserName);

  
  

  // databaseRef.once("child_added", function(snap) {
  //   console.log(snap.val())
  //   dbUserName =  snap.val().userId
  // });
}

function playerTwo(){
  
}



// build html dynamicly. 
function startGame(name){
  playerOne(name);
  var scoreCount = $('<h4> Total Score</h4> <h3>wins</h3><h3>lost</h3>')
  $('.totalScore').append(scoreCount)


}

// game logic 
/**
 *    check for a tie first
 * 
 *   if user choose Rock
 *  Rock bets Scisors 
 *  if user1 choose rock and user2 choose scisors 
 *  user1 one wins 
 *  user1 wins count +1
 *  userTwo lost count +1  alos wins count -1 too 
 *  else userTwo choose paper
 *  userTwo wins count +1
 *  userOne lost count +1 or wins -1
 * 
 *  if user choose paper 
 *  if user1 choose paper and userTwo Scisors
 *  userTwo wins count ++ 
 *  userOne wins count --
 *  
 *  else   
 * 
 * 
 */

  function isAtie(user1, user2){
    if(user1 === user2){
      alert("we have a tie")
    }

    if(user1 === "rock"){
      if(user2 === "scisors"){
        alert("User one won!")
      } else{
        // user two choosen paper
        alert("user two won")
      }
    }


    if(user1 === "scisors"){
      if(user2 === "paper"){
        alert("User one won!")
      } else{
        // user two choosen rock
        alert("user two won")
      }
    }


    if(user1 === "paper"){
      if(user2 === "rock"){
        alert("User one won!")
      } else{
        // user two choosen rock
        alert("user two won")
      }
    }
  }





  // var database = firebase.database();
  //   // Initial Values
  //   var name = "";
  //   var email = "";
  //   var age = 0;
  //   var comment = "";
  //   // Capture Button Click
  //   $("#add-user").on("click", function(event) {
  //     event.preventDefault();

  //     // Grabbed values from text-boxes
  //     name = $("#name-input").val().trim();
  //     email = $("#email-input").val().trim();
  //     age = $("#age-input").val().trim();
  //     comment = $("#comment-input").val().trim();
  //     // Code for "Setting values in the database"
  //     database.ref().set({
  //       name: name,
  //       email: email,
  //       age: age,
  //       comment: comment
  //     });
  //   });
  //   console.log(database)
  //   // Firebase watcher + initial loader HINT: .on("value")
  //   database.ref().on("value", function(snapshot) {
  //     console.log(snapshot)
  //     // Log everything that's coming out of snapshot
  //     console.log(snapshot.val());
  //     console.log(snapshot.val().name);
  //     console.log(snapshot.val().email);
  //     console.log(snapshot.val().age);
  //     console.log(snapshot.val().comment);
  //     // Change the HTML to reflect
  //     $("#name-display").text(snapshot.val().name);
  //     $("#email-display").text(snapshot.val().email);
  //     $("#age-display").text(snapshot.val().age);
  //     $("#comment-display").text(snapshot.val().comment);
  //     // Handle the errors
  //   }, function(errorObject) {
  //     console.log("Errors handled: " + errorObject.code);
  //   });
