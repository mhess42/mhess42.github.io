<template>
    <div id="home-wrapper">
        <div class="leader-point" id="leader-1"></div>
        <div class="leader-point" id="leader-2"></div>
        <div class="leader-point" id="leader-3"></div>
        <div class="leader-point" id="leader-4"></div>
        <div class="leader-point" id="leader-5"></div>
        <div id="head-wrapper">
            madeline hess
        </div>
    </div>
</template>

<script>
import LeaderLine from 'leader-line-new'
// import CardPiece from '@/components/CardPiece.vue';
export default {
    name: 'HomeView',
    components: {
        // CardPiece
    },
    data () {
        return {

        }
    },
    methods: {
        hideLine (line, index, duration) {
            // const lineEl = document.querySelectorAll('.leader-line')[index]
            const len = document.querySelectorAll(`.leader-line > defs > path:nth-of-type(1)`)[index].getTotalLength()
            const el = document.querySelectorAll(`.leader-line > g > use:nth-of-type(1)`)[index]
            el.style.transitionDuration = `${duration}ms`
            el.style.transitionProperty = 'none'
            el.style.strokeDasharray = `${len}px, ${len}px`;
            el.style.strokeDashoffset = '0';

            setTimeout(() => {
                el.style.transitionProperty = 'stroke-dashoffset';
                el.style.strokeDashoffset = `-${len}px`;

                setTimeout(() => {
                    line.hide('none');
                    el.style.transitionProperty = 'none';
                    el.style.strokeDasharray = 'none';
                }, duration)
            }, 1)
        }
    },
    mounted () {
        const settings = {
            'startPlug': 'behind',
            'endPlug': 'behind',
            'path': 'magnet',
            'color': 'white',
            'hide': true
        }

        const line1 = new LeaderLine(
            document.getElementById('leader-1'),
            document.getElementById('leader-2'),
            {
                ...settings,
                'startSocketGravity': [0, 220],
                'endSocketGravity': [0, 0],
            }
        )
        line1.id = 'line-1'

        const line2 = new LeaderLine(
            document.getElementById('leader-2'),
            document.getElementById('leader-3'),
            {
                ...settings
            }
        )
        line2.id = 'line-2'

        const line3 = new LeaderLine(
            document.getElementById('leader-3'),
            document.getElementById('leader-4'),
            {
                ...settings
            }
        )
        

        const line4 = new LeaderLine(
            document.getElementById('leader-4'),
            document.getElementById('leader-5'),
            {
                ...settings,
                'startSocketGravity': [0, 160],
                'endPlug': 'disc',
                'endPlugSize': .1,
                'startPlug': 'disc',
                'startPlugSize': .1
            }
        )

        line1.show('draw', {duration: 500, timing: 'linear'})
        setTimeout(() => {
            this.hideLine(line1, '0', 500)
            line2.show('draw', {duration: 500, timing: 'linear'})
            setTimeout(() => {
                this.hideLine(line2, '1', 500)
                line3.show('draw', {duration: 500, timing: 'linear'})
                setTimeout(() => {
                    this.hideLine(line3, '2', 500)
                    line4.show('draw', {duration: 500, timing: 'linear'})
                }, 500)
            }, 500)
        }, 500)
    }
}
</script>

<style scoped>
* {
    font-family: ubuntu;
}

/** animations */

@keyframes head-intro {
    0%, 50% {
        opacity: 0;
        margin-top: -20vh;
    }
    100% {
        opacity: 1;
        margin-top: 0px;
    }
}

/** home stylings */

#home-wrapper {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: black;
}

#head-wrapper {
    font-size: 12vw;
    color: white;
    animation: head-intro 1s linear;
}

/** leader line stylings */

.leader-point {
    opacity: 0;
    position: fixed;
    width: 0px;
    height: 0px;
}

#leader-1 {
    top: 0px;
    left: 2px;
}

#leader-2 {
    top: 30%;
    left: 20vw;
}

#leader-3 {
    top: 30%;
    right: 2px;
}

#leader-4 {
    right: 2px;
    bottom: 20vh;
}

#leader-5 {
    bottom: 2px;
    right: 20vh;
}

</style>