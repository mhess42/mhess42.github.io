class Terminal {
    history = [`type 'help' for help`]
    input = ''
    path = '~'
    lineHeight = 50
    cursorVisible = true
    paused = false

    constructor (ctx, width, height, callback) {
        this.ctx = ctx
        this.ctx.width = width
        this.ctx.height = height
        this.callback = callback
    }

    init () {
        this.ctx.font = '48px ariel'

        document.addEventListener('keydown', e => {
            this.handleInput(e.key)
        })

        setInterval(() => {
            this.cursorVisible = !this.cursorVisible
            this.blit()
        }, 500)
    }

    handleInput (key) {
        if (this.paused) return

        const keys = 'abcdefghijklmnopqrstuvwxyz1234567890-=`~!@#$%^&*()_+[]{},.<>/?\\| '

        if (key === 'Backspace') this.input = this.input.slice(0, this.input.length - 1)
        if (key === 'Enter') this.handleCommand()
        if (keys.includes(key.toLowerCase())) this.input += key

        this.blit()
    }

    handleCommand () {
        let args = this.input.split(' ')

        this.history.push(`user:${this.path}$  ${this.input}`)
        this.input = ''

        const cmd = args[0]
        args = args.slice(1)

        switch (cmd) {
            case 'help':
                this.addLine('you have used the help command')
                break
            case 'clear':
                this.history = []
                break
            case 'echo':
                this.addLine(args.join(' '))
                break
            case 'vapor':
                if (args[0].toLowerCase() !== 'true' && args[0].toLowerCase() !== 'false') {
                    this.addLine(`vapor only accepts arguments 'true' or 'false'`)
                    return
                }
                if (args[0].toLowerCase() === 'true') {
                    this.addLine('enabling vaporwave mode')
                    this.callback({vaporwave: true})
                } else {
                    this.addLine('disabling vaporwave mode')
                    this.callback({vaporwave: false})
                }
                break
            case 'credits':
                this.callback({credits: true})
                break
            default:
                this.addLine(`command '${cmd}' not recognized`)
        }
    }

    addLine (line) {
        this.history.push(line)
    }

    blit () {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.ctx.width, this.ctx.height)
        this.ctx.fillStyle = 'white'

        const cursor = this.cursorVisible ? '|' : ''
        this.ctx.fillText(
            `user:${this.path}$  ${this.input}${cursor}`,
            this.lineHeight, 
            this.ctx.height - this.lineHeight
        )

        this.history.slice().reverse().forEach((line, i) => {
            this.ctx.fillText(line, this.lineHeight, this.ctx.height - (this.lineHeight * (i + 2)))
        })
    }
}

export default Terminal