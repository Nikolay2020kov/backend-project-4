import fs from 'fs';
import File from './filename.js';
import Touch from './createFile.js';
import Load from './axios.js';

const { promises: fsp } = fs;

const Cheack = (url, option) => new Promise((resolve, reject) => {
  const fileName = File(url);
  const Paths = process.cwd();
  const isNew = !option.includes(Paths);
  const path = isNew ? `${Paths + option}/${fileName}` : `${option}/${fileName}`;

  fsp.stat(path, { bigint: true })
    .then(() => {
      console.log(path);
    })
    .catch(() => {
      console.log(`Файл по пути ${path} создан`);
      Load(url).then((html) => {
        Touch(url, html, option, !isNew ? path : '', isNew ? path : '').then(() => {
          resolve();
        }).catch(() => {
          reject(new Error('Не удалось создать файл'));
        });
      }).catch(() => {
        reject(new Error('Не удалось создать файл'));
      });
    });
});
export default Cheack;
