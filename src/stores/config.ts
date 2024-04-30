import { defineStore } from "pinia";
import fabric from "@/plugins/fabric";
import FontFaceObserver from "fontfaceobserver";
import getImageUrl from "@/utils/getImageUrl";
import { State } from "@/types/store";

export const useConfigStore = defineStore("config", {
  state: () =>
    ({
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
        { label: "VT323", value: "VT323" },
        { label: "Quicksand", value: "Quicksand" },
        { label: "Inconsolata", value: "Inconsolata" },
      ],
      config: {},
    } as State),
  getters: {},
  actions: {
    removeItem() {
      const activeObjects = this.canvas.getActiveObjects();
      this.canvas.discardActiveObject();
      if (activeObjects.length) {
        this.canvas.remove.apply(this.canvas, activeObjects);
      }
    },

    async handleFileChange($event: { files: File[] }) {
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

    applyBackground(imageName: any) {
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

    applyFont(font: string) {
      if(!this.canvas.getActiveObject()) return 
      this.canvas.getActiveObject().set("fontFamily", font);
      this.canvas.requestRenderAll();
    },

    applyColor(color: string) {
      if(!this.canvas.getActiveObject()) return 
      this.color = color;
      this.canvas.getActiveObject().set("fill", color);
      this.canvas.requestRenderAll();
    },
    
    loadAndUse(font: string) {
      const fonts = new FontFaceObserver(font);
      fonts.load().then(() => {
        this.canvas.getActiveObject().set("fontFamily", font);
        this.canvas.requestRenderAll();
      });
    },

    setConfig(config: Record<string,unknown>) {
      this.config = config;
    },

    setFonts(fonts: { label: string; value: string; }[]) {
      this.fonts = fonts;
    },

    setCanvas(canvas: Record<string,unknown>) {
      this.canvas = canvas;
    },
  },
});
