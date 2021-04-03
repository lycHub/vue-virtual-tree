const express = require('express');
const app = express();
const PORT = 3333;
app.use(express.static('dist'));
app.listen(PORT, function(err) {
  if (err) {
    console.log('err :', err);
  } else {
    console.log('Listen at http://localhost:' + PORT);
  }
});
