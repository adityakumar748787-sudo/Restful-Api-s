const express=require("express");
const app=express();
const port=8080;
const path=require("path");

const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
app.listen(port,()=>{
    console.log("listening");
})
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
let posts=[
    {
        id:uuidv4(),
        username:"AdityaKumar",
        content:"I am a boy "
    },
    {
        id:uuidv4(),
        username:"Nyasa",
        content:"I am a girl "
    },
    {
        id:uuidv4(),
        username:"vivek",
        content:"I am neither a boy nor a girl "
    }

];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts")
})
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;

    const post = posts.find(p => p.id == id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("show", { post });
});
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;

    let post = posts.find((p) => id === p.id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.content = newContent;
    console.log(post);

    // res.send("patch request working");
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;

    let post = posts.find((p) => id === p.id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit", { post });
});
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");


});
