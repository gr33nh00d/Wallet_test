Watched = new Meteor.Collection('watched');



function parseThatData(address){
  var url = "https://blockchain.info/address/" + address + "?format=json";

  //method 1 
  //will return a error nerd [object Object] which I think is null

  // var result = $.getJSON(url, function(data) {
  //   alert("success");
  // })
  //   .done(function() {
  //     alert("second success");
  //   })
  //   .fail(function(data) {
  //     alert("error nerd " + data);
  //   })
  //   .always(function() {
  //     alert("finished");
  //   }, "json");
  
  //method 2
  //returns SMLHttpRequest cannot load

  // HTTP.get(url, function(err,result) {
  //   console.log(result.data);
  // });


  //method 3
  //returns same error as method 2

  // var xhr = new XMLHttpRequest();
  // xhr.open('GET', url);
  // xhr.onreadystatechange = function () {
  //   if (this.status == 200 && this.readyState == 4) {
  //     console.log('response: ' + this.responseText);
  //   }
  // };
  // xhr.send();

  return url;

}
if (Meteor.isClient) {
  

  Template.wallet.watched  = function(){
     return Watched.find();
   }

  Template.addWallet.events = {
    'click input.add': function() {
      var address_new = $('#address_new').val();
      var address_newer = parseThatData(address_new);
      var jsonObject = address_newer;
      $.getJSON(jsonObject, function(json){
        console.log("JSON Data: " + json.users)
      });
      Watched.insert({address: address_newer});
      Meteor.call('remoteGet',url,{//...options...
      },function(error,response){
        //if an error happened, error argument contains the details
        //if the request succeeded, the response will contain the response of the server request
        alert("Fail");
      })
    }
  };
}

if (Meteor.isServer) {
 // Meteor.startup(function () {
 //    console.log(JSON.parse(Assets.getText('datJson.json')));
 //  });
  
  Meteor.methods({
  'remoteGet' : function(url,options){
    return HTTP.get(url,options);
  }
  });

}