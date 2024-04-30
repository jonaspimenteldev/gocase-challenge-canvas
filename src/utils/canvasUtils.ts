export const applyStyleToActiveObject = (canvas: any, style: any) => {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    activeObject.set(style);
    canvas.requestRenderAll();
  }
};
