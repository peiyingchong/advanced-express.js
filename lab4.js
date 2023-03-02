let express = require('express');
let path = require('path');
let app = express();
let db =[];

//tells express to work on url encoded
app.use(express.urlencoded({extended: true}));
// parse application/json
app.use(express.json())


app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

app.listen(8080);

app.use(express.static('images'));
app.use(express.static('css'));


app.get('/',function(req,res){
     res.sendFile(path.join(__dirname,'views/index.html'));
});

app.get('/addparcel',function(req,res){
     res.sendFile(path.join(__dirname,"views/addParcel.html"));
});

app.post('/newparcel',function(req,res){

     let sender = req.body.sender;
     let address = req.body.add;
     let weight = req.body.weight;
     let fragile = req.body.fragile;
     let shipType = req.body.shipType;
     let description = req.body.description;
     let cost = req.body.cost;

     if (sender.length <3 || address.length <3 || weight <0||cost<0){
          res.sendFile(path.join(__dirname,"views/error.html"))
     }
     else{
          let obj = {
               description:description,
               shipmentType: shipType,
               cost :cost,
               sender:sender,
               address:address,
               weight:weight,
               fragile:fragile


          }
          db.push(obj);
          res.sendFile(path.join(__dirname,"views/parceladded.html"))
     }
});

app.get('/listparcel',function(req,res){

     res.render('list.html',{parcelDb:db});

})
app.get('/*',function(req,res){
     res.sendFile(path.join(__dirname,"views/404.html"))
})