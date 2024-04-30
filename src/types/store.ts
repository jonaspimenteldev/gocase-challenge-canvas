export interface Color {
  label: string;
  value: string;
}

export interface Font {
  label: string;
  value: string;
}

export interface EventFile {
  target: EventTarget;
  files: Array<string>;
}

export interface State {
  file: Record<string, any>;
  text: Record<string, any>;
  color: string;
  font: string;
  image: Record<string, any>;
  canvas: Record<string, any>;
  stickers: string[];
  images: string[];
  colors: Array<string>;
  fonts: Font[];
  config: Record<string, any>;
}
