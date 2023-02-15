const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require('dotenv').config();

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extented:true}));

mongoose.connect("mongodb+srv://admin-abdurrahman:abdurrahman@cluster0.s8jenvi.mongodb.net/anissirDB", { useNewUrlParser: true });

const studentdataSchema = new mongoose.Schema ({
  fname: String,
  lname: String,
  email: String
})

const Studentdata = mongoose.model("Studentdata", studentdataSchema);

const studentdata = new Studentdata ({
  fname: "Abdurrahman",
  lname: "Idris",
  email: "abdurrahmanidris28@gmail.com"
})

// studentdata.save()

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var my_email = req.body.email;

  Studentdata.find({email:my_email}, function(err, foundEmail){
    if (err) {
      console.log(err);
    } else {
      if (foundEmail[0]){
        res.sendFile(__dirname + "/failure.html")
      } else {

        const studentdata = new Studentdata({
          fname: firstName,
          lname: lastName,
          email: my_email
        })
        // studentdata.save()
        res.sendFile(__dirname + "/success.html")
      }
    }
  })




})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server running at port 3000")
})
