import fs from 'fs';
import File from './filename.js';

const { promises: fsp } = fs;
const Touch = (url, html, option, Path, newpath) => new Promise((resolve, reject) => {
  const fileName = File(url);
  const regexps = /^[^a-z_]+/gm;
  const opts = option.replace(regexps, '');
  if (!newpath) {
    fsp.writeFile(fileName, html).then(() => resolve()).catch(() => { reject(); });
  } else {
    fsp.mkdir(opts, { recursive: true })
      .then(() => {
        fsp.writeFile(newpath, html)
          .then(() => resolve()).catch(() => { reject(); });
      })
      .catch(() => { reject(); });
  }
});
export default Touch;
