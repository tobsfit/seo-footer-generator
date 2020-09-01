const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const port = 5000;

app.use(express.static('public'));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});