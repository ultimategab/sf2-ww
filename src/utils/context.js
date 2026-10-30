export function getCanvas() {
  const canvas = document.querySelector("canvas");

  return canvas;
}

export function getContext() {
  const context = getCanvas().getContext("2d");
  context.imageSmoothingEnabled = false;

  return context;
}

export function drawFrame(context, image, dimensions, x, y, direction = 1) {
  const [sourceX, sourceY, sourceWidth, sourceHeight] = dimensions;

  context.scale(direction, 1);
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x * direction, y, sourceWidth, sourceHeight);
  context.setTransform(1, 0, 0, 1, 0, 0);
}

export function drawText(context, image, frames, text, x, y, font = "score-small") {
  for (let letter = 0; letter < text.length; letter++) {
    drawFrame(context, image, frames.get(`${font}-${text.charAt(letter)}`), x + letter * 8, y);
  }
}
