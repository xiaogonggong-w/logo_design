<script setup>
import { Frame, Box,App, KeyEvent, ChildEvent } from "leafer-editor";
import { onMounted, reactive, ref, watch } from "vue";
import { colors, parseColors, tools, createText, createRect, createSjx,createImage } from "./util";
import bg from "../assets/bg.png";
import { ElColorPicker, ElInputNumber, ElPopover, ElButton, ElSelect, ElOption, ElUpload } from "element-plus";

const reacttiveConfig = reactive({
  color: "#9ABF80",
  strokeWidth: 0,
  stroke: "#ff4500",
  cornerRadius: 100,
  cornerTopLeft: 100,
  cornerTopRight: 100,
  cornerBottomRight: 100,
  cornerBottomLeft: 100,
  textColor:"#2ac40f",
  fontFamily:"Arial",
  fontSize:36,
  fontWeight:400
});

const quality = ref("1");

const fontFamilyOptions = ref([
  {
    label:"Arial",
    value:"Arial"
  },
  {
    label:"Helvetica",
    value:"Helvetica"
  },
  {
    label:"Verdana",
    value:"Verdana"
  },
  {
    label:"Times New Roman",
    value:"Times New Roman"
  },
  {
    label:"Georgia",
    value:"Georgia"
  },
  {
    label:"Palatino",
    value:"Palatino"
  },
  {
    label:"Bookman",
    value:"Bookman"
  },
  {
    label:"Comic Sans MS",
    value:"Comic Sans MS"
  },
  {
    label:"Impact",
    value:"Impact"
  },
  {
    label:"Lucida Sans Unicode",
    value:"Lucida Sans Unicode"
  }
]);

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

const box = {
  value:null
};
const frame = {
  value:null
};

onMounted(initCanvas);

const config = {
  backgroundColor: parseColors(colors[0]),
  width: 520,
  height: 520,
  cornerRadius: [100, 100, 100, 100],
  strokeWidth: 0,
  stroke: "#ff4500"
};


const currentLeafer = {
  value:null
};

function initCanvas() {

  const app = new App({
    view: "canvasEditor",
    editor:{}
  })
  // const leafer = new Leafer({
  //   view: "canvasEditor"
  // });

  frame.value = new Frame({
    width: editor.width,
    height: editor.height,
    fill: {
      type: "image",
      url: bg
    },
    editable: false
  });

  box.value = new Box({
    x: 40,
    y: 40,
    width: config.width,
    height: config.height,
    fill: config.backgroundColor, // 背景色
    cornerRadius: config.cornerRadius,
    stroke: config.stroke,
    strokeWidth: config.strokeWidth,
    editable: true,
  });
  app.tree.add(frame.value);
  frame.value.add(box.value);

  box.value.on("click",(e)=>{
    console.log('click',e);
    currentLeafer.value = e.target;
  })
  //监听键盘事件
  box.value.on(ChildEvent.REMOVE,(e)=>{
    console.log('remove',e);
  })
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

watch(
  () => reacttiveConfig.fontFamily,
  newVal => {
    currentLeafer.value.fontFamily = newVal;
  }
);

watch(
  () => reacttiveConfig.textColor,
  newVal => {
    currentLeafer.value.fill = newVal;
  }
);

watch(
  () => reacttiveConfig.fontSize,
  newVal => {
    currentLeafer.value.fontSize = newVal;
  }
);

watch(
  () => reacttiveConfig.fontWeight,
  newVal => {
    currentLeafer.value.fontWeight = newVal;
  }
);

function changeTool(type) {
  switch(type){
    case "text":
      console.log('执行了');
      
      box.value.add(createText());
      break;
    // case "rect":
    //   box.value.add(createRect());
    //   break;
    // case "sjx":
    //   box.value.add(createSjx());
    //   break;
  }
}

function handleUploadSuccess(file){
  console.log('file',file);
  // 将上传的图片转为base64
  const base64 = URL.createObjectURL(file.file);
  console.log('base64',base64);
  box.value.add(createImage(base64));
}

function download(){
  console.log('download',quality.value);
  box.value.export('logo_design.png',{
    // fill:'#fff',
    quality:quality.value
  })
}

</script>

<template>
  <div class="layout">
    <div class="logo-material">
        <div class="logo-item" v-for="tool in tools" :key="tool.type" @click="changeTool(tool.type)">
          <img :src="tool.icon" alt="" srcset="">
          <span>{{tool.name}}</span>
        </div>
        <!-- 自定义上传素材 -->
        <div class="upload-material">
          <el-upload  :http-request="handleUploadSuccess">
            <el-button type="primary">上传素材</el-button>
          </el-upload>
        </div>
        <div class="down">
          <!-- 画质选择 -->
          <el-select v-model="quality" placeholder="请选择画质">
            <el-option label="1.0x" value="1" />
            <el-option label="2.0x" value="2" />
            <el-option label="3.0x" value="3" />
          </el-select>
          <el-button type="primary" @click="download">下载</el-button>
        </div>
    </div>
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
            :key="color"
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
        <p>文字</p>
        <div class="text">
          <span>颜色</span>
          <el-color-picker :predefine="predefineColors" v-model="reacttiveConfig.textColor" />
          <span>字体</span>
          <el-select v-model="reacttiveConfig.fontFamily" >
            <el-option v-for="item in fontFamilyOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <span>大小</span>
          <el-input-number v-model="reacttiveConfig.fontSize" />
          <span>粗细</span>
          <el-input-number v-model="reacttiveConfig.fontWeight" :step="100" :min="100" :max="900"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>