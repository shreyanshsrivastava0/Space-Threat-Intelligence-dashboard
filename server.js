const express = require("express");
const { Server }= require("socket.io");
const http = require("http");
const path = require("path");

const { execFile } = require("child_process");


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port =  process.env.PORT || 8080;
app.use(express.urlencoded({extended :true}));

app.set("views",path.join(__dirname , "/views"));
app.use(express.static(path.join(__dirname , "public")));
// app.use(express.static('public'));





app.set("view engine","ejs");
app.get("/insights", (req, res) => {
    // Example "live update counts"
    const threatCounts = [2, 1, 3, 0, 4];
    execFile("python3", [path.join(__dirname, "generate_graph.py"), JSON.stringify(threatCounts)], (err, stdout, stderr) => {
    if (err) {
        console.error("Python execFile error:", err);
        console.error("Python stderr:", stderr);
        return res.send("Error generating graph");
    }

    const graphBase64 = stdout.trim();
    res.render("insight", { graph_data: graphBase64 });
});

});


// io.on("connection",(socket)=>{

//  console.log("A user connected",socket.id);

//  socket.on("disconnect", ()=>{
//     console.log("A user disconnected ", socket.id);
//  });

// });

app.listen(port , ()=>{
    console.log(`Connected with http://localhost${port}`);
});