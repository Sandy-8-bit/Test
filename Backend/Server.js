const express = require("express");
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const PORT = 5000;
const MONGO_URI = "mongodb+srv://santhoshvenugopal2004:OJvR1nAJyzDY61db@backenddb.na8ri.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB/interview";
const app = express();
const routes = require("../Backend/Routes/authRoutes")
const product = require("../Backend/Routes/Admin")
const getss = require("../Backend/Routes/Products")
const mail = require("../Backend/Routes/Email")
const cart = require("../Backend/Routes/Cart")
const razor = require("../Backend/Routes/Razor")
const cors = require("cors");
app.use(cors());

mongoose.connect(MONGO_URI)
.then(()=>console.log("Connected to db"))
.catch((error)=> console.log(error))

app.use(express.json());
app.use(routes);
app.use(product);
app.use(mail);
app.use(getss);
app.use(cart);
app.use(razor);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.listen(PORT,()=> console.log(`Server is running in the ${PORT}`));
