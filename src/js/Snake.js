let myCanvas, myCtx

export class Rect {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    draw() {
        myCtx.beginPath()
        myCtx.fillStyle = this.color
        myCtx.strokeStyle = 'gray'
        myCtx.fillRect(this.x, this.y, this.width, this.height)
        myCtx.strokeRect(this.x, this.y, this.width, this.height)
        myCtx.closePath()

    }
}


export class Snake {
    constructor(len, canvas, ctx) {
        myCanvas = canvas
        myCtx = ctx
        this.length = len
        this.head = new Rect(canvas.width / 2, canvas.height / 2, 40, 40, 'red')
        this.direction = 0

        this.body = []
        let x = this.head.x - 40
        let y = this.head.y
        for(let i = 0; i < this.length; i++) {
            this.body[i] = new Rect(x, y, 40, 40, 'yellow')
            x = x - 40
        }
    }
    draw() {
        console.log('head', this.head);
        this.head.draw()
        const newLen = Math.max(this.body.length, this.length)
        for(let i = 0; i < newLen; i++) {
            this.body[i].draw()
        }
    }

    moveSnake(food) {
        let isEat = false
        const rect = new Rect(this.head.x, this.head.y, this.head.width, this.head.height, 'yellow')
        this.body.unshift(rect)

        if (this.head.x == food.x && this.head.y == food.y) {
            isEat = true 
        }

        !isEat && this.body.pop()

        switch(this.direction) {
            case 0:
                this.head.x += this.head.width
                break
            case 1:
                this.head.y += this.head.height
                break
            case 2:
                this.head.x -= this.head.width
                break
            case 3:
                this.head.y -= this.head.height
                break
        }
        
        return isEat
    }

    eatFood() {
        const rect = new Rect(this.head.x, this.head.y, this.head.width, this.head.height, 'yellow')
        this.body.push(rect)
        this.length++
    }
}
