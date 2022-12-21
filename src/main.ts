import { cleanImg } from "./cleanImg";
import { selectElement } from "./helper";
import { ocrImg } from "./ocr";

const uploadImg = selectElement('input#img') as HTMLInputElement;
const beforeImg = selectElement('#before') as HTMLImageElement;
const afterImgCanvas = selectElement('canvas') as HTMLCanvasElement;

uploadImg?.addEventListener('change', (e: any) => {
  const url = URL.createObjectURL(e.target.files[0]);
  const image = new Image();
  image.src = url;
  image.onload = () => {
    beforeImg.width = image.naturalWidth;
    beforeImg.height = image.naturalHeight;
    beforeImg.src = url;
  };
});

beforeImg.addEventListener('load', () => {
  afterImgCanvas.width = beforeImg.width;
  afterImgCanvas.height = beforeImg.height;

  const ctx = afterImgCanvas.getContext('2d')!;
  ctx.drawImage(beforeImg, 0, 0);

  cleanImg(ctx, beforeImg.width, beforeImg.height);
  ocrImg(afterImgCanvas)
})
