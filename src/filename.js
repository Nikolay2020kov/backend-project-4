const File = (url) => {
  const regexp = /^https?:\/\//gi;
  const newUrl = url.replace(regexp, '');
  const reg = /[^\w]/gi;
  const fileNames = newUrl.replace(reg, '-');
  const fileName = `${fileNames}.html`;
  return fileName;
};
export default File;
