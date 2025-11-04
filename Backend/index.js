const express = require("express");
const app = express()
const port = 3000;

app.use(express.json())



app.get("/", function(req,res){
    res.json({
        message : "The backend is up"
    })
});

app.listen(port, function(){
    console.log("The server is running at port :", port)
})
