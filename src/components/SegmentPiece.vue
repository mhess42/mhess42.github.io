<template>
    <!-- bind index and bg as attrs so they can be accessed by views using this component -->
    <div class="segment-piece" :index="index" :bg="bg"><slot></slot></div>
</template>

<script>
export default {
    name: 'SegmentPiece',
    // bg: expected to be "{r}, {g}, {b}". the background color of the segment
    // index: expected to be integer. this segment's static index
    // segmentindex: expected to be integer. the index of the segment the user is currently viewing
    props: ['bg', 'index', 'segmentindex'],
    methods: {
        // sets the background color of the component
        setBg () {
            const bg = this.bg === undefined ? '255, 255, 255' : this.bg
            this.$el.style.backgroundColor = `rgba(${bg}, .2)`
        },
        // changes this segment's top property to scroll up or down based on the current segment being viewed
        handleScroll () {
            this.$el.style.top = `${(this.segmentindex - this.index) * -100}vh`
        }
    },
    mounted () {
        // not setting bg anymore because of three.js background, may delete function all together later
        // this.setBg()

        // scrolls this segment to the position it should be upon mounting
        this.handleScroll()
    },
    watch: {
        // watches for change in segmentindex prop to scroll accordingly
        segmentindex () {
            this.handleScroll()
        }
    }
}
</script>

<style scoped>
.segment-piece {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    transition: all 1s ease-in-out;
}
</style>