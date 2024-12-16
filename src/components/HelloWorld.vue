<script setup>
import { Leafer, Rect, Frame, Ellipse, Box } from "leafer-editor";
import { onMounted, reactive, ref, watch } from "vue";
import { colors, exportImg, parseColors } from "./util";
import bg from "../assets/bg.png";
import { ElColorPicker, ElInputNumber, ElPopover, ElButton } from "element-plus";

const reacttiveConfig = reactive({
  color: "#9ABF80",
  strokeWidth: 0,
  stroke: "#ff4500",
  cornerRadius: 100,
  cornerTopLeft: 100,
  cornerTopRight: 100,
  cornerBottomRight: 100,
  cornerBottomLeft: 100
});
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577"
]);
const canvasRef = ref(null);
const editor = {
  width: 600,
  height: 600
};

const box = ref(null);
const ellipse = ref(null);

onMounted(initCanvas);

const config = {
  backgroundColor: "#9ABF80",
  width: 520,
  height: 520,
  cornerRadius: [100, 100, 100, 100],
  strokeWidth: 0,
  stroke: "#ff4500"
};

function initCanvas() {
  const leafer = new Leafer({
    view: "canvasEditor"
  });

  const frame = new Frame({
    width: editor.width,
    height: editor.height,
    fill: {
      type: "image",
      url: bg
    }
  });

  box.value = new Box({
    x: 40,
    y: 40,
    width: config.width,
    height: config.height,
    fill: config.backgroundColor, // 背景色
    cornerRadius: config.cornerRadius,
    stroke: config.stroke,
    strokeWidth: config.strokeWidth
  });


  leafer.add(frame);
  frame.add(box.value);
}

function changeBgColor(color) {
  box.value.fill = parseColors(color);
}

watch(
  () => reacttiveConfig.color,
  newVal => {
    box.value.fill = newVal;
  }
);

watch(
  () => reacttiveConfig.stroke,
  newVal => {
    box.value.stroke = newVal;
  }
);

watch(
  () => reacttiveConfig.strokeWidth,
  newVal => {
    box.value.strokeWidth = newVal;
  }
);

watch(
  () => reacttiveConfig.cornerRadius,
  newVal => {
    reacttiveConfig.cornerTopLeft = newVal;
    reacttiveConfig.cornerTopRight = newVal;
    reacttiveConfig.cornerBottomRight = newVal;
    reacttiveConfig.cornerBottomLeft = newVal;
  }
);

watch(
  () => reacttiveConfig.cornerTopLeft,
  newVal => {
    box.value.cornerRadius = [newVal, reacttiveConfig.cornerTopRight, reacttiveConfig.cornerBottomRight, reacttiveConfig.cornerBottomLeft];
  }
);

watch(
  () => reacttiveConfig.cornerTopRight,
  newVal => {
    box.value.cornerRadius = [reacttiveConfig.cornerTopLeft, newVal, reacttiveConfig.cornerBottomRight, reacttiveConfig.cornerBottomLeft];
  }
);

watch(
  () => reacttiveConfig.cornerBottomRight,
  newVal => {
    box.value.cornerRadius = [reacttiveConfig.cornerTopLeft, reacttiveConfig.cornerTopRight, newVal, reacttiveConfig.cornerBottomLeft];
  }
);

watch(
  () => reacttiveConfig.cornerBottomLeft,
  newVal => {
    box.value.cornerRadius = [reacttiveConfig.cornerTopLeft, reacttiveConfig.cornerTopRight, reacttiveConfig.cornerBottomRight, newVal];
  }
);
</script>

<template>
  <div class="layout">
    <div class="logo-material"></div>
    <div class="preview-area">
      <div class="editor">
        <canvas id="canvasEditor" ref="canvasRef" :width="editor.width" :height="editor.height"></canvas>
      </div>
    </div>
    <div class="tools">
      <p>背景</p>

      <div class="tools-item">
        <p>颜色</p>
        <div class="bg-color" :style="`grid-template-rows: repeat(${colors.length/ 4}, 24px);`">
          <div
            @click="changeBgColor(color)"
            class="color-item"
            v-for="color in colors"
            :style="{background:color}"
          ></div>
        </div>
        <el-color-picker :predefine="predefineColors" v-model="reacttiveConfig.color" />

        <p>描边</p>
        <div class="border">
          <span>宽度</span>
          <el-input-number v-model="reacttiveConfig.strokeWidth" />
          <span>颜色</span>
          <el-color-picker :predefine="predefineColors" v-model="reacttiveConfig.stroke" />
        </div>
        <p>圆角</p>
        <div class="border">
          <el-input-number v-model="reacttiveConfig.cornerRadius"></el-input-number>
          <el-popover placement="bottom-end">
            <template #default>
              <div class="corner-radius">
                 <div class="left-top">
                   <span>左上</span>
                   <el-input-number v-model="reacttiveConfig.cornerTopLeft" :controls="false"  controls-position="right"></el-input-number>
                 </div>
                 <div class="right-top">
                   <span>右上</span>
                  <el-input-number v-model="reacttiveConfig.cornerTopRight" :controls="false"  controls-position="right"></el-input-number>
                </div>
                <div class="left-bottom">
                  <span>左下</span>
                  <el-input-number v-model="reacttiveConfig.cornerBottomLeft" :controls="false" controls-position="right"></el-input-number>
                </div>
                <div class="right-bottom">
                  <span>右下</span>
                  <el-input-number v-model="reacttiveConfig.cornerBottomRight"  :controls="false" controls-position="right"></el-input-number>
                </div>
             
              </div>
            </template>
            <template #reference>
              <el-button class="m-2">自定义</el-button>
            </template>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>