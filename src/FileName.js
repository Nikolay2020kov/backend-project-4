const FileName = (url) => {
  const reg = /[^\w]/gi;
  const file = url.replace(reg, '-');
  const fileName = `${file}.html`;
  return fileName;
};
export default FileName;
