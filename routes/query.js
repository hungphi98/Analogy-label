var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var app = express();
var username = "",
    corpus = "",
    num_id = 0,
    result = {};
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
UserInfo = require('../public/User');
Sentence = require('../public/Sentence');
router.get("/", (req,res) => {
    if (req.isAuthenticated()){
        username = req.user.username;
        res.render("query",{
            user: username
        });
    }else{
        res.redirect("/home");
    }

});
router.post("/user", (req,res)=>{
    var userQuery = UserInfo.find({"username": req.body.users});
    userQuery.exec(function(err,data){
        if (err) console.log(err);
        else{
            res.render("user",{
                user: username,
                username: req.body.users,
                corpora: data[0]["labels"]
            })
        }
    });
    console.log(result);
});

router.post("/sentence",(req,res)=>{
    var idQuery = Sentence.find({"num_id": req.body.num_id, "corpus": req.body.corpus});
    idQuery.exec(function(err,data){
        if (err) console.log(err);
        else if (data.length == 0) res.send("<h1>There is no such sentence</h1>");
        else{
            global.corpus = req.body.corpus;
            global.num_id = req.body.num_id;
            global.isQuery = true;
            res.redirect("/label/session");
        }
    });
});
module.exports = router;
