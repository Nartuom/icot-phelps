const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const enforce = require('express-sslify')
require('dotenv').config()

var Recaptcha = require('express-recaptcha').RecaptchaV3
var recaptcha = new Recaptcha('6Ld37vsUAAAAAFg4JSfU7ciYEDUA_pdu3K5IWiNh', process.env.SECRET_KEY, { callback: 'cb' })

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(enforce.HTTPS({ trustProtoHeader: true }))
//
// body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function (req, res, next) {
  res.render('index')
})
app.get('/home', function (req, res, next) {
  res.render('index')
})
app.get('/about', function (req, res) {
  res.render('about')
})
app.get('/faq', function (req, res) {
  res.render('faq')
})
app.get('/indoor', function (req, res) {
  res.render('indoor')
})
app.get('/outdoor', function (req, res) {
  res.render('outdoor')
})
app.get('/supervision', function (req, res) {
  res.render('supervision')
})
app.get('/hypnobirthing', function (req, res) {
  res.render('hypnobirthing')
})
app.get('/training', function (req, res) {
  res.render('training')
})
app.get('/contact', recaptcha.middleware.render, function (req, res) {
  res.render('contact', { captcha: res.recaptcha })
})
app.get('/testimony', function (req, res) {
  res.render('testimony')
})
app.get('/confirmation', function (req, res) {
  res.render('confirmation')
})
app.get('/error', function (req, res) {
  res.render('error')
})

// POST route form contact form
app.post('/contact', recaptcha.middleware.verify, function (req, res, next) {
  if (!req.recaptcha.error) {
    // Nodemailer route fror emails
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
      })
    )
    const email = `${req.body.user_email}`
    const name = `${req.body.user_name}`
    const message =
              `<div><h3>New message from:</h3>${email}</div> 
              <div><h4>Name:</h4> ${name} </div>
              <div><h5>Message:</h5> ${req.body.user_message}</div>`
    // success code
    // eslint-disable-next-line no-inner-declarations
    async function main () {
      // send mail with defined transport object
      transporter.sendMail({
        from: email, // sender address
        to: 'melphelps@live.co.uk', // list of receivers
        subject: 'Client Enquiry', // Subject line
        html: message
      }, function (err) {
        if (err) {
          console.log(err)
          res.render('error')
        } else {
          console.log('Message sent successfully:')
          res.render('confirmation')
        }
      })
    }
    main().catch(console.error)
  } else {
    // error code
    res.render('error')
  }
})

app.get('*', function (req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      const err = new Error(`Someone tried to reach ${req.originalUrl}`)
      res.status(404).render('error')
      next(err)
    }
    res.render('index')
  })
})

if (process.env.USERDOMAIN === 'MARVIN') {
  https.createServer({
    key: fs.readFileSync('../private-key.key'),
    cert: fs.readFileSync('../rootSSL.pem')
  }, app)
    .listen(3000, function () {
      console.log('Example app listening on port 3000! Go to https://localhost:3000/')
    })
} else {
  app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log('Server Live at ' + process.env.IP)
  })
}
