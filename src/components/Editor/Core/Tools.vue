<template>

  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-col gap-4">
      <div class="text-2xl font-bold text-slate-800">
        Personalize sua capa
      </div>

      <div class="flex flex-col gap-4 mb-4">
        <h3 class="font-bold text-md text-slate-800">Selecione um fundo</h3>
        
        <!-- Upload de background  -->
        <div class="flex gap-4">
          <img v-for="(item, key) in store.images" :key="key" @click="store.applyBackground(item)"
            class="w-12 h-24 border-2 border-white cursor-pointer" :src="getImageUrl('wallpapers/' + item)"></img>
          <button
            class="flex items-center justify-center w-12 h-24 font-bold text-white border-2 border-white cursor-pointer opacity-20"
            @click="store.clearBackground">X</button>
        </div>

        <!-- Upload de imagem -->
        <h3 class="font-bold text-slate-800 text-md">Upload de imagem</h3>
        <FileUpload mode="basic" name="demo[]"  accept="image/*" customUpload class="w-full text-base bg-slate-600"
          @uploader="store.handleFileChange" :auto="true" chooseLabel="Selecione uma imagem" />
        
        <!-- Selecione os stickers -->
        <h3 class="font-bold text-slate-800 text-md">Selecione os stickers</h3>
        <div class="flex gap-4">
          <img v-for="(item, key) in store.stickers" @click="store.applyImage(item)" :key="key"
            :src="getImageUrl('stickers/' + item)" class="w-12 h-12 cursor-pointer" />
        </div>

        <!-- Adicionar novo texto -->
        <h3 class="font-bold text-slate-800 text-md">Texto</h3>
        <button @click="store.applyText()" type="button"
          class="flex items-center justify-center px-4 py-3 font-semibold border rounded-lg text-md text-slate-700 border-slate-700 ">
          Adicionar novo texto
        </button>

        <!-- Escolher fonte -->
        <h3 class="font-bold text-slate-800 text-md">Fonte</h3>
        <Dropdown v-model="fonts" @change="store.applyFont(fonts)" :options="store.fonts" optionLabel="label"
          optionValue="value" placeholder="Selecione uma fonte" class="w-full md:w-14rem" />

        <!-- Escolher cor -->
        <div class="flex gap-2">
          <button v-for="item in store.colors" :class="{'border-slate-500/75' : store.color === item }" :style="`background-color: ${item}`" class="w-[24px] h-[24px] border-2 border-white hover:border-slate-500/75  rounded-full cursor-pointer" @click="store.applyColor(item)"></button>
        </div>
        
       
          
      </div>
    </div>


    <div class="flex flex-col gap-4">
      <button @click="store.removeItem" type="button"
        class="flex items-center justify-center px-4 py-3 font-semibold text-white border rounded-lg text-md border-slate-600 bg-slate-600 hover:bg-slate-700 hover:border-slate-700">
        Remover o item selecionado
      </button>
      <button @click="saveCoverInPNG" type="button"
        class="flex items-center justify-center px-4 py-3 font-semibold text-white border rounded-lg text-md border-slate-700 bg-slate-700 hover:bg-slate-900 hover:border-slate-900">
        Salvar
      </button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';

import { useConfigStore } from '@/stores/config'
import getImageUrl from '@/utils/getImageUrl';

const store = useConfigStore()

const fonts = ref('')
const colors = ref('')

const saveCoverInPNG = () => {
  let canvas = document.getElementById('canvaHtml5') as HTMLCanvasElement;
  let dataURL = canvas?.toDataURL('image/png');

  let link = document.createElement('a');
  link.href = dataURL;
  link.download = 'minha-capa.png';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
}
</script>
