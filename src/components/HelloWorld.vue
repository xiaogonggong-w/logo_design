<script setup>
import { Leafer, Rect } from 'leafer-editor';
import { onMounted, ref } from 'vue';

const canvasRef = ref(null)
const editor = {
  width:600,
  height:600
}

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

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  const size = 20 // 每个方块的大小

  // 绘制棋盘格背景
  for (let y = 0; y < editor.height; y += size) {
    for (let x = 0; x < editor.width; x += size) {
      ctx.fillStyle = (x / size % 2 === y / size % 2) ? '#e0e0e0' : '#ffffff'; // 交替颜色
      ctx.fillRect(x, y, size, size);
    }
  }

  const leafer = new Leafer({
  view:"canvasEditor"
})
const rect = new Rect({
    x: 25,
    y: 25,
    width: config.width,
    height: config.height,
    fill: config.backgroundColor, // 背景色
    cornerRadius:config.cornerRadius
})

leafer.add(rect)
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
      <!-- 工具区域 -->
      <p>工具</p>
    </div>
  </div>
</template>

<style scoped>

</style>