import { selectElement } from "./helper";

const sampleBtns = selectElement('#sample-imgs').children;
const beforeImg = selectElement('#before') as HTMLImageElement;
for (let i = 0; i < sampleBtns.length; i++) {
  sampleBtns[i].addEventListener('click', () => {
    const tempImg = new Image();
    tempImg.src = `./images/pic_${i+1}.jpeg`;
    tempImg.onload = () => {
      beforeImg.src = `./images/pic_${i+1}.jpeg`;
      beforeImg.width = tempImg.naturalWidth;
      beforeImg.height = tempImg.naturalHeight;
    }
  })
}