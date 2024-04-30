import fabric from "@/plugins/fabric";

export const loadImage = async (url: string, canvas: any, settings: any) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      fabric.Image.fromURL(dataUrl, (img) => {
        img.set(settings);
        canvas.add(img);
        canvas.renderAll();
        resolve(img);
      });
    };
    reader.readAsDataURL(blob);
  });
};

export const applyStyleToActiveObject = (canvas: any, style: any) => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    activeObject.set(style);
    canvas.requestRenderAll();
  }
};
