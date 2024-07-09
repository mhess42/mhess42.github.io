<template>
    <div :class="{'resume-item': true, 'expanded': expanded, 'unexpanding': unexpanding}">
        <div class="close-button" v-if="expanded" @click="unexpand()">
            <font-awesome-icon id="timeline-icon" :icon="['fas', 'xmark']" />
        </div>
        <div class="button-wrapper" @click="expand()">
            <img class="resume-item-image" :src="image" />
            <h3>{{ title }}</h3>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
    name: 'ResumeItem',
    components: {
        FontAwesomeIcon
    },
    props: ['image', 'title'],
    data () {
        return {
            expanded: false,
            unexpanding: false,
            inlineTop: 0
        }
    },
    methods: {
        expand () {
            this.expanded = true;
            this.inlineTop = this.$el.getBoundingClientRect().top;
            console.log(this.inlineTop);
            document.querySelector(':root').style.setProperty('--inline-top', `${this.inlineTop}px`);
        },
        unexpand () {
            this.expanded = false;
            this.unexpanding = true;

            setTimeout(() => {
                const items = document.querySelectorAll('.resume-item');
                items.forEach(item => {
                    item.classList.remove('adjust-up');
                    item.classList.remove('unexpanding');
                    item.classList.remove('adjust-down');
                })

                this.unexpanding = false;
            }, 550);
        }
    }
}
</script>

<style scoped>
:root {
    --inline-top: 0px;
}

.resume-item {
    cursor: pointer;
    background-color: rgba(0, 0, 0, .2);
    padding: 1rem;
    padding-top: .5rem;
    padding-bottom: .5rem;
    width: 10rem;
    height: 4rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    margin-left: 0px;
    transition: all .25s ease-in;
    margin-top: 1rem;
}

.button-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
}

.resume-item-image {
    height: 3rem;
    margin-right: 1rem;
}

@keyframes expand {
    from {
        position: absolute;
        top: var(--inline-top);
    }
    to {
        position: absolute;
        width: 40vw;
        height: calc(100vh - 20vw);
        top: 10vw;
    }
}

.expanded {
    transition: all .25s ease-in;
    margin-left: 40vw;
    animation: expand .75s ease;
    animation-delay: .25s;
    animation-fill-mode: forwards;
    cursor: default;
}

@keyframes unexpand {
    from{
        width: 40vw;
        height: calc(100vh - 20vw);
        top: 10vw;
    }
    to {
        width: 10rem;
        height: 4rem;
        top: var(--inline-top)
    }
}

.unexpanding {
    animation: unexpand .40s ease;
    animation-fill-mode: forwards;
    margin-left: 40vw;
    transition: all .25s ease-in;
    top: 10vw;
    position: absolute;
}

@keyframes adjust-up {
    to {
        margin-top: -5rem;
    }
}

.adjust-up {
    animation: adjust-up .25s ease;
}

@keyframes adjust-down {
    to {
        margin-top: 5rem;
    }
}

.adjust-down {
    animation: adjust-down .25s ease; 
    animation-delay: .25s;
    animation-fill-mode: forwards;
}

.close-button {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: .5rem;
    right: .5rem;
    cursor: pointer;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .2);
    display: flex;
    justify-content: center;
    align-items: center;
}

.close-button:hover {
    transition: all .3s ease;
    background-color: rgba(200, 0, 0, .3);
}
</style>