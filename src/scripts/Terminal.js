class Terminal {
    history = []
    input = ''
    path = '~'
    lineHeight = 50
    cursorVisible = true
    paused = false

    constructor (ctx, width, height, callback, mobile) {
        this.ctx = ctx
        this.ctx.width = width
        this.ctx.height = height
        this.callback = callback
        this.mobile = mobile

        this.addLine('and that leads you up to now')
        if (this.mobile) this.addLine('visit this site on desktop to interact with this terminal')
        else this.addLine(`run 'help' for help`)
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
                this.addLine(`'repo' - open this site's github page in a new tab`)
                this.addLine(`'credits' - view the cc attributions`)
                this.addLine(`'vapor [true/false]' - change in and out of vaporwave mode`)
                this.addLine(`'sv_cheats [0/1]' - if you've read the readme`)
                break
            case 'clear':
                this.history = []
                break
            case 'echo':
                this.addLine(args.join(' '))
                break
            case 'repo':
                window.open('https://www.github.com/mhess42/mhess42.github.io', '_blank')
                this.addLine('opening github repo')
                break
            case 'vapor':
                if (!args[0] || (args[0].toLowerCase() !== 'true' && args[0].toLowerCase() !== 'false')) {
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
            case 'sv_cheats':
                if (!args[0] || !'01'.includes(args[0])) {
                    this.addLine('boolean only accepts 1 or 0')
                    return
                }
                if (args[0] == '1') {
                    this.addLine('enabling cheats')
                    this.addLine('double click or press escape to focus the monitor')
                    this.callback({sv_cheats: 1})
                } else {
                    this.addLine('disabling cheats')
                    this.callback({sv_cheats: 0})
                }
                break
            case 'debug':
                if (!args[0]) return
                this.addLine(this.callback({debug: args}))
                break
            case 'debugset':
                if (args.length < 2) return
                this.addLine(this.callback({debugset: args}))
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