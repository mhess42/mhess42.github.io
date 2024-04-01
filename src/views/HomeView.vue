<template>
    <div class="home-wrapper">
        <segment-piece bg="0, 0, 255">
            <div id="title-header">
                madeline hess
            </div>
            <div>
                some description will go here or something
            </div>
        </segment-piece>
    </div>
</template>

<script>
import SegmentPiece from '@/components/SegmentPiece.vue'

export default {
    name: 'HomeView',
    data () {
        return {
            segmentIndex: 0
        }
    },
    components: {
        SegmentPiece
    }
}
</script>

<style scoped>
.home-wrapper {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    font-family: ubuntu;
}

#title-header {
    font-size: 4rem;
    padding: 4rem;
}
</style>