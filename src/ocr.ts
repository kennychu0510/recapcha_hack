import Tesseract from 'tesseract.js';
import { selectElement } from './helper';

export function ocrImg(canvas: HTMLCanvasElement) {
  const image = canvas.toDataURL();
  const resultDiv = selectElement('#result') as HTMLDivElement;
  resultDiv.innerHTML = 'Loading...';
  const loadingTimer = setInterval(() => {
    resultDiv.innerHTML += '.';
    if (resultDiv.innerHTML.length > 15) {
      resultDiv.innerHTML = 'Loading...';
    }
  }, 100);
  Tesseract.recognize(image, 'eng', {
    logger: (m) => {
      console.log(m);
    },
  }).then(({ data: { text } }) => {
    if (text) {
      selectElement('#result').innerHTML = text;
    } else {
      selectElement('#result').innerHTML = 'OCR failed';
    }
    clearInterval(loadingTimer);
  });
}
