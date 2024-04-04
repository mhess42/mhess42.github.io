<template>
    <div class="home-wrapper" @wheel.prevent="scrollSegment">
        <!-- background for three.js to render to -->
        <div id="bg"></div>
        <!-- segment component for landing -->
        <segment-piece id="title-segment" bg="0, 0, 255" index="0" :segmentindex="segmentIndex">
            <div id="title-header">
                madeline hess
            </div>
            <div id="title-text">
                some description will go here or something
            </div>
            <div>
                <div>scroll to see more</div>
                <div>vvvvvvvvv</div>
            </div>
        </segment-piece>
        <!-- segment component for calculator -->
        <segment-piece bg="255, 0, 0" index="1" :segmentindex="segmentIndex">
            <div class="segment-text" id="calculator-text">
                i started my programming journey in middle school when i found a graphing calculator at a thrift store for $5.
                at the time i was only interested in it because it let me play games in math class, but it served as a good introduction to code and how programs run.
                for the next 7 years i spent most of my time in math and chemistry making games on my calculator.
            </div>
        </segment-piece>
        <!-- segment component for c64 -->
        <segment-piece bg="0, 255, 0" index="2" :segmentindex="segmentIndex">
            <div class="segment-text" id="commodore-text">
                noticing my interest in the basic programming language, and being a programmer himself, my dad introduced me to his old commodore 64.
                i mainly just ran old floppy disks he had laying around, but i also followed a good handful of c64 basic tutorials from old magazines.
                it was around this same time my father showed me some of his programming books. i read books about data structures and other boring stuff during off campus sports events.
                at the beginning of high school i even carried a regular expressions reference book in my backpack.
            </div>
        </segment-piece>
        <!-- segment component for bookshelf -->
        <segment-piece bg="255, 255, 0" index="3" :segmentindex="segmentIndex">
            <div class="segment-text" id="book-text">
                palceholder for books
            </div>
        </segment-piece>
        <!-- segment component for laptop -->
        <segment-piece bg="255, 0, 255" index="4" :segmentindex="segmentIndex">
            <div class="segment-text" id="laptop-text">
                placeholder for laptop
            </div>
        </segment-piece>
        <!-- segment component for monitor -->
        <segment-piece bg="0, 255, 255" index="5" :segmentindex="segmentIndex">
            <div class="segment-text" id="monitor text">
                placehilder for monitor
            </div>
        </segment-piece>
    </div>
</template>

<script>
// imports for sfcs used in this view
import SegmentPiece from '@/components/SegmentPiece.vue'

// imports for libraries used in this view
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default {
    name: 'HomeView',
    // #region data
    data () {
        return {
            // the current segment the user is on
            segmentIndex: 0,
            // time stamp of last scroll event handled
            scrollStamp: 0,
            // starting y value of handled touch
            touchYStart: 0,
            // ending y value of handled touch
            touchYEnd: 0,
            // whether or not mobile view is active
            mobile: false,
            // #tag camera init
            // data for three.js camera
            camera: {
                // speed at which camera moves/changes positions
                posSpeed: 15,
                // speed at which camera rotates
                rotSpeed: 1,
                // current camera position (initialized for non mobile view)
                pos: {
                    x: 0,
                    y: 800,
                    z: 1000
                },
                // current camera rotation (initialized for non mobile view)
                rot: {
                    x: -20,
                    y: 0,
                    z: 0,
                },
                // target position for animation of camera movement
                // initialized same as initial position so camera is static on start
                tPos: {
                    x: 0,
                    y: 800,
                    z: 1000
                },
                // target rotation for animation of camera rotation
                // initialized same as initial rotation so camera is static on start
                tRot: {
                    x: -20,
                    y: 0,
                    z: 0
                }
            }
        }
    },
    // #endregion
    // #region methods
    methods: {
        // called by wheel event, detects page scroll
        scrollSegment (e) {
            e.stopPropagation()
            if (e.timeStamp < this.scrollStamp + 1000) return

            if (e.wheelDeltaY < -10) this.handleSegment(1)
            if (e.wheelDeltaY > 10) this.handleSegment(-1)

            this.scrollStamp = e.timeStamp
        },
        // handles moving to the next or previous segment
        handleSegment (dir) {
            this.segmentIndex += dir

            const numSegments = document.querySelectorAll('.segment-piece').length - 1
            if (this.segmentIndex < 0) this.segmentIndex = 0
            if (this.segmentIndex > numSegments) this.segmentIndex = numSegments
        },
        // changes the background color based on the current segment
        changeBg (curr, old) {
            const oldColor = document.querySelector(`[index="${old}"]`).getAttribute('bg')
            const currColor = document.querySelector(`[index="${curr}"]`).getAttribute('bg');
            console.log(oldColor, currColor);
            document.querySelector('.home-wrapper').style.backgroundColor = `rgba(${currColor}, .2)`
        },
        // initializes the three.js background
        initBg () {
            // glb/gltf model loader
            const gltfLoader = new GLTFLoader()

            // dom element to render to 
            const container = document.querySelector('#bg')

            /**
             * scene and camera setup
             */

            const scene = new THREE.Scene()

            const cameraPerspective = new THREE.PerspectiveCamera(50, (window.innerWidth / window.innerHeight), 150, 1000)
            const cameraPerspectiveHelper = new THREE.CameraHelper(cameraPerspective)

            scene.add(cameraPerspectiveHelper)

            // cameraRig originally had more elements, though now only the perspective camer is needed
            // and i am too lazy to refactor right now
            const cameraRig = cameraPerspective

            scene.add(cameraRig)
            
            const ambientLight = new THREE.AmbientLight(0xFFFFFF)
            scene.add(ambientLight)

            /**
             * geometry
             */

            // load carpet texture and apply to floor plane geometry
            const carpetText = new THREE.TextureLoader().load('assets/textures/carpet.jpg')
            carpetText.wrapS = THREE.RepeatWrapping
            carpetText.wrapT = THREE.RepeatWrapping
            carpetText.repeat.set(45, 45)
            const floor = new THREE.Mesh(
                new THREE.PlaneGeometry(10000, 10000, 100, 100),
                new THREE.MeshBasicMaterial({side: THREE.DoubleSide, wireframe: false, map: carpetText})
            )
            floor.position.x = 0
            floor.position.y = 0
            floor.position.z = 0
            scene.add(floor)
            floor.lookAt(0, 1, 0)

            // load wood texture and apply to wall plane geometry
            const woodText = new THREE.TextureLoader().load('assets/textures/wood4.jpg')
            woodText.wrapS = THREE.RepeatWrapping
            woodText.wrapT = THREE.RepeatWrapping
            woodText.repeat.set(45, 45)
            const backWall = new THREE.Mesh(
                new THREE.PlaneGeometry(10000, 10000, 100, 100),
                new THREE.MeshBasicMaterial({map: woodText, side: THREE.DoubleSide, wireframe: false})
            )
            backWall.position.z = -400
            scene.add(backWall)
            backWall.lookAt(0, 0, 1)

            /**
             * models
             */

            // loads, positions, and scales desk
            gltfLoader.load(
                'assets/models/desk.glb',
                obj => {
                    obj = obj.scene
                    scene.add(obj)
                    obj.scale.set(75, 75, 75)
                    obj.rotateY(3.14159 / 2)
                    obj.position.set(-45, 0, 50)
                },
                xhr => {
                    console.log(xhr.loaded);
                },
                err => {
                    console.log(err);
                }
            )
            
            // loads, positions, and scales, calculator
            gltfLoader.load(
                'assets/models/calc.glb',
                obj => {
                    obj = obj.scene
                    scene.add(obj)
                    obj.scale.set(5, 5, 5)
                    obj.position.set(315, 310, 25)
                },
                xhr => {
                    console.log(xhr.loaded);
                },
                err => {
                    console.log(err);
                }
            )

            // loads, positions, and scales c64
            gltfLoader.load(
                'assets/models/c64.glb',
                obj => {
                    obj = obj.scene
                    scene.add(obj)
                    obj.scale.set(50, 50, 50)
                    obj.position.set(-100, 660, 610)
                    obj.rotateZ(0 * (Math.PI / 180))
                    obj.rotateY(10 * (Math.PI / 180))
                    obj.rotateX(-30 * (Math.PI / 180))
                },
                xhr => {
                    console.log(xhr.loaded);
                },
                err => {
                    console.log(err);
                }
            )

            // loads, positions, and scales c64 monitor
            gltfLoader.load(
                'assets/models/c64monitor.glb',
                obj => {
                    obj = obj.scene
                    scene.add(obj)
                    obj.scale.set(400, 400, 400)
                    obj.position.set(-250, 350, -160)
                    obj.rotateZ(0 * (Math.PI / 180))
                    obj.rotateY(10 * (Math.PI / 180))
                },
                xhr => {
                    console.log(xhr.loaded);
                },
                err => {
                    console.log(err);
                }
            )

            // loads, positions, and scales bookshelf
            gltfLoader.load(
                'assets/models/bookshelf.glb',
                obj => {
                    obj = obj.scene
                    scene.add(obj)
                    obj.scale.set(400, 400, 400)
                    obj.position.set(700, 0, -200)
                },
                xhr => {
                    console.log(xhr.loaded);
                },
                err => {
                    console.log(err);
                }
            )

            // loads, positions, and scales laptop
            gltfLoader.load(
                'assets/models/laptop.glb',
                obj => {
                    obj = obj.scene
                    scene.add(obj)
                    obj.scale.set(100, 100, 100)
                    obj.position.set(20, 280, -90)
                    obj.rotateY(180 * (Math.PI / 180))
                },
                xhr => {
                    console.log(xhr.loaded);
                },
                err => {
                    console.log(err);
                }
            )

            // loads, positions, and scales monitor
            gltfLoader.load(
                'assets/models/monitor.glb',
                obj => {
                    obj = obj.scene
                    scene.add(obj)
                    obj.scale.set(.35, .35, .35)
                    obj.position.set(220, 322, -140)
                    obj.rotateY(-100 * (Math.PI / 180))
                },
                xhr => {
                    console.log(xhr.loaded);
                },
                err => {
                    console.log(err);
                }
            )

            // initializes and sets up renderer
            const renderer = new THREE.WebGLRenderer({antialias: true, gammaOutput: true, alpha: true});
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor( 0xfb97e6, 0);
            container.appendChild(renderer.domElement);

            // three.js animate function, just calls render basically
            function animate () {
                requestAnimationFrame(animate)
                render()
            }

            // three.js render function, handles each frame
            const render = () => {
                // set camera properties
                cameraPerspective.position.set(this.camera.pos.x, this.camera.pos.y, this.camera.pos.z)
                cameraPerspective.near = .01
                cameraPerspective.far = 5000
                cameraPerspective.updateProjectionMatrix()

                // set camera rotation
                cameraRig.up.set(0, 1, 0)
                cameraRig.rotation.set(
                    this.camera.rot.x * (Math.PI / 180), 
                    this.camera.rot.y * (Math.PI / 180), 
                    this.camera.rot.z * (Math.PI / 180)
                )

                // updates perspective helper, useful for debugging
                cameraPerspectiveHelper.update()
                cameraPerspectiveHelper.visible = false

                // loops through each axis in three dimensions to update camera position and rotation
                // based on target position and rotation
                const planes = ['x', 'y', 'z']
                planes.forEach(axis => {
                    // vars to simplify code
                    // prepended t means target position
                    const pos = this.camera.pos
                    const tPos = this.camera.tPos
                    const rot = this.camera.rot
                    const tRot = this.camera.tRot

                    // checks if the camera has met it's target position
                    if (pos[axis] !== tPos[axis]) {
                        // checks if the next position update will reach or overshoot the target
                        // coming from positive to negative
                        if (pos[axis] > tPos[axis] && pos[axis] - this.camera.posSpeed <= tPos[axis]) {
                            pos[axis] = tPos[axis]
                            return
                        }

                        // checks if the next position update will reach or overshoot the target
                        // coming from negative to positive
                        if (pos[axis] < tPos[axis] && pos[axis] + this.camera.posSpeed >= tPos[axis]) {
                            pos[axis] = tPos[axis]
                            return
                        }

                        // updates camera position by camera speed
                        if (pos[axis] > tPos[axis]) pos[axis] -= this.camera.posSpeed
                        else pos[axis] += this.camera.posSpeed
                    }

                    // checks if the camera has met it's target rotation
                    if (rot[axis] !== tRot[axis]) {
                        // checks if the next rotation update will reach or overshoot the target
                        // coming from positive to negative
                        if (rot[axis] > tRot[axis] && rot[axis] - this.camera.rotSpeed <= tRot[axis]) {
                            rot[axis] = tRot[axis]
                            return
                        }

                        // checks if the next rotation update will reach or overshoot the target
                        // coming from negative to positive
                        if (rot[axis] < tRot[axis] && rot[axis] + this.camera.rotSpeed >= tRot[axis]) {
                            rot[axis] = tRot[axis]
                            return
                        }

                        // updates camera rotation by rotation speed
                        if (rot[axis] > tRot[axis]) {
                            rot[axis] -= this.camera.rotSpeed
                        } else {
                            rot[axis] += this.camera.rotSpeed
                        } 
                    }
                })

                // resize listener to update both camera and renderer aspect ratio
                window.addEventListener('resize', () => {
                    cameraPerspective.aspect = window.innerWidth / window.innerHeight
                    cameraPerspective.updateProjectionMatrix()

                    renderer.setSize(window.innerWidth, window.innerHeight)
                })

                // sets viewport and renders scene
                renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );
                renderer.render(scene, cameraPerspective)
            }

            // calls animate for next frame
            animate()
        },
        // increases or decreases segment index based on vertical touch swipes
        handleSwipe () {
            if (this.touchYStart > this.touchYEnd) this.handleSegment(1)
            if (this.touchYStart < this.touchYEnd) this.handleSegment(-1)
        }
    },
    // #endregion methods
    components: {
        SegmentPiece
    },
    mounted () {
        // initializes the three.js background
        this.initBg()
        
        // touchstart listener to update vars for tracking touchscreen swipes
        document.addEventListener('touchstart', e => {
            this.touchYStart = e.changedTouches[0].screenY
        })

        // touchend listener to update vars for tracking touchscreen swipes
        document.addEventListener('touchend', e => {
            this.touchYEnd = e.changedTouches[0].screenY
            this.handleSwipe()
        })

        // sets mobile view var based on aspect ratio
        // desktops with mobile aspect ratio will be affected
        this.mobile = window.innerHeight > window.innerWidth

        // changes initial camera position and rotation if in mobile view
        if (this.mobile) {
            this.camera.pos = {
                x: 0,
                y: 800,
                z: 1700
            }
            this.camera.tPos = {
                x: 0,
                y: 800,
                z: 1700
            }
        }
    },
    watch: {
        // watches and handles for changes on segmentIndex
        segmentIndex (curr, old) {
            // updates the background color based on new segment
            this.changeBg(curr, old)

            /**
             * camera positions and rotations based on segment
             */

            // landing segment
            if (curr === 0) {
                // camera positions and rotations for first segment in non mobile view
                if (!this.mobile) {
                    this.camera.tPos = {
                        x: 0,
                        y: 800,
                        z: 1000
                    }
                    this.camera.tRot = {
                        x: -20,
                        y: 0,
                        z: 0,
                    }
                } 
                // camera positions and rotations for first segment in mobile view
                else {
                    this.camera.tPos = {
                        x: 0,
                        y: 800,
                        z: 1700
                    }
                    this.camera.tRot = {
                        x: -20,
                        y: 0,
                        z: 0
                    }
                }
            }

            // calculator segment
            if (curr == 1) {
                // camera positions and rotations for second segment in non mobile view
                if (!this.mobile) {
                    this.camera.tPos = {
                        x: 400,
                        y: 480,
                        z: 30
                    }
                    this.camera.tRot = {
                        x: -90,
                        y: 0,
                        z: 0
                    }
                } 
                // camera positions and rotations for second segment in mobile view
                else {
                    this.camera.tPos = {
                        x: 315,
                        y: 480,
                        z: 80
                    }
                    this.camera.tRot = {
                        x: -90,
                        y: 0,
                        z: 0
                    }
                }
            }

            // c64 segment
            if (curr == 2) {
                // camera positions and rotations for third segment in non mobile view
                if (!this.mobile) {
                    this.camera.tPos = {
                        x: -100,
                        y: 700,
                        z: 300
                    }
                    this.camera.tRot = {
                        x: -40,
                        y: 30,
                        z: 20
                    }
                } 
                // camera positions and rotations for third segment in mobile view
                else {
                    this.camera.tPos = {
                        x: -100,
                        y: 550,
                        z: 400
                    }
                    this.camera.tRot = {
                        x: -10,
                        y: 18,
                        z: 0
                    }
                }
            }

            // bookshelf segment
            if (curr == 3) {
                // camera positions and rotations for fourth segment in non mobile view
                if (!this.mobile) {
                    this.camera.tPos = {
                        x: 550,
                        y: 700,
                        z: 300
                    }
                    this.camera.tRot = {
                        x: -10,
                        y: -30,
                        z: -5
                    }
                } 
                // camera positions and rotations for fourth segment in mobile view
                else {
                    this.camera.tPos = {
                        x: 550,
                        y: 900,
                        z: 300
                    }
                    this.camera.tRot = {
                        x: -10,
                        y: -30,
                        z: -5
                    }
                }
            }
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

/** first segment / landing view */

#title-segment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
}

#title-header {
    font-size: 14vw;
}

#title-text {
    padding-top: 5vh;
    padding-bottom: 45vh;
}

/** segment stylings */

.segment-text {
    width: calc(40vw - 20vh);
    height: 60vh;
    position: absolute;
    top: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10vh;
    font-size: 1.4em;
    color: black;
}

#calculator-text {
    background-color: rgba(0, 0, 255, .6);
    right: 10vh;
}

#commodore-text {
    background-color: rgba(255, 0, 0, .6);
    left: 10vh;
}

#book-text {
    background-color: rgba(0, 255, 0, .6);
    right: 10vh;
    width: calc(30vw - 20vh)
}

/** mobile view segment stylings */

@media screen and (max-device-width: 1000px) {
    .segment-text {
        width: 90vw;
        left: 0px;
        padding: 5vw;
        font-size: 1.1em;
    }

    #calculator-text {
        height: 60vh;
        top: calc(40vh - 10vw);
    }

    #commodore-text {
        height: 50vh;
        top: 0px;
        left: 0px;
    }

    #book-text {
        height: 60vh;
        top: 0px;
        right: 0px;
    }
}
</style>