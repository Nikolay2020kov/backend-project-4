import fs from 'fs';
import Touch from './createFile.js';
import Load from './Load.js';
import RegExpUrl from './RegExp.js';
import FileName from './FileName.js';
import DirName from './DirName.js';
import ChangeHtml from './ChangeHtml.js';
import UrlHost from './UrlFix.js';
import LoadImg from './LoadImg.js';

const { promises: fsp } = fs;

const Cheack = (url, option) => new Promise((resolve, reject) => {
  const start = RegExpUrl(url);
  const file = FileName(start);
  const DirNames = DirName(start);
  const a = UrlHost(start);
  const Paths = process.cwd();
  const isNew = !option.includes(Paths);
  const path = isNew
    ? `${Paths + option}/${file}`
    : `${Paths}/${file}`;
  fsp
    .stat(path, { bigint: true })
    .then(() => {
      console.log(`Файл ${path} уже существует`);
    })
    .catch(() => {
      console.log(`Файл по пути ${path} будет создан`);
      Load(url)
        .then((html) => ChangeHtml(html, url, a))
        .then((html) => LoadImg(html))
        .then((html) => {
          Touch(
            html,
            a,
            file,
            DirNames,
            option,
            !isNew ? path : '',
            isNew ? path : '',
          )
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject(new Error('Не удалось создать файл'));
            });
        });
    });
});
export default Cheack;
