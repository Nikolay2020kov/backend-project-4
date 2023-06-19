const DirName = (url) => {
  const reg = /[^\w]/gi;
  const DirNames = url.replace(reg, '-');
  const Dirname = `${DirNames}_files`;
  return Dirname;
};
export default DirName;
