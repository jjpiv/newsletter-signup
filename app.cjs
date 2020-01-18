import express from "express";
import bodyParser from "body-parser";
import request from "request";
import path from "path";

const __dirname = path.resolve();
const app = express();

app.listen(3000, function() {
  console.log("Server is running on port 3000");
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

  let data = {
    members : [{
      email_address: email,
      status: "subscribed"
    }]
  };

  data = JSON.stringify(data);

  let options = {
    url: "https://us3.api.mailchimp.com/3.0/lists/3a84854c86",
    method: "POST",
    headers: {
      "Authorization": "anystring 3db9a17a6eabcd8b6f26399df32cec61-us3"
    },
    body: data
    // auth: {
    //   'user': 'anystring',
    //   'pass': '3db9a17a6eabcd8b6f26399df32cec61-us3'
    // }
  };

  request(options, function(error, response, body) {
    if(error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }
  })
})
