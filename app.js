const   nodemailer  = require("nodemailer"),
        nodemailerSendgrid = require("nodemailer-sendgrid"),
        bodyParser  = require("body-parser"),
        express     = require("express"),
        ejs         = require("ejs"),
        app         = express();
        require('dotenv').config();

app.set("view engine", "ejs");
app.use(express.static("public"));

//body Parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res, next){
    res.render("index");
});
app.get("/home", function(req, res, next){
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
    res.redirect("/home");
});

//POST route form contact form
app.post("/", function(req, res, next){
    async function main() {

        const email = `${req.body.user_email}`;
        const name  = `${req.body.user_name}`;
        const message = 
            `<div><h3>New message from:</h3>${email}</div> 
            <div><h4>Name:</h4> ${name} </div>
            <div><h5>Message:</h5> ${req.body.user_message}</div>`      
            ;
        
        //Nodemailer route fror emails
        const transporter = nodemailer.createTransport(
            nodemailerSendgrid({
                apiKey: process.env.SENDGRID_API_KEY,
            })
        );

        // send mail with defined transport object
        transporter.sendMail({
            from: email, // sender address
            to: "thomas.burton.lawl@gmail.com", // list of receivers
            subject: "Client Enquiry", // Subject line
            html: message,
            }, function(error, info){
            if(error) {
                console.log(error);
            } else {
                console.log("Message sent successfully:");
                }
            });
        }   
        main().catch(console.error);
        next(res.render("index")); 
});


var url = process.env.DATABASEURL;
app.listen(process.env.PORT||3000, process.env.IP, function(){
	console.log("Server Live at " + url);
});