import Cheack from './cheackfile.js';

const pageLoader = (url, option) => new Promise((resolve, reject) => {
  Cheack(url, option).then(() => { resolve(); }).catch(() => { reject(); });
});

export default pageLoader;
