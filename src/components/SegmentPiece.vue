<template>
    <div class="segment-piece"><slot></slot></div>
</template>

<script>
export default {
    name: 'SegmentPiece',
    props: ['bg'],
    methods: {
        setBg () {
            const bg = this.bg === undefined ? '255, 255, 255' : this.bg
            this.$el.style.backgroundColor = `rgba(${bg}, .2)`
        }
    },
    mounted () {
        this.setBg()
    }
}
</script>

<style scoped>
.segment-piece {
    width: 100%;
    height: 100%;
}
</style>