const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');


app.get("/", (req, res) => {
	res.render('index');
});
app.get("/translator", (req, res) => {
	res.send('translator');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));