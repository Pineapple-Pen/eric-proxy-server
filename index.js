require('dotenv').load();
const express = require('express')
const path = require('path');
const app = express();
const port = process.env.PORT;

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/restaurants/0/');
});

app.use('/restaurants/:id', express.static(path.join(__dirname, 'public')));

app.get('/api/restaurants/:id/gallery', (req, res) => {
  res.redirect(`${process.env.PHOTOS}/api/restaurants/${req.params.id}/gallery`)
});
app.get('/api/restaurants/:id/overview', (req, res) => {
  res.redirect(`${process.env.OVERVIEW}/api/restaurants/${req.params.id}/overview`)
});
app.get('/api/restaurants/:id/sidebar', (req, res) => {
  res.redirect(`${process.env.SIDEBAR}/api/restaurants/${req.params.id}/sidebar`)
});
app.get('/api/restaurants/:id/recommendations', (req, res) => {
  res.redirect(`${process.env.RECOMMENDATIONS}/api/restaurants/${req.params.id}/recommendations`)
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});