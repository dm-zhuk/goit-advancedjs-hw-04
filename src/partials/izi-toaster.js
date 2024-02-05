import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function onIziToast(message) {
  iziToast.show({
    message: message,
    ...iziToast.settings,
  });
}

iziToast.settings({
  error: 'red',
  info: 'blue',
  success: 'green',
  messageColor: 'rgb(22, 24, 61)',
  position: 'topRight',
  timeout: 2500,
  closeOnEscape: true,
  animateInside: true,
  drag: true,
  pauseOnHover: true,
  progressBarEasing: 'linear',
  overlay: false,
  overlayClose: false,
  overlayColor: 'rgba(0, 0, 0, 0.6)',
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

export default iziToast;
