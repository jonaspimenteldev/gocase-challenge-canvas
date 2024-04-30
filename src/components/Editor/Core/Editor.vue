<script setup>
import { fabric } from 'fabric';
import { ref, reactive, onMounted } from 'vue';
import FontFaceObserver from 'fontfaceobserver';
import { useConfigStore } from '@/stores/config'
const store = useConfigStore()

const canvaHtml5 = ref(null);

onMounted(() => {
  const canvas = new fabric.Canvas(canvaHtml5.value, {
    preserveObjectStacking: true,
    backgroundColor : "#e6e6e6"
  });

  store.setCanvas(canvas);

  
  document.addEventListener('keydown', (event) => {
    if (event.keyCode === 46 || event.key === 'Delete') {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        canvas.remove(activeObject);
      }
    }
  });
});
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div>
      <canvas id="canvaHtml5" ref="canvaHtml5" class="h-full border-4 border-slate-500 rounded-[66px] shadow-lg" width="360" height="740"></canvas>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Pacifico|VT323|Quicksand|Inconsolata');
</style>
