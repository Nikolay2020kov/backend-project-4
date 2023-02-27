import axios from 'axios';

const Load = (url) => new Promise((resolve, reject) => {
  axios.get(url).then((response) => resolve(response.data)).catch((e) => {
    console.log(e);
    reject(e);
  });
});
export default Load;
