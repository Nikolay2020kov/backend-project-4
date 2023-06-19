import LoadS from './axiosImg.js';

const LoadImg = (html) => new Promise((resolve, reject) => {
  const promises = [];

  for (const _link of html[1]) {
    promises.push(new Promise((resolve) => {
      LoadS(_link).then((a) => {
        resolve(a);
      });
    }));
  }

  Promise.all(promises).then((newLink) => {
    resolve([
      html[0],
      newLink,
      html[2],
    ]);
  });
});

export default LoadImg;
