<template>
    <div class="resume-item" @click="expanded = !expanded">
        <img class="resume-item-image" :src="image" />
        <slot></slot>
        <div :class="{'resume-item-content': true, 'expanded': expanded}">

        </div>
    </div>
</template>

<script>
export default {
    name: 'ResumeItem',
    props: ['image'],
    data() {
        return {
            expanded: false
        }
    }
}
</script>

<style scoped>
.resume-item {
    cursor: pointer;
    background-color: rgba(0, 0, 0, .2);
    padding: 1rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    width: fit-content;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.resume-item-image {
    height: 3rem;
    margin-right: 1rem;
}
</style>