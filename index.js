const http = require('http');
const express = require('express');
const port = 8080;

const app = express();






app.listen(port, (err) => {
    if (err) {
        console.log(err + " error in server");
        return;
    }
    console.log('server started on ' + port)
})