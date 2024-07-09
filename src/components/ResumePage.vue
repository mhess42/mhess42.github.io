<template>
    <div class="resume-page" @click="adjustContents()">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ResumePage',
    methods: {
        adjustContents () {
            const items = document.querySelectorAll('.resume-item');
            let index = -1;
            let expanding = true;

            items.forEach((item, i) => {
                item.classList.remove('adjust-up');
                item.classList.remove('adjust-down');
                if (item.classList.contains('expanded')) index = i + 1;
                if (item.classList.contains('unexpanding')) {
                    index = i + 1;
                    expanding = false;
                }
            });

            if (index == -1 || index > items.length - 1) return;

            if (expanding) items[index].classList.add('adjust-up');
            else items[index].classList.add('adjust-down');
        }
    }
}
</script>

<style scoped>
.resume-page {
    width: 84vw;
    min-height: calc(100vh - 16vw);
    padding: 8vw;
    margin: 0px;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    transition: all .25s ease;
}
</style>