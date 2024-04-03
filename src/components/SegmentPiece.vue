<template>
    <div class="segment-piece" :index="index" :bg="bg"><slot></slot></div>
</template>

<script>
export default {
    name: 'SegmentPiece',
    props: ['bg', 'index', 'segmentindex'],
    methods: {
        setBg () {
            // const bg = this.bg === undefined ? '255, 255, 255' : this.bg
            // this.$el.style.backgroundColor = `rgba(${bg}, .2)`
        },
        handleScroll () {
            this.$el.style.top = `${(this.segmentindex - this.index) * -100}vh`
        }
    },
    mounted () {
        this.setBg()
        this.handleScroll()
    },
    watch: {
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