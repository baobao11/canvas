<template>
  <div>
    <canvas
      id="canvas"
      width="800"
      height="400"
    >
    </canvas>
  </div>
</template>
<script setup>
  import { onMounted, reactive } from '@vue/runtime-core'
  import { Rect, Snake } from '../js/Snake'
  const data = reactive({
    canvasDom: null,
    ctx: null,
    snake: null,
    food: null,
  })
  onMounted(() => {
    data.canvasDom = document.getElementById('canvas')
    data.ctx = canvas.getContext('2d')
    data.snake = new Snake(4, data.canvasDom, data.ctx)
    data.snake.draw()

    data.food = methods.randomFood()
    data.food.draw()

    methods.init()
  })

  const methods = {
    init: () => {
      window.addEventListener('keydown', event => {
        switch (event.key) {
          case ('ArrowUp'):
            data.snake.direction = 3
            break
          case ('ArrowDown'):
            data.snake.direction = 1
            break
          case ('ArrowRight'): 
            data.snake.direction = 0
            break
          case ('ArrowLeft'):
            data.snake.direction = 2
            break
        }
        const isEat = data.snake.moveSnake(data.food)
        isEat && (data.food = methods.randomFood())
        data.ctx.clearRect(0, 0, 800, 400)

        
        data.food.draw()
        data.snake.draw()
      })
    },

    randomFood: () => {
      let isInSnake = true, rect
      while (isInSnake) {
        const x = Math.round(Math.random() * (canvas.width - 40) / 40) * 40
        const y = Math.round(Math.random() * (canvas.height - 40) / 40) * 40

        console.log(x, y);
        if ((data.snake.head.x == x && data.snake.head.y == y) || data.snake.body.some(item => item.x == x && item.y == y)) {
          isInSnake = true
        } else {
          rect = new Rect(x, y, 40, 40, 'blue')
          isInSnake = false
        }
      }
      return rect
    }
  }
</script>
<style scoped>
#canvas{
  border: 1px solid gray;
}
</style>