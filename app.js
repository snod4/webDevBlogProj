const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

let blogList = [new Post("Post 1", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")];


app.set('view engine', 'ejs');


app.get("/", function(req, res){
  res.render('index', {
    title: "Home",
    blogs: blogList});
});


app.get("/about", function(req, res){
  res.render('about', {
    title: "About"
  });
});

app.get("/contact", function(req, res){
  res.render('contact', {
    title: "Contact"
  });
});

app.get("/compose", function(req, res){
  res.render('compose', {
    title: "Compose"
  });
});

app.post("/compose", function(req, res){
  const title = req.body.title ;
  const content = req.body.textBody;
  blogList.push(new Post(title, content));
  res.redirect("/");
});







//Individual Blog Posts


//ISSUE with posts regex pattern looking for css?
app.get(/\/posts+/, function(req, res){

 let path = req.path;
 console.log(path);
if(path === '/posts/css/styles.css'){
  res.redirect("/css/styles.css");
  return;

}

let name  = path.substr(path.lastIndexOf('/')+1).replace(/%/g,' ');

  let thisBlog = blogList.find(function(element){
    console.log("Element name: " + element.name)
    console.log("name: " + name)
    return element.name === name;
  });
  console.log(thisBlog);
  res.render('blogPage', {
    title: name,
    blog: thisBlog });


});




app.listen(process.env.PORT || 3000, function(){
  console.log("Server up and running");
});

//Functions and Constructors

function Post(name, content){

  this.name = name;
  this.content = content;
}
