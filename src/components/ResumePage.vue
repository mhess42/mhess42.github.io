<template>
    <div class="resume-page">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ResumePage'
}
</script>

<style scoped>
.resume-page {
    width: 80vw;
    min-height: calc(100vh - 20vw);
    padding: 10vw;
    margin: 0px;
    scroll-snap-align: start;
    scroll-snap-stop: always;
}
</style>