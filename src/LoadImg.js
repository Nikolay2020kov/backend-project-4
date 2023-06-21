import LoadS from './axiosImg.js';

const LoadImg = (html) => new Promise((resolve, reject) => {
  const promises = [];

  html[1].forEach((link) => {
    promises.push(LoadS(link));
  });

  Promise.all(promises).then((newLink) => {
    resolve([
      html[0],
      newLink,
      html[2],
    ]);
  }).catch(() => {
    reject(new Error('Не удалось скачать картинки'));
  });
});

export default LoadImg;
