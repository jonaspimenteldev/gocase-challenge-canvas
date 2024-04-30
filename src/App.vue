<template>
  <div class="h-screen">
    <div class="grid h-screen grid-cols-1 md:grid-cols-3">
      <div class="h-screen col-span-2">
        <div class="flex items-center justify-center h-full">
          <Editor />
        </div>
      </div>
      <div class="p-10 bg-slate-400">
        <Tools />
      </div>
    </div>
  </div>

</template>


<script setup>
import Editor from '@/components/Editor/Core/Editor.vue'
import Tools from '@/components/Editor/Core/Tools.vue'

import { onMounted } from 'vue';


</script>
