var express = require("express"),
    app     = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("index");
});

var url = process.env.DATABASEURL;
app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("Server Live at " + url);
});