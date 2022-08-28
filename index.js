const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const jsonParser = bodyParser.json();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, It's a web server just for logging in production. Use POST verb to log what you send in the body!");
});

app.post("/", jsonParser, (req, res) => {
    const now = new Date();
    console.log(`At ${now.toLocaleDateString()} ${now.toLocaleTimeString()}, \nbody`, req.body);
    res.send("Logged successfully");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

function clientLog(body) {
    const IP = "192.168.1.3";
    const SERVER_PORT = 3000;
  
    var replacer = function(k, v) { 
      if (v === undefined) { 
        return null; 
      } 
      
      if (typeof v === "function") {
        return "function";
      }
  
      return v; 
    };
  
    fetch(`http://${IP}:${SERVER_PORT}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(typeof body === "string"? {message: body}: body, replacer)
    }).then(
        res => res.json()
    ).then(
        res => {
            console.log('clientLog res', res);
        }
    ).catch(
        err => {
            console.log('clientLog err', err);
        }
    );
  }