export function exportImg(canvas) {
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
  "linear-gradient(135deg, #141E30, #243B55)",    // 夜空与晨光
  "linear-gradient(135deg, #FF5733, #C70039)",  // 橙色到红色
  "linear-gradient(90deg, #33FF57, #3357FF)",   // 绿色到蓝色
  "linear-gradient(180deg, #FFC300, #FF5733)",  // 黄色���橙色
  "linear-gradient(45deg, #DAF7A6, #FFC300)",   // 浅绿色到黄色
  "linear-gradient(270deg, #581845, #900C3F)",  // 深紫色到红色
  "linear-gradient(60deg, #FF6F61, #6F61FF)",   // 粉色到蓝色
  "linear-gradient(120deg, #FF9A00, #FF3F81)",  // 橙色到热情的红色
  "linear-gradient(150deg, #00C6FF, #0072FF)",  // 天蓝色到深蓝色
  "linear-gradient(30deg, #FFB6C1, #FF69B4)",   // 浅粉色到热情的粉色
  "linear-gradient(90deg, #FF4500, #FFD700)",   // 橙红色到金色
  "linear-gradient(135deg, #FF5733, #C70039, #900C3F)",  // 橙色到红色到深红色
  "linear-gradient(90deg, #33FF57, #3357FF, #0056A6)",   // 绿色到蓝色到深蓝色
  "linear-gradient(180deg, #FFC300, #FF5733, #FF9A00)",  // 黄色到橙色到亮橙色
  "linear-gradient(45deg, #DAF7A6, #FFC300, #FF5733)",   // 浅绿色到黄色到橙色
  "linear-gradient(270deg, #581845, #900C3F, #C70039)",  // 深紫色到红色到亮红色
  "linear-gradient(60deg, #FF6F61, #6F61FF, #3F51B5)",   // 粉色到蓝色到深蓝色
  "linear-gradient(120deg, #FF9A00, #FF3F81, #FF007F)",  // 橙色到热情的红色到深红色
  "linear-gradient(150deg, #00C6FF, #0072FF, #0056A6)",  // 天蓝色到深蓝色到更深的蓝色
  "linear-gradient(30deg, #FFB6C1, #FF69B4, #FF1493)",   // 浅粉色到热情的粉色���深粉色
  "linear-gradient(90deg, #FF4500, #FFD700, #FFEA00)",   // 橙红色到金色到亮黄色
  "linear-gradient(120deg, #FF6F61, #FF3F81)",  // 粉色到热情的红色
  "linear-gradient(240deg, #00C6FF, #0072FF)",  // 天蓝色到深蓝色
  "linear-gradient(60deg, #FF9A00, #FF3F81, #FF007F)"  // 橙色到热情的红色到深红色
];
export function parseColors(color) {
  const isLinear = color.startsWith("linear-gradient");
  const isRadial = color.startsWith("radial-gradient");

  const angle = isLinear ? angleToFromTo(parseInt(color.match(/linear-gradient\((\d+)deg/)[1], 10)) : angleToFromTo(parseInt(color.match(/radial-gradient\((\d+)deg/)[1], 10));

  return {
    type: isLinear ? 'linear' : isRadial ? 'radial' : 'unknown',
    from: isLinear ? angle.from : null,
    to: isLinear ? angle.to : null,
    stops: color.match(/#[0-9A-Fa-f]{6}/g)
  };
}


function angleToFromTo(angle) {
  // Normalize angle to ensure it's between 0 and 360
  const normalizedAngle = ((angle % 360) + 360) % 360;

  // Map angle ranges to directions
  if (normalizedAngle === 0 || normalizedAngle === 360) {
    return { from: "bottom", to: "top" };
  } else if (normalizedAngle === 90) {
    return { from: "left", to: "right" };
  } else if (normalizedAngle === 180) {
    return { from: "top", to: "bottom" };
  } else if (normalizedAngle === 270) {
    return { from: "right", to: "left" };
  }

  // Handle diagonal and intermediate angles
  const directions = [
    { range: [0, 90], from: "bottom", to: "top-right" },
    { range: [90, 180], from: "left", to: "bottom-right" },
    { range: [180, 270], from: "top", to: "bottom-left" },
    { range: [270, 360], from: "right", to: "top-left" },
  ];

  for (const { range, from, to } of directions) {
    if (normalizedAngle > range[0] && normalizedAngle <= range[1]) {
      return { from, to };
    }
  }

  // Fallback in case of an invalid angle
  return { from: "center", to: "center" };
}
