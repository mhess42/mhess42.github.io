<template>
    <div class="card-piece">
        <div class="card-header-wrapper">
            {{ title }}
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardPiece',
    props: ['title']
}
</script>

<style>
.card-piece {
    background-color: white;
    width: 20vw;
    padding: 1vw;
    height: 25vw;
    border-radius: 2em;
    cursor: pointer;
}

.card-header-wrapper {
    font-size: 2em;
}

.card-body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-body img {
    width: 100%;
}
</style>