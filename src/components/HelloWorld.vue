<script setup>
import { Leafer, Rect, Frame,Ellipse, Box } from 'leafer-editor';
import { onMounted, ref } from 'vue';
import { colors, exportImg } from './util';
import bg from '../assets/bg.png'

const canvasRef = ref(null)
const editor = {
  width:600,
  height:600
}

const box = ref(null)
const ellipse = ref(null)

onMounted(initCanvas)

const config = {
  backgroundColor:"#9ABF80",
  borderColor:"#9ABF80",
  borderWidth:1,
  borderRadius:10,
  width:520,
  height:520,
  cornerRadius:[100,100,100,100]
}

function initCanvas(){

  // const canvas = canvasRef.value
  // const ctx = canvas.getContext('2d')
  // const size = 10 // 每个方块的大小

  // // 绘制棋盘格背景
  // for (let y = 0; y < editor.height; y += size) {
  //   for (let x = 0; x < editor.width; x += size) {
  //     ctx.fillStyle = (x / size % 2 === y / size % 2) ? '#e0e0e0' : '#ffffff'; // 交替颜色
  //     ctx.fillRect(x, y, size, size);
  //   }
  // }


  const leafer = new Leafer({
  view:"canvasEditor"
})

const frame = new Frame({
   width:editor.width,
   height:editor.height,
   fill:{
     type:"image",
     url:bg
   }
})

box.value = new Box({
    x: 40,
    y: 40,
    width: config.width,
    height: config.height,
    fill: config.backgroundColor, // 背景色
    cornerRadius:config.cornerRadius
})

ellipse.value = new Ellipse({
  x: 40,
  y: 40,
  width: 100,
  height: 100,
  fill: "red"
})

leafer.add(frame)
frame.add(box.value)
frame.add(ellipse.value)
}

function changeBgColor(color){
  console.log(box.value)
  box.value.fill = color
}
</script>

<template>

  <div class="layout">
    <div class="logo-material">
      
    </div>
    <div class="preview-area">
      <div class="editor">
        <canvas id="canvasEditor" ref="canvasRef" :width="editor.width" :height="editor.height"></canvas>
      </div>
    </div>
    <div class="tools">
      <p>工具</p>
      <div class="tools-item">
         <p>背景</p>
         <p>颜色</p>
         <div class="bg-color">
           <div @click="changeBgColor(color)" class="color-item" v-for="color in colors" :style="{background:color}"></div>
         </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>