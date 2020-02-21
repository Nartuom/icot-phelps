var express = require("express"),
    ejs     = require("ejs"),
    app     = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("index");
});

app.get("/about", function(req, res){
    res.render("about");
});

app.get("/faq", function(req, res){
    res.render("faq");
});

app.get("/indoor", function(req, res){
    res.render("indoor")
});

app.get("/outdoor", function(req, res){
    res.render("outdoor")
});

app.get("/supervision", function(req, res){
    res.render("supervision");
});

app.get("/creative", function(req, res){
    res.render("creative");
});

app.get("/training", function(req, res){
    res.render("training");
});

app.get("/contact", function(req, res){
    res.render("contact");
});
app.get("*", function(req, res, next){
    let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`);
    err.statusCode = 404;
    next(err);
    res.redirect("/");
});

var url = process.env.DATABASEURL;
app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("Server Live at " + url);
});