import path from 'path';
import fs from 'fs';

const { promises: fsp } = fs;
const Touch = (html, a, file, DirNames, option, Path, newpath) => new Promise((resolve, reject) => {
  const htmls = html[0];
  const Links = html[1];
  const FileNameImg = html[2];
  const fileNameImg = FileNameImg.map((img) => `${a}${'-'}${img}`);
  const regexps = /^[^a-z_]+/gm;
  const opts = option.replace(regexps, '');
  const Dirname = opts;
  if (!newpath) {
    fsp
      .writeFile(file, htmls)
      .then(() => resolve())
      .catch(() => {
        reject();
      });
    fsp
      .mkdir(DirNames, { recursive: true })
      .then(() => {
        for (let i = 0; i < Links.length; i++) {
          Links[i]
            .pipe(
              fs.createWriteStream(
                path.resolve(process.cwd(), DirNames, `${fileNameImg[i]}`),
              ),
            )
            .on('finish', () => {
              console.log('Записал файл: ');
            })
            .on('error', (e) => {
              console.log('Ошибка в при записи файла', e);
            });
        }
      })
      .then(() => resolve())
      .catch(() => {
        reject();
      });
  } else {
    fsp.mkdir(opts, { recursive: true }).then(() => {
      fsp
        .writeFile(newpath, htmls)
        .then(() => resolve())
        .catch(() => {
          reject();
        });
      fsp
        .mkdir(path.join(Dirname, DirNames), { recursive: true })
        .then(() => {
          for (let i = 0; i < Links.length; i++) {
            Links[i]
              .pipe(
                fs.createWriteStream(
                  path.resolve(
                    process.cwd(),
                    path.join(Dirname, DirNames),
                    `${fileNameImg[i]}`,
                  ),
                ),
              )
              .on('finish', () => {
                console.log('Записал файл: ');
              })
              .on('error', (e) => {
                console.log('Ошибка в при записи файла', e);
              });
          }
        })
        .then(() => resolve())
        .catch(() => {
          reject();
        });
    });
  }
});
export default Touch;
