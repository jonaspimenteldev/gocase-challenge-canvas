import { defineStore } from "pinia";
import fabric from "@/plugins/fabric";
import FontFaceObserver from "fontfaceobserver";
import getImageUrl from "@/utils/getImageUrl";
import { FileEvent, Font, State } from "@/types/store";
import { loadImage, applyStyleToActiveObject } from "@/utils/canvasUtils";

export const useConfigStore = defineStore("config", {
  state: (): State => ({
    file: {},
    text: {},
    color: "",
    font: "VT323",
    image: {},
    canvas: {},
    stickers: ["01.png", "02.png", "03.png", "04.png"],
    images: ["01.jpeg", "02.jpeg", "03.jpeg", "04.jpeg"],
    colors: ["#FFF", "#3b82f6", "#eab308", "#ef4444", "#10b981", "#000"],
    fonts: [
      { label: "Farsan", value: "Farsan" },
      { label: "Borel", value: "Borel" },
      { label: "Roboto", value: "Roboto" },
      { label: "Dekko", value: "Dekko" },
      { label: "VT323", value: "VT323" },
      { label: "Quicksand", value: "Quicksand" },
      { label: "Inconsolata", value: "Inconsolata" },
    ],
    config: {},
  }),
  getters: {},
  actions: {
    removeItem() {
      const activeObjects = this.canvas.getActiveObjects();

      this.canvas.discardActiveObject();

      if (activeObjects.length) {
        this.canvas.remove.apply(this.canvas, activeObjects);
      }
    },

    async handleFileChange($event: FileEvent) {
      const file = $event.files[0];

      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const response = await fetch(base64data);
        const blob = await response.blob();

        const blobReader = new FileReader();
        blobReader.onloadend = () => {
          const blobAsDataURL = blobReader.result as string;
          fabric.Image.fromURL(blobAsDataURL, (img) => {
            this.image = img;

            img.set({
              left: this.canvas.width / 2,
              top: this.canvas.height / 2,
              originX: "center",
              originY: "center",
              lockScalingX: false,
              lockScalingY: false,
            });

            img.scaleToWidth(150);

            this.canvas.add(this.image);
            this.canvas.renderAll();
          });
        };

        blobReader.readAsDataURL(blob);
      };

      reader.readAsDataURL(file);
    },

    clearBackground() {
      this.canvas.setBackgroundImage(
        null,
        this.canvas.renderAll.bind(this.canvas)
      );

      this.canvas.renderAll();
    },

    applyBackground(imageName: string) {
      const url = getImageUrl(`wallpapers/${imageName}`);

      fabric.Image.fromURL(url, (img: any) => {
        this.canvas.setBackgroundImage(
          img,
          this.canvas.renderAll.bind(this.canvas),
          {
            scaleX: this.canvas.width / img.width,
            scaleY: this.canvas.height / img.height,
          }
        );
      });
    },

    applyText() {
      this.text = new fabric.IText("Novo texto", {
        left: this.canvas.width / 2,
        top: this.canvas.height / 2,
        fill: "#FFF",
        fontFamily: "sans-serif",
        hasRotatingPoint: false,
        originX: "center",
        originY: "center",
      });

      this.canvas.add(this.text).setActiveObject(this.text);
    },

    applyImage(imageName: string) {
      const url = getImageUrl(`stickers/${imageName}`);

      fabric.Image.fromURL(url, (img: any) => {
        this.image = img;

        img.set({
          left: this.canvas.width / 2,
          top: this.canvas.height / 2,
          originX: "center",
          originY: "center",
          lockScalingX: false,
          lockScalingY: false,
        });

        img.scaleToWidth(150);

        this.canvas.add(this.image);
        this.canvas.renderAll();
      });
    },

    async applyFont(font: string) {
      const fonts = new FontFaceObserver(font);
      await fonts.load().then(() => {
        applyStyleToActiveObject(this.canvas, { fontFamily: font });
      });
    },

    applyColor(color: string) {
      this.color = color;
      applyStyleToActiveObject(this.canvas, { fill: color });
    },

    loadAndUse(font: string) {
      const fonts = new FontFaceObserver(font);
      fonts.load().then(() => {
        this.canvas.getActiveObject().set("fontFamily", font);
        this.canvas.requestRenderAll();
      });
    },

    setConfig(config: Record<string, unknown>) {
      this.config = config;
    },

    setFonts(fonts: Font[]) {
      this.fonts = fonts;
    },

    setCanvas(canvas: Record<string, unknown>) {
      this.canvas = canvas;
    },
  },
});
