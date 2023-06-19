import cheerio from 'cheerio';
import DirName from './DirName.js';
import ChangeImg from './changeImg.js';
import RegExpUrl from './RegExp.js';

const ChangeHtml = (html, url, a) => new Promise((resolve, reject) => {
  const arr = [];
  const $ = cheerio.load(html);
  $('img').each(function arr1(i) {
    arr[i] = $(this).attr('src');
  });
  const arrs = arr.map((img) => ChangeImg(img));
  const d = RegExpUrl(url);
  const b = DirName(d);
  const resArrs = arrs.map((img) => `${b}${'/'}${a}${'-'}${img}`);
  const Old = arr;
  const New = resArrs;
  for (let i = 0; i < arr.length; i++) {
    $('img').each(function arr2() {
      const Src = $(this)
        .attr('src')
        .replaceAll(Old[i], New[i]);
      $(this).attr('src', Src);
    });
  }
  resolve([$.html(), arr, arrs]);
  reject();
});
export default ChangeHtml;
