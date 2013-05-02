if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to firebase-xhttp.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  //var require = .require;
  var Firebase = __meteor_bootstrap__require('firebase');

  function doIt(){
    Meteor.http.call("GET", "http://google.com", function(err, result){
      console.log( err, result.statusCode)
      //newRequestRef.update({result: result})
    })    
  }


  Meteor.startup(function () {
    doIt()
    var requestRef = new Firebase('https://xhttp.firebaseio.com/requests')
    requestRef.on('child_added', function(snapshot){
      var r = snapshot.val()

      console.log( snapshot.name() )
      if( !r.response ) requestRef.child( snapshot.name() ).remove()
      setTimeout(doIt, 1000)
      


    })
  })
}
