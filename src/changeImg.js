import RegExpUrl from './RegExp.js';

const ChangeImg = (img) => {
  const Img = RegExpUrl(img);
  const Regs = /.+?\//i;
  const RegS = Img.replace(Regs, '');
  const ReG = /[^\w]/gi;
  const b = RegS.replace(ReG, '-');
  const d = b.split('').reverse().join('');
  const reg = /\-/i;
  const s = d.replace(reg, '.');
  const g = s.split('').reverse().join('');
  return g;
};
export default ChangeImg;
