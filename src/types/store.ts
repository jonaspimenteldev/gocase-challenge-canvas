import { Files, Target } from "lucide-vue-next";

export interface Color {
  label: string;
  value: string;
}

export interface Font {
  label: string;
  value: string;
}

export interface EventFile {
  target: EventTarget & Target & Files;
  files: Array<string>;
}

export interface State {
  file: Record<string, any>;
  text: Record<string, any>;
  font: string;
  image: Record<string, any>;
  canvas: Record<string, any>;
  stickers: string[];
  images: string[];
  colors: Color[];
  fonts: Font[];
  config: Record<string, any>;
}
