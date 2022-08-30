<!--
 * @Author: your name
 * @Date: 2021-11-21 23:27:04
 * @LastEditTime: 2021-11-28 23:40:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue3项目练习\my-vue-app\src\components\HelloWorld.vue
-->
/* 
难点有以下几点：

1、鼠标拖拽画正方形和圆形
2、画完一个保存画布,下次再画的时候叠加
3、保存图片

第一点,只需要计算出鼠标点击的点坐标,以及鼠标的当前坐标,就可以计算了,矩形长宽计算: x - beginX, y - beginY,圆形则要利用勾股定理： Math.sqrt((x - beginX) * (x - beginX) + (y - beginY) * (y - beginY))
第二点,则要利用canvas的getImageData和putImageData方法
第三点,思路是将canvas生成图片链接,并赋值给具有下载功能的a标签,并主动点击a标签进行图片下载
 */
<template>  
 <div>
    <div style="margin-bottom: 10px; display: flex; align-items: center; justify-content: center;">
      <el-button @click="methods.changeType('huabi')" type="primary">画笔</el-button>
      <el-button @click="methods.changeType('rect')" type="success">正方形</el-button>
      <el-button
        @click="methods.changeType('arc')"
        type="warning"
        style="margin-right: 10px"
        >圆形</el-button
      >
      <div>颜色：</div>
      <el-color-picker   v-model="data.color"></el-color-picker>
      <el-button @click="methods.clear">清空</el-button>
      <el-button @click="methods.saveImg">保存</el-button>
    </div>
    <canvas
      id="canvas"
      width="800"
      height="400"
      @mousedown="methods.canvasDown"
      @mousemove="methods.canvasMove"
      @mouseout="methods.canvasUp"
      @mouseup="methods.canvasUp"
    >
    </canvas>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
const data = reactive({
  color: "#000",
  canvasDom: null,
  ctx: null,
  type: 'huabi',
  isDraw: false,
  beginX: null,
  beginY: null,
  curX: null,
  curY: null,
  imageData: null,
})

onMounted(() => {
  data.canvasDom = document.getElementById('canvas')
  data.ctx = data.canvasDom.getContext('2d')
})


const methods = {
  changeType(type) {
    data.type = type
    switch (type) {
      case 'huabi':
        console.log('huabi');

        break
      case 'rect':
        break
      case 'arc':
        break
    }
  },
  clear() {
    data.imageData = null
    data.ctx.clearRect(0, 0, 800, 400)
  },
  saveImg() {
    const url = data.canvasDom.toDataURL()
    const a = document.createElement('a')
    a.download = 'board'
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  },
  canvasDown(e) {
    console.log('canvasDown', e);
    data.beginX = e.pageX - data.canvasDom.offsetLeft;
    data.beginY = e.pageY - data.canvasDom.offsetTop;
    data.isDraw = true
  },
  canvasMove(e) {
    if (!data.isDraw) return
    data.curX = e.pageX - data.canvasDom.offsetLeft;
    data.curY = e.pageY - data.canvasDom.offsetTop;
    methods[data.type + 'Fn']()
  },
  canvasUp() {
    data.isDraw = false
    data.imageData = data.ctx.getImageData(0, 0, 800, 400);
  },
  
  huabiFn() {
    data.ctx.beginPath()
    data.ctx.arc(data.curX, data.curY, 5, 0, 2 * Math.PI)
    data.ctx.fillStyle = data.color
    data.ctx.fill()
    data.ctx.closePath()
  },
  rectFn() {
    data.isDraw && data.ctx.clearRect(0, 0, 800, 400)
    data.imageData && data.ctx.putImageData(data.imageData, 0, 0, 0, 0, 800, 400)
    data.ctx.beginPath()
    data.ctx.rect(data.beginX, data.beginY, data.curX - data.beginX, data.curY - data.beginY)
    data.ctx.strokeStyle = data.color
    data.ctx.stroke()
    data.ctx.closePath()
  },
  arcFn() {
    data.isDraw && data.ctx.clearRect(0, 0, 800, 400)
    data.imageData && data.ctx.putImageData(data.imageData, 0, 0, 0, 0, 800, 400)
    data.ctx.beginPath()
    const r = Math.sqrt((data.curX - data.beginX) * (data.curX - data.beginX) + (data.curY - data.beginY) * (data.curY - data.beginY))
    data.ctx.arc(data.beginX, data.beginY, r, 0, 2 * Math.PI)
    data.ctx.strokeStyle = data.color
    data.ctx.stroke()
    data.ctx.closePath()
  },
}

</script>

<style scoped>
#canvas{
  border: 1px solid gray;
}
</style>
