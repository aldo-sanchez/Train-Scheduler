// Initialize Firebase
var config = {
  apiKey: "AIzaSyCHX9IXmH8cEPlE3VJAULeEprfYZFqn9mc",
  authDomain: "train-scheduler-1757c.firebaseapp.com",
  databaseURL: "https://train-scheduler-1757c.firebaseio.com",
  storageBucket: "train-scheduler-1757c.appspot.com",
  messagingSenderId: "288530015477"
};
firebase.initializeApp(config);

// writeNewPost(123,'usertest1','pic1','title1','body1')

function writeNewPost(uid, username, picture, title, body) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}
