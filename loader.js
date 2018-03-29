const fs = require('fs');
const fetch = require('node-fetch');
const Promise = require('bluebird');

const exists = Promise.promisify(fs.access);

const loadBundle = (cache, item, filename) => {
  // add a small delay to ensure pipe has closed
  setTimeout(() => {
    console.log('Loading: ', filename);
    cache[item] = require(filename).default;
  }, 5);
};

const fetchBundles = (path, microservices, suffix = '', require = false) => {
  Object.keys(microservices).forEach((item) => {
    const file = `${path}/${item}${suffix}.js`;
    exists(file)
      .then(() => {
        require ? loadBundle(microservices, item, file) : null;
      })
      .catch((err) => {
        if (err.code === 'ENOENT') {
          const url = `${microservices[item]}${suffix}.js`;
          console.log(`Fetching ${url} ...`);
          fetch(url)
            .then((res) => {
              const destination = fs.createWriteStream(file);
              res.body.pipe(destination);
              res.body.on('end', () => {
                require ? loadBundle(microservices, item, file) : null;
              });
            });
        } else {
          console.log('ERROR: fs error', err);
        }
      });
  });
};

module.exports = (clientPath, serverPath, microservices) => {
  fetchBundles(clientPath, microservices);
  fetchBundles(serverPath, microservices, '-server', true);

  return microservices;
};
