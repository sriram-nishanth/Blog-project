import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const posts = [];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { posts });
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
    res.render("edit", { post });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Remove or comment out the following lines if present:
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }

// export default app; // <-- Remove this line for Render