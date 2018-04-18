require('dotenv').load();
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

if (!global.window) {
  global.window = new Object();
}

const clientBundles = './public/microservices';
const serverBundles = './templates/microservices';
const serviceConfig = require('./service-config.js');
const microservices = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const React = require('react');
const ReactDOM = require('react-dom/server');
const Layout = require('./templates/layout.js');
const App = require('./templates/app.js');
const Scripts = require('./templates/scripts.js');

const renderComponents = (components, props = {}) => {
  return Object.keys(components).map((item) => {
    const component = React.createElement(components[item], props);
    return ReactDOM.renderToString(component);
  });
};

app.get('/restaurants/:id', (req, res) => {
  const components = renderComponents(microservices, { id: req.params.id });
  console.log(components);
  res.end(Layout(
    'Pineapple Pen',
    App(components),
    Scripts(Object.keys(microservices), req.params.id ),
  ));
});

// app.get('/', (req, res) => {
//   res.redirect('/restaurants/0/');
// });

// app.use('/restaurants/:id', express.static(path.join(__dirname, 'public')));

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
  console.log(`server running at: http://localhost:${port}`);
});
