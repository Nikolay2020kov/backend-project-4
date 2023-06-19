const RegExpUrl = (url) => {
  const Reg = /^https?:\/\//gi;
  const Regs = /^http?:\/\//gi;
  if (Reg.test(url)) {
    const regexp = /^https?:\/\//gi;
    const newUrl = url.replace(regexp, '');
    return newUrl;
  }
  if (Regs.test(url)) {
    const reg = /^http?:\/\//gi;
    const Url = url.replace(reg, '');
    return Url;
  }
  if (!Reg.test(url) || !Regs.test(url)) {
    return url;
  }
  return '0';
};
export default RegExpUrl;
