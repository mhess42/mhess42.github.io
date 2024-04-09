<template>
    <div id="home-wrapper">
        <div class="leader-point" id="leader-1"></div>
        <div class="leader-point" id="leader-2"></div>
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

    },
    mounted () {
        new LeaderLine(
            document.getElementById('leader-1'),
            document.getElementById('leader-2')
        )
    }
}
</script>

<style scoped>
* {
    font-family: ubuntu;
}

#home-wrapper {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: black;
}

.leader-point {
    opacity: 0;
    position: fixed;
    width: 0px;
    height: 0px;
}

#leader-1 {
    top: 0px;
    left: 0px;
}

#leader-2 {
    top: 50%;
    left: 20vw;
}

</style>