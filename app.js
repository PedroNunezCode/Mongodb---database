var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
mongoose.Promise = 
global.Promise;mongoose.connect("mongodb://localhost:27017/node-demo");
var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

/*Once the schema is made, A model from it needs to be created.*/
var user = mongoose.model("User", nameSchema);

/*This following code is what makes the mechanism that allows
data to be added into the database. (REST API).
*/
app.post("/addname", (req, res)=> {
    // The data from the form should be convered into json and then stored.
    var myData = new user(req.body);
    myData.save()
    .then(item => {
        res.send("Item was saved to the database!");
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
    console.log(myData);
});


app.get("/", (req, res) => {
 res.sendFile(__dirname + "/index.html");
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});