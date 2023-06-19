const UrlHost = (url) => {
  const Reg = /\/.+/gi;
  const host = url.replace(Reg, '');
  const Regs = /[^\w]/gi;
  const newHost = host.replace(Regs, '-');
  return newHost;
};
export default UrlHost;
