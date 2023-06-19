import axios from 'axios';

const Load = (url) => new Promise((resolve, reject) => {
  axios
    .get(url)
    .then((response) => resolve(response.data))
    .catch((e) => {
      console.log(`${e}Не возможно загрузить url,проверьте адрес страницы`);
      reject(e);
    });
});
export default Load;
