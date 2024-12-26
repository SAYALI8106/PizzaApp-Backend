
const express = require('express');

const serverConfig = require('./config/serverConfig');
const PORT = serverConfig.PORT || 3000;

const app = express();

app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}...`);

})
