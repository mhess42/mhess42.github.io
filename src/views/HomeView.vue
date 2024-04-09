<template>
    <!-- #tag home wrapper -->
    <div id="home-wrapper">
        <!-- leader points positioned for leader lines -->
        <div class="leader-point" id="leader-1"></div>
        <div class="leader-point" id="leader-2"></div>
        <div class="leader-point" id="leader-3"></div>
        <div class="leader-point" id="leader-4"></div>
        <div class="leader-point" id="leader-5"></div>

        <!-- page header -->
        <div id="head-wrapper">
            madeline hess
        </div>

        <!-- page body -->
        <div id="body-wrapper">
            <!-- gh card -->
            <div class="card" @click="linkGH()">
                <div class="card-header">check out my github</div>
                <div class="card-body">
                    <img id="gh-img" src="assets/images/github.png" />
                </div>
            </div>

            <!-- timeline card -->
            <div class="card" @click="linkTimeline()">
                <div class="card-header">my code timeline</div>
            </div>

            <!-- filler card for now -->
            <div class="card">
                <div class="card-header">filler card for now</div>
            </div>
        </div>

        <!-- page footer -->
        <div id="foot-wrapper">
            nerd, loser, developer
        </div>
    </div>
</template>

<script>
import LeaderLine from 'leader-line-new'
export default {
    name: 'HomeView',
    components: {

    },
    // #tag data
    data () {
        return {

        }
    },
    // #tag methods
    methods: {
        // hides a provided leader line
        // line: the leader line object
        // index: the index in the order of which the leader line appears
        // duration: the duration in ms
        hideLine (line, index, duration) {
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
        },
        // opens gh in new tab
        linkGH () {
            window.open('https://github.com/mhess42', '_blank')
        },
        // redirects to timeline
        linkTimeline () {
            this.$router.push('/timeline')
        }
    },
    // #tag mounted
    mounted () {
        // settings to apply to each leader line
        const settings = {
            'startPlug': 'behind',
            'endPlug': 'behind',
            'path': 'magnet',
            'color': 'white',
            'hide': true
        }

        // #region leader lines
        // define leader lines
        const line1 = new LeaderLine(
            document.getElementById('leader-1'),
            document.getElementById('leader-2'),
            {
                ...settings,
                'startSocketGravity': [0, 220],
                'endSocketGravity': [0, 0],
            }
        )

        const line2 = new LeaderLine(
            document.getElementById('leader-2'),
            document.getElementById('leader-3'),
            {
                ...settings
            }
        )

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
        // #endregion leader lines

        // animate the showing and hiding of each line
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
                    setTimeout(() => {
                        this.hideLine(line4, '3', 500)
                        setTimeout(() => {
                            // remove lines after all animation is complete
                            // makes animation fluid on home load without page refresh
                            line1.remove()
                            line2.remove()
                            line3.remove()
                            line4.remove()
                        }, 1000)
                    }, 500)
                }, 500)
            }, 500)
        }, 500)
    }
}
</script>

<!-- #region styling -->
<style scoped>
* {
    font-family: ubuntu;
}

/** animations */

@keyframes head-intro {
    0%, 30% {
        opacity: 0;
        top: -20vh;
    }
    50% {
        opacity: 1;
        top: 0px;
    }
}

@keyframes body-intro {
    0%, 80% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes foot-intro {
    0%, 75% {
        opacity: 0;
        right: 0px;
    }
    100% {
        opacity: 1;
        right: 1em;
    }
}

/** #tag page stylings */
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
    animation: head-intro 2s linear;
    width: 100vw;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0px;
    left: 0px;
}

#body-wrapper {
    width: 100vw;
    height: 60vh;
    padding: 5vh;
    position: fixed;
    bottom: 0px;
    left: 0px;
    display: flex;
    justify-content: space-around;
    animation: body-intro 3.5s linear;
}


#foot-wrapper {
    font-size: 3em;
    color: white;
    position: fixed;
    bottom: 1em;
    right: 1em;
    animation: foot-intro 3s linear;
}

/** card stylings */

.card {
    background-color: white;
    border-radius: 1em;
    width: 20vw;
    height: 23vw;
    cursor: pointer;
}

.card-header {
    color: black;
    font-size: 1.6em;
    padding: 1em;
}

.card-body {
    width: calc(100% - .25em);
    height: 70%;
    padding: .5em;
    padding-top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
}
 #gh-img {
    width: 70%;
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
/** #endregion styling */
</style>