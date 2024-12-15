


export function exportImg(canvas){
  const img = canvas.toDataURL('image/png')
  const link = document.createElement('a');
  link.href = img;
  link.download = 'canvas-image.png'; // 下载的文件名
  link.click();
}


export const colors = [
    "linear-gradient(135deg, #87CEFA, #8A2BE2)",  // 天空蓝到紫色
    "linear-gradient(90deg, #FF7E5F, #FF3F81)",   // 热情的橙红渐变
    "linear-gradient(120deg, #2AF598, #009EFD)",  // 绿松石到深蓝
    "linear-gradient(135deg, #FFC1CC, #FFE29F)",  // 柔和的粉到黄
    "linear-gradient(90deg, #FF512F, #F09819)",   // 日出渐变
    "linear-gradient(90deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8B00FF)",  // 彩虹渐变
    "linear-gradient(135deg, #1E3C72, #2A5298, #00A4CC, #F8B500)",  // 海洋蓝绿渐变
    "linear-gradient(180deg, #E0EAF8, #97D9E1, #57C1E8)",  // 轻松的柔和渐变
    "linear-gradient(135deg, #141E30, #243B55)"    // 夜空与晨光
  ];