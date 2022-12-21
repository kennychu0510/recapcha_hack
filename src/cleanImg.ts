export function cleanImg(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const imageData = ctx.getImageData(0, 0, width, height);
    const THRESHOLD = 100;
    const pixelDataArray = imageData.data
    const WHITE = 255;
    const BLACK = 0;

    for (let i = 0; i < pixelDataArray.length; i += 4) {
      let r = pixelDataArray[i];
      let g = pixelDataArray[i + 1];
      let b = pixelDataArray[i + 2];
      let a = pixelDataArray[i + 3];

      /* CONVERT TO BLACK AND WHITE */
      const newValue = (r + g + b) / 3
      pixelDataArray[i] = newValue
      pixelDataArray[i + 1] = newValue
      pixelDataArray[i + 2] = newValue

      if (newValue > THRESHOLD) {
        pixelDataArray[i] = 255
        pixelDataArray[i + 1] = 255
        pixelDataArray[i + 2] = 255
      } else {
        pixelDataArray[i] = 0
        pixelDataArray[i + 1] = 0
        pixelDataArray[i + 2] = 0
      }
    }
    /* CHECK NEIGHBOUR PIXELS */

    const pixelDataArrayF1 = new Uint8ClampedArray(pixelDataArray)

    /* 
      neighbor length = 1, neighbor count = 8
      neighbor length = 2, neighbor count = 24
      neighbor length = 3, neighbor count = 48
      neighbor length = n, neighbor count = n^2 * 4 + 4n 
    */
    /* REMOVING NOISE */
    for (let i = 0; i < pixelDataArray.length; i+=4) {
      const neighbor = getNeighborIndices(i)
      let blackPixelCount = 0;
      for (let index of neighbor) {
        if (index < 0 || index > pixelDataArray.length) continue;
        if (pixelDataArray[index] === BLACK) {
          blackPixelCount++
        }
      }
      if (blackPixelCount < 5) {
        setPixelRGB(pixelDataArrayF1, i, WHITE)
      }

      const xDirectionPercentage = (i % (width * 4) / (width * 4))
      if (xDirectionPercentage < 0.05) {
        setPixelRGB(pixelDataArrayF1, i, WHITE)
      }
      if (xDirectionPercentage > 0.95) {
        setPixelRGB(pixelDataArrayF1, i, WHITE)
      }

      const yDirectionPercentage = (Math.floor(i / (width * 4)) / height)
      if (yDirectionPercentage < 0.05) {
        setPixelRGB(pixelDataArrayF1, i, WHITE)
      }

      if (yDirectionPercentage > 0.9) {
        setPixelRGB(pixelDataArrayF1, i, WHITE)
      }

    }

    const pixelDataArrayF2 = new Uint8ClampedArray([...pixelDataArrayF1])

    for (let i = 0; i < pixelDataArray.length; i+=4) {
      const neighbor = getNeighborIndices(i)
      let blackPixelCount = 0;
      for (let index of neighbor) {
        if (index < 0 || index > pixelDataArray.length) continue;
        if (pixelDataArrayF2[index] === BLACK) {
          blackPixelCount++
        }
      }
      if (blackPixelCount > 4) {
        setPixelRGB(pixelDataArrayF2, i, BLACK)
      }
    }


    imageData.data.set(pixelDataArrayF1)
    ctx.putImageData(imageData, 0, 0)

    function getIndex(x: number, y: number) {
      return x + y;
    }

    function setPixelRGB(pixel: Uint8ClampedArray, index: number, rgbValue: number) {
      pixel[index] = rgbValue
      pixel[index+1] = rgbValue
      pixel[index+2] = rgbValue
    }

    function getNeighborIndices(i: number) {
      return [
        i - 4 - width * 4,
        i - width * 4,
        i - width * 4 + 4,
        i - 4,
        i + 4,
        i + width * 4 - 4,
        i + width * 4,
        i + width * 4 + 4
      ]
    }
}

