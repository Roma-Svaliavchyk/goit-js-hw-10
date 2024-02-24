import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function delayFunction(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay} ms`);
      } else {
        reject(`❌ Rejected promise in ${delay} ms`);
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = parseInt(e.target.elements.delay.value, 10);
  const state = e.target.elements.state.value;

  delayFunction(delay, state)
    .then(result => {
      console.log(result);
      iziToast.success({
        message: `${result}`,
        position: 'topRight',
      });
    })
    .catch(err => {
      console.log(err);
      iziToast.error({
        message: `${err}`,
        position: 'topRight',
      });
    });
});