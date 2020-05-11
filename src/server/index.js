const dotenv = require('dotenv');
dotenv.config();
var bodyParser = require('body-parser')
var path = require('path')
const express = require('express')
var cors = require('cors')
var AYLIENTextAPI = require('aylien_textapi');


var textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });

const app = express()
app.use(cors())
app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

app.post('/test', function (req, res) {
    validCall = true
    let formData = req.body.formText
    if(formData === ''){
      validCall = false
      throw new Error('EMPTY STRING')
    }
    console.log("If this is valid url : ",validateUrl(formData));
    if(validCall){
      textapi.sentiment({ 
        'text': req.body.text,
         mode: 'tweet'
      }, 
      function(error, response) {
        if(error) {
          throw new Error('SOMEHING WENT WRONG')
        }
        else{
          console.log(response);
          res.send(response);
        }    
      });
    }
});
