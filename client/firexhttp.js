(function(){

  function get(url, callback){
    if( !callback ) return
    var requestRef = new Firebase('https://xhttp2.firebaseio.com/requests');
    
    requestRef = requestRef.push()
    requestRef.set({url: url}, function(){
      requestRef.on('child_added', function(childSnapshot){
        if( childSnapshot.name() == "response" ){
          callback( childSnapshot.val() )
          requestRef.remove()
        }
      })
    })
  }

  function request(options, callback){
    if( !callback ) return
    var requestRef = new Firebase('https://xhttp2.firebaseio.com/requests');
    
    requestRef = requestRef.push()
    requestRef.set({options: options}, function(){
      requestRef.on('child_added', function(childSnapshot){
        if( childSnapshot.name() == "response" ){
          callback( childSnapshot.val() )
          requestRef.remove()
        }
      })
    })
  }

  window.Firexhttp = {get:get, request:request}
})()