const express= require("express");
const bodyParser= require("body-parser");//to parse the reqested info
const request= require("request");// usedt o make the request to the foriegn API

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html" );
});
app.post("/", function(req, res){

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount= req.body.amount;
//  console.log(crypto, fiat, amount);
 var baseUrl ="https://apiv2.bitcoinaverage.com/convert/global";// right after this is the query for information or the '?' in the documentation


var options={
  url: baseUrl,
  method :"GET",
  qs:{
    from:crypto,// from is the API value and crypto is the value from the HTML form
    to:fiat,
    amount: amount,
  }
}
//console.log(options);

  request(options, function (error, response, body) {//this is the magic of the request package
    //console.log(body);
    var data = JSON.parse(body); // to parse the body of the date that was requested from the forgin site
    var price = data.price;
    //console.log(price);
    var currentDate = data.time;
    res.write("<p> The time accessed was "+ currentDate + "<p>");
    res.write("<h1> the Price of " + amount + " " + crypto + " is currently worth " + price + " in "+fiat + ".<h1>");
    res.send();
  });

});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
