const express=require("express");
const https=require("https");
const request=require("request");
const bodyparser=require("body-parser");


const client = require("@mailchimp/mailchimp_marketing");


const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));


app.get("/", function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res)
{
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const password=req.body.password;
    const data={
        members: [
            {
            email_address : email,
            status : "subscribed",
           merge_fields: {
            FNAME:fname,
            LNAME:lname,
           }
        }
        ]
    };
    const jsondata=JSON.stringify(data);

client.setConfig({
  apiKey: "eaa028e5856fee2431f57383b8ff251b",
  server: "us13",
});

const run = async () => {
  try {
    const response = await client.lists.batchListMembers("657bcad3804", jsondata);
    if(response.error_count===0)
  {
    // res.write("Success");
    res.sendFile(__dirname+"/success.html");
  }
  else{
    // res.write("404 not found");
    res.sendFile(__dirname+"/failure.html");
  }
  } catch (error) {
    console.log(error);
    // res.write("404 not found");
    res.sendFile(__dirname+"/failure.html");
  }
//   res.end();
};
run();


// const url = "https://us13.api.mailchimp.com/3.0/lists/57bcad3804";
 
//     const options = {
//         method: "POST",
//         auth:  "ushasrisai300@gmail.com:eaa028e5856fee2431f57383b8ff251b-us13"
//     };
 
//     const request = https.request(url, options, function(response){
 
//         if (response.statusCode === 200) {
//             res.sendFile(__dirname+"/success.html")
//             // res.send("Hurray!");
//         } else {
//             res.sendFile(__dirname +"/failure.html");
//             // res.send("Try again");
//         }
 
//         response.on("data", function(data){
//             console.log(JSON.parse(data));
//         });
//     });
 
//     request.write(jsondata);
//     request.end();
// res.write("<h1>You have been signed up successfully!</h1>");

});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function()
{
    console.log("Server has been started");
});



// api key: eaa028e5856fee2431f57383b8ff251b-us13

// list id: 57bcad3804