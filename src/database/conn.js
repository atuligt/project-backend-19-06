const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://shreyanjoshiigt:AXhkam7hjazhCMqm@cluster0.eolrwy3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{console.log("connected")}).catch(()=>{console.log("not connected")})