import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));

let blogposts = [];

function blogs(title, content, date) {
  this.id = Date.now(); // Unique ID based on timestamp
  this.title = title;
  this.content = content;
  this.date = date;
}

function date() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return `${day}-${month}-${year}`; // Return the formatted date
}

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { blogposts });
});

app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  // Corrected parameters: title, content, date()
  const newBlog = new blogs(title, content, date());
  blogposts.push(newBlog);
  res.redirect("/allBlogs");
});

app.get("/new", (req, res) => {
  var blogposts = new blogs(req.body.title, req.body.content, date);
  res.render("new.ejs", { blogposts });
});

app.get("/allBlogs", (req, res) => {
  const recentBlogs = blogposts.slice(-6).reverse(); // Get last 6 blogs
  const showAll = req.query.all === "true"; // Check if "All Blogs" is clicked

  if (showAll) {
    res.render("allBlogs.ejs", { blogposts: blogposts.slice().reverse() }); // Send all blogs
  } else {
    res.render("index.ejs", { blogposts, recentBlogs });
  }
});

app.get("/edit/:id", (req, res) => {
  const blog = blogposts.find(b => b.id == req.params.id);
  if (blog) {
    res.render("edit.ejs", { blog });
  } else {
    res.send("Blog not found");
  }
});



app.post("/update/:id", (req, res) => {
  const { title, content } = req.body;
  const blog = blogposts.find(b => b.id == req.params.id);

  if (blog) {
    blog.title = title;
    blog.content = content;
    res.redirect("/allBlogs"); // Redirect to the all blogs page
  } else {
    res.send("Blog not found");
  }
});


app.get("/delete/:id", (req, res) => {
  blogposts = blogposts.filter(b => b.id != req.params.id);
  res.redirect("/allBlogs");
});



app.get("/blog/:id", (req, res) => {
  const blog = blogposts.find((b) => b.id == req.params.id);
  if (blog) {
    res.render("blog.ejs", { blog });
  } else {
    res.send("Blog not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

