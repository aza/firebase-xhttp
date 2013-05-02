var Firebase = require('firebase'),
  request = require('request')

var app = require('express').createServer();
app.get('/', function(req, res) {
  console.log( req.query )
    res.send('Testing, yo!');
});


var requestRef = new Firebase('https://xhttp2.firebaseio.com/requests')

requestRef.on('child_added', function(snapshot){
  var r = snapshot.val()
  var rRef = requestRef.child( snapshot.name() )
  //console.log( snapshot.name() )

  if( r.response ){ 
    requestRef.child( snapshot.name() ).remove()
    return
  }

  if( !r.url && !r.options ){
    rRef.update({response:{error: "No url or options", statusCode:404}})
    return
  }

  if( r.url ) {
    request(r.url, function(error, res, body){
      rRef.update({response:{body:body, statusCode: res.statusCode}})
    })
  }

  else if( r.options ){
    request(r.options, function(error, res, body){
      rRef.update({response:{body:body, statusCode: res.statusCode}})
    })
  }
  
})


app.listen(process.env.VCAP_APP_PORT || 3000);
