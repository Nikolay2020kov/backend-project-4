import axios from 'axios';

const LoadS = (url) => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url,
    responseType: 'stream',
  })
    .then((response) => resolve(response.data))
    .catch((e) => {
      console.log(e);
      reject(e);
    });
});
export default LoadS;
