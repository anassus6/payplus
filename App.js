//Control your Website or web app

const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));


//////////////////////////////// set up lmodel dyal input dyal sending money (transactions)///////////////////
//////////////////////////////// set up lmodel dyal input dyal sending money ///////////////////
//////////////////////////////// set up lmodel dyal input dyal sending money ///////////////////

////jiblina mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
 
// define the Schema (the structure of the sending money input + Account structure +Transactions structure)

const Accountschema = new Schema({
  username: String,
  balance: Number ,
  password: String,

});


const Transactionsschema = new Schema({
  sender: String,
  receiver: String ,
  amount: Number,
  reason: String,
  date: String,


});



 
 
// (declare the name of the collection ) Create a variable Schematiziblmoney that shematize any inputs into the defined sendmoneyschema schema above.
const AccountsCollection = mongoose.model("AccountsCollection", Accountschema);
const TransactionsCollection = mongoose.model("TransactionsCollection", Transactionsschema);







/////////////////////////////////Setup Database Link dyal Mongoose to tell Which Database we want to store data inside!////////////
/////////////////////////////////Setup Database Link dyal Mongoose to tell Which Database we want to store data inside!////////////
/////////////////////////////////Setup Database Link dyal Mongoose to tell Which Database we want to store data inside!////////////

 
mongoose.connect("mongodb+srv://Anassus:mongodbpass@cluster0.gbcb9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then( result => {
    app.listen(port, () => {console.log('Yes, the Database is connected Successfully');   }); 
  })
  .catch( err => {
    console.log(err);
  }); 




















  app.get('/account/:username', async(req, res) => {


    var result = await AccountsCollection.find({username:req.params.username});
    var result2 = await TransactionsCollection.find();

res.render('Account' , { Account:result[0] , balance:result[0].balance , owner:result[0].username , Transactionsarray:result2 } );



 
    })
    ;
























//useful variables here



    var Nowtime =  new Date().toString().slice(4,21);












    // Mni ghan postiw (awla nsubmitiw lform, ha ach hayw9e3, req.body huwa content dyal gae inputs li submitina fl form fl Html page)
app.post('/account/:username', async(req, res) => {

  console.log("Hahya Post Object dyalna");


// Create a model based on the schema We defined before!!!
//its like saying: khud had inputs li submitina f html file w dirlihum structure dyal scheme li3labalk

const Newtransaction = new TransactionsCollection(req.body);

//logi lina l object whuwa MCHEMATIZI mnbe3d ma t slici lih la date
      Newtransaction.date= Nowtime;  Newtransaction.sender=req.params.username  ;

     console.log(Newtransaction);
     //logi lina l object f termianl walakin mamchematizich, ghir object wsf
     console.log(req.body);


// Save hada l object mn be3d ma gadinalih structure dyal ArticheSchem f Database t mongo).
     Newtransaction.save();

//Get owner account
var result3 = await AccountsCollection.find({username:req.params.username});
//Get receiver account's objects
var result4 = await AccountsCollection.find({username:Newtransaction.receiver});    


//update sender balance --
await AccountsCollection.findByIdAndUpdate( result3[0].id , {balance: result3[0].balance - Newtransaction.amount} , {new:true} );
//update Receiver balance ++
await AccountsCollection.findByIdAndUpdate( result4[0].id , {balance: result4[0].balance + Newtransaction.amount} , {new:true} );
//Refresh after successfull transaction
res.redirect(req.get('referer'));




}); 





app.get('/login', async(req, res) => {

  res.render('login' ,{ error:"" }  );
  
    })
    ;








app.get('/register', async(req, res) => {

res.render('register');

  })
  ;













      // Mni ghan postiw (awla nsubmitiw lform, ha ach hayw9e3, req.body huwa content dyal gae inputs li submitina fl form fl Html page)
app.post('/register', async(req, res) => {

 

const Newaccount = new AccountsCollection(req.body);

//logi lina l object whuwa MCHEMATIZI mnbe3d ma t slici lih la date
Newaccount.balance=1000;
    



// Save hada l object mn be3d ma gadinalih structure dyal ArticheSchem f Database t mongo).
    Newaccount.save();


    res.redirect("/account/"+Newaccount.username);





}); 









      // Mni ghan postiw (awla nsubmitiw lform, ha ach hayw9e3, req.body huwa content dyal gae inputs li submitina fl form fl Html page)
      app.post('/login', async(req, res) => {

        const login = new AccountsCollection(req.body);
        var result5 = await AccountsCollection.find({ username:login.username });
        console.log(login.username)

if ( result5.length>0) {

  if (login.password=result5.password)     {  res.redirect("/account/"+login.username);   }

  else {res.render("login" , { error:"Your password is wrong" }  )}


}

        
      

else {
        
  res.render("login" , { error:"Account not existant" }  )
            
        
          }
        
        
        
        }); 






     
        
        app.get('/transaction/:transid', async(req, res) => {

          var result8 = await TransactionsCollection.find({_id:req.params.transid});
console.log(result8);
          res.render('transaction' , {sender:  result8[0].sender ,  receiver:  result8[0].receiver , amount: result8[0].amount, reason:result8[0].reason , when:result8[0].date  }  );
          
            })
            ;        