const   nodemailer  = require("nodemailer"),
        bodyParser  = require("body-parser"),
        express     = require("express"),
        ejs         = require("ejs"),
        app         = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));

//body Parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//middleware

const handleRedirect = function(req, res){
    console.log("Post successful");
    res.redirect("index");
}

app.get("/", function(req, res, next){
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

app.post("/", function(req, res, next){
    async function main() {

    const email = `${req.body.user_email}`;
    const name  = `${req.body.user_name}`;
    const message = `${req.body.user_message}`;
    //Nodemailer route fror emails
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.AD_EMAIL, // generated ethereal user
        pass: process.env.AD_PASSWORD // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // send mail with defined transport object
    transporter.sendMail({
        from: email, // sender address
        to: process.env.AD_EMAIL, // list of receivers
        subject: "Client Enquiry", // Subject line
        text: "New Message from " + name +
        "Email: " + email +
        "Message: " + message
        }, function(error, info){
        if(error) {
            console.log(error);
        } else {
            console.log("Message sent successfully: %s", info.messageId);
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