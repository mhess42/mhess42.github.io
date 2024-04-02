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
            this.$el.style.top = `-${(this.segmentindex - this.index) * 100}vh`
        }
    },
    mounted () {
        this.setBg()
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
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    transition: all .2s ease-in-out;
}
</style>