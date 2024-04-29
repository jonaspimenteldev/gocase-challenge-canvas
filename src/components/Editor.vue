<script setup>
import { ref, onMounted } from 'vue';
import { fabric } from 'fabric';

let fabricCanvas;
const canvas = ref(null);
const rect = ref(null);
const text = ref(null);


const addText = () => {
  text.value = new fabric.IText('Texto de Exemplo', {
    left: canvas.value.width / 2,
    top: canvas.value.height / 2,
    fill: '#e0f7fa',
    fontFamily: 'sans-serif',
    hasRotatingPoint: false,
    centerTransform: true,
    originX: 'center',
    originY: 'center',
    lockUniScaling: true
  });
  canvas.value.add(text.value);
  text.value.on('scaling', () => update());
};



onMounted(() => {
  const ref = document.querySelector('canvas');
  canvas.value = new fabric.Canvas(ref);
  rect.value = new fabric.Rect({
    stroke: 'red',
    width: 200,
    height: 200,
    fill: 'transparent',
    strokeWidth: 10,
  });

  canvas.value.add(rect.value);
});


</script>

<template>
  <div>
    <div :style="{ position: 'relative' }">
      <button @click="addText" class="btn-primary">Adicionar Texto</button>
      <canvas
        width="400"
        height="400"
        :style="{ 'z-index': 10, position: 'absolute' }"
      ></canvas>
 
    </div>
  </div>
</template>