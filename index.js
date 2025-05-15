const express = require('express');
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs",{posts})
});

app.post("/create", (req, res) => {
    const newPost = {
        id: Date.now().toString(),
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    console.log("Updated Posts Array:", posts);
    res.redirect("/");
});


app.get("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    
    if (!post) {
        console.log("Post not found");
        return res.redirect("/");
    }

    console.log("Loading Edit Page for:", post);
    res.render("edit.ejs", { post });
});

app.post("/update/:id", (req, res) => {
    const postIndex = posts.findIndex(p => p.id === req.params.id);
    if (postIndex !== -1) {
        posts[postIndex].title = req.body.title;
        posts[postIndex].content = req.body.content;
    }
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    const index = posts.findIndex(p => p.id === req.params.id);
    if (index !== -1) posts.splice(index, 1);
    res.redirect("/");
});

// Remove or comment out this line for Vercel:
// app.listen(3000, () => console.log('Server running'));

module.exports = app;