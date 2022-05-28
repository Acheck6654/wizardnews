// Express
const express = require('express')
const app = express()

const postBank = require("./postBank")
//const postId = require("./post/:id")

// Logging middleware
const morgan = require('morgan');
const { find } = require('./postBank');
app.use(morgan('dev'));

// Parsing middleware
app.use(express.json());

// Static Files
app.use(express.static('public'));



app.get("/", (req, res, next) => {
    const posts = postBank.list()
    const htmlData = `<!DOCTYPE html>
    <html>
    <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/index.css" />
    </head>
    <body>
        <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
        ${posts
          .map(
            (post) => `
           <div class='news-item'>
           <p>
           <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
           <small>(by ${post.name})</small>
           </p>
           <small class="news-info">
           ${post.upvotes} upvotes | ${post.date}
           </small>
           </div>`
          )
          .join("")}
        </div>
    </body>
    </html>`
    console.log("A request to the root path has been made.");


    // Send back a response to the requester
    res.send(htmlData);
  });


    // find.get("/:posts/:id", (req, res, next) =>{
    //     if(!post.id){next()}
    // }else{

    // }

    app.get("/posts/:id", (req, res, next) => {
      const { id } = req.params;
      const post = postBank.find(id)
    
      if (!post.id) {
        next();
      } else {
        res.send(`<!DOCTYPE html>
        <html>
        <head>
            <title>Wizard News</title>
            <link rel="stylesheet" href="/index.css" />
        </head>
        <body>
          <div class="news-list">
            <header><img src="/logo.png"/>Wizard News</header>
            <div class='news-item'>
            <p>${post.title} <small>(by ${post.name})</small></p>
            <p>${post.content}</p>
            </div></div>
            `); 
      }
    });

    app.get("*", (req, res) => {
      
      res.status(404).send(` <!DOCTYPE html>
        <html>
        <head>
          <title>Wizard News</title>
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
          <header><img src="/logo.png"/>Wizard News</header>
          <div class="not-found">
            <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
          </div>
        </body>
        </html> `);
    });


  

  // This destructures the port number from the process.environment variable.
// If none, the default is set to 1337.
// This is not necessary but is required to prevent deployment error with heroku.
const { PORT = 1337 } = process.env;

app.listen(PORT, ()=>{
    console.log("Server is running . . .")
})




  

  
  