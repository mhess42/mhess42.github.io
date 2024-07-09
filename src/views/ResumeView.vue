<template>
    <div class="resume-wrapper">
        <resume-page id="heaven">
            <resume-item title="html" image="assets/images/html.png">
            </resume-item>
            <resume-item title="css" image="assets/images/css.svg">
            </resume-item>
            <resume-item title="javascript" image="assets/images/js.png">
            </resume-item>
            <resume-item title="python" image="assets/images/python.png">
            </resume-item>
            <resume-item title="vue" image="assets/images/vue.png">
            </resume-item>
        </resume-page>
        <resume-page id="alright">
            asdfasdf
        </resume-page>
        <resume-page id="hell">
            asdfasdf
        </resume-page>
    </div>
</template>

<script>
import ResumePage from '@/components/ResumePage.vue';
import ResumeItem from '@/components/ResumeItem.vue'
export default {
    name: 'ResumeView',
    components: {
        ResumePage,
        ResumeItem
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>
* {
    font-family: ubuntu;
}

.resume-wrapper {
    display: flex;
    flex-direction: column;
    padding: 0px;
    margin: 0px;
    position: absolute;
    top: 0px;
    overflow: scroll;
    left: 0px;
    height: 100vh;
    scroll-snap-type: y mandatory;
    scroll-snap-stop: always;
}

#heaven {
    background-color: cornflowerblue;
}

#alright {
    background-color: green;
}

#hell {
    background-color: red;
}
</style>