<template>
    <div class="home-wrapper" @wheel.prevent="scrollSegment">
        <div id="bg"></div>
        <segment-piece id="title-segment" bg="0, 0, 255" index="0" :segmentindex="segmentIndex">
            <div id="title-header">
                madeline hess
            </div>
            <div id="title-text">
                some description will go here or something
            </div>
            <div id="title-text">
                <div>scroll to see more</div>
                <div>vvvvvvvvv</div>
            </div>
        </segment-piece>
        <segment-piece bg="255, 0, 0" index="1">

        </segment-piece>
    </div>
</template>

<script>
import SegmentPiece from '@/components/SegmentPiece.vue'
// @ts-ignore
import * as THREE from 'three'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export default {
    name: 'HomeView',
    data () {
        return {
            segmentIndex: 0,
            scrollStamp: 0,
        }
    },
    methods: {
        scrollSegment (e) {
            e.stopPropagation()
            if (e.timeStamp < this.scrollStamp + 1000) return

            if (e.wheelDeltaY < -10) this.segmentIndex++
            if (e.wheelDeltaY > 10) this.segmentIndex--

            const numSegments = document.querySelectorAll('.segment-piece').length - 1
            if (this.segmentIndex < 0) this.segmentIndex = 0
            if (this.segmentIndex > numSegments) this.segmentIndex = numSegments

            this.scrollStamp = e.timeStamp
        },
        changeBg (curr, old) {
            const oldColor = document.querySelector(`[index="${old}"]`).getAttribute('bg')
            const currColor = document.querySelector(`[index="${curr}"]`).getAttribute('bg');
            console.log(oldColor, currColor);
            document.querySelector('.home-wrapper').style.backgroundColor = `rgba(${currColor}, .2)`
        },
        initBg () {
            const container = document.querySelector('#bg')

            const scene = new THREE.Scene()

            const camera = new THREE.PerspectiveCamera(50, (window.innerWidth / window.innerHeight), 1, 10000)
            camera.position.z = 2500

            const cameraPerspective = new THREE.PerspectiveCamera(50, (window.innerWidth / window.innerHeight), 150, 1000)
            const cameraPerspectiveHelper = new THREE.CameraHelper(cameraPerspective)

            scene.add(cameraPerspectiveHelper)

            const cameraRig = new THREE.Group()
            cameraRig.add(cameraPerspective)

            scene.add(cameraRig)
            
            const ambientLight = new THREE.AmbientLight(0x00FFFF)
            scene.add(ambientLight)

            const light = new THREE.DirectionalLight(0x00ff, 4.4)
            scene.add(light)

            const mesh = new THREE.Mesh(
				new THREE.SphereGeometry(100, 16, 8),
				new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
			);
            scene.add(mesh)

            const renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor( 0xfb97e6, 0);
            container.appendChild(renderer.domElement);

            function animate () {
                requestAnimationFrame(animate)
                render()
            }

            function render () {
                mesh.position.z = 700
                mesh.position.x = 700
                mesh.position.y = 700
                
                cameraPerspective.far = mesh.position.length();
                cameraPerspective.updateProjectionMatrix()
                cameraPerspectiveHelper.update()
                cameraPerspectiveHelper.visible = false
                
                cameraRig.lookAt(mesh.position)
                cameraRig.rotateX(3.14159)

                renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );
                renderer.render(scene, cameraPerspective)
            }

            animate()
        }
    },
    components: {
        SegmentPiece
    },
    mounted () {
        this.initBg()
    },
    watch: {
        segmentIndex (old, curr) {
            this.changeBg(old, curr)
        }
    }
}
</script>

<style scoped>
.home-wrapper {
    position: fixed;
    z-index: 2;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    font-family: ubuntu;
    transition: all .2s ease-in-out;
    background-color: rgba(0, 0, 255, .2);
}

#bg {
    z-index: -100;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
}

#title-segment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
}

#title-header {
    font-size: 4rem;
    /* padding: 2rem; */
}

#title-text {
    padding-top: 5vh;
    padding-bottom: 5vh;
}
</style>