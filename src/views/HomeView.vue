<template>
    <!-- #region segments -->
    <div class="home-wrapper" @wheel.prevent="scrollSegment">
        <!-- background for three.js to render to -->
        <div id="bg"></div>
        <!-- canvas for monitor screen texture -->
        <canvas id="monitor-canvas" width="1280" height="720"></canvas>
        <!-- shown while models are loading -->
        <transition name="fade">
            <div id="loading-screen" v-if="!loaded">
                <div id="loading-bar-wrapper">
                    <span id="loading-text">loading</span>
                    <div id="loading-bar" :style="`width: ${loadProgress}%`"></div>
                </div>
            </div>
        </transition>
        <transition name="appear">
            <!-- segment component for landing -->
            <segment-piece v-if="segmentIndex === 0" id="title-segment" bg="0, 0, 255" index="0" :segmentindex="segmentIndex">
                <div id="title-header">
                    madeline hess
                </div>
                <div id="title-text" v-if="!mobile">
                    scroll or use arrow keys <br />
                    to navigate timeline
                </div>
                <div id="title-text" v-else>
                    scroll to navigate timeline
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
            </segment-piece>
        </transition>
        <transition name="appear">
            <!-- segment component for calculator -->
            <segment-piece v-if="segmentIndex === 1" bg="255, 0, 0" index="1" :segmentindex="segmentIndex">
                <div class="segment-text" id="calculator-text">
                    i started my programming journey in middle school when i found a graphing calculator at a thrift store for $5.
                    at the time i was only interested in it because it let me play games in math class, but it served as a good introduction to code and how programs run.
                    for the next 7 years i spent most of my time in math and chemistry making games on my calculator.
                </div>
            </segment-piece>
        </transition>
        <transition name="appear">
            <!-- segment component for c64 -->
            <segment-piece v-if="segmentIndex === 2" bg="0, 255, 0" index="2" :segmentindex="segmentIndex">
                <div class="segment-text" id="commodore-text">
                    noticing my interest in the basic programming language, and being a programmer himself, my dad introduced me to his old commodore 64.
                    i mainly just ran old floppy disks he had laying around, but i also followed a good handful of c64 basic tutorials from old magazines.
                    it was around this same time my father showed me some of his programming books. i read books about data structures and other boring stuff during off campus sports events.
                    at the beginning of high school i even carried a regular expressions reference book in my backpack.
                </div>
            </segment-piece>
        </transition>
        <transition name="appear">
            <!-- segment component for bookshelf -->
            <segment-piece v-if="segmentIndex === 3" bg="255, 255, 0" index="3" :segmentindex="segmentIndex">
                <div class="segment-text" id="book-text">
                    palceholder for books
                </div>
            </segment-piece>
        </transition>
        <transition name="appear">
            <!-- segment component for laptop -->
            <segment-piece v-if="segmentIndex === 4" bg="255, 0, 255" index="4" :segmentindex="segmentIndex">
                <div class="segment-text" id="laptop-text">
                    placeholder for laptop
                </div>
            </segment-piece>
        </transition>
        <transition name="appear">
            <!-- segment component for monitor -->
            <segment-piece v-if="segmentIndex === 5" bg="0, 255, 255" index="5" :segmentindex="segmentIndex">
                <div class="segment-text" id="monitor-text">
                    
                </div>
            </segment-piece>
        </transition>
        <transition name="appear">
            <segment-piece v-if="showCredits" bg="0, 255, 255" index="69" :segmentindex="segmentIndex">
                <div class="segment-text" id="credits-text">
                    <div v-for="line in credits.split(`\n`)" :key="line">
                        {{ line }}
                    </div>
                </div>
            </segment-piece>
        </transition>
    </div>
    <!-- #endregion segments -->
</template>

<script>
// import other scripts to run
import Terminal from '@/scripts/Terminal.js'

// imports for sfcs used in this view
import SegmentPiece from '@/components/SegmentPiece.vue'

// imports for libraries used in this view
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ClearPass } from 'three/addons/postprocessing/ClearPass.js';
import Stats from 'three/addons/libs/stats.module.js';

export default {
    name: 'HomeView',
    components: {
        SegmentPiece
    },
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
            // list of objects to outline
            outline: [],
            // whether all models are loaded
            loaded: false,
            // percentage of models loaded
            loadProgress: 0,
            // the terminal object that will be displayed on the monitor
            terminal: null,
            // whether or not to display in vaporwave mode
            vaporwave: false,
            // whether or not to display cc credits
            showCredits: false,
            // the credits for the models
            credits: process.env.VUE_APP_CREDITS,
            // 1 if cheats are enabled, else 0
            sv_cheats: 0,
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
                },
                // values to use when cheats are enabled
                sv_cheats: {
                    // degrees to rotate on world axis
                    rotation: {x: 0, y: 0, z: 0},
                    // rotation speed in degrees
                    rotationSpeed: 2,
                    // position when not focused on monitor
                    position: {x: 0, y: 0, z: 0},
                    // speed
                    positionSpeed: 6
                }
            }
        }
    },
    // #endregion data
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

            // const numSegments = document.querySelectorAll('.segment-piece').length - 1
            const numSegments = 5
            if (this.segmentIndex < 0) this.segmentIndex = 0
            if (this.segmentIndex > numSegments) this.segmentIndex = numSegments
        },
        // changes the background color based on the current segment
        changeBg (curr) {
            let currColor = '0, 0, 0'
            
            if (curr === 0) currColor = '255, 0, 0'
            if (curr === 1) currColor = '0, 255, 0'
            if (curr === 2) currColor = '0, 0, 255'
            if (curr === 3) currColor = '255, 255, 0'
            if (curr === 4) currColor = '0, 255, 255'
            if (curr === 5) currColor = '255, 0, 255'

            
            document.querySelector('.home-wrapper').style.backgroundColor = `rgba(${currColor}, .2)`
        },
        // handles the loading progress of models
        load (amount, total) {
            this.loadProgress = amount / total * 100
        },
        // #region initBg
        // initializes the three.js background
        initBg () {
            // loading manager to track progress of loaded models
            const loadingManager = new THREE.LoadingManager()
            loadingManager.onProgress = (url, loaded, total) => {
                this.load(loaded, total)
            }
            loadingManager.onLoad = () => {
                this.loaded = true
            }

            // glb/gltf model loader
            const gltfLoader = new GLTFLoader(loadingManager)

            // add draco support to loader
            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')
            dracoLoader.setDecoderConfig({type: 'js'})
            gltfLoader.setDRACOLoader(dracoLoader)

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
            this.cameraRig = cameraRig
            
            const ambientLight = new THREE.AmbientLight(0xFFFFFF)
            scene.add(ambientLight)

            const stats = new Stats()

            /**
             * geometry
             */
            // #region geometry

            // load carpet texture and apply to floor plane geometry
            const carpetText = new THREE.TextureLoader().load('assets/textures/carpet-min.jpg')
            const carpetMat = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: carpetText})
            carpetText.wrapS = THREE.RepeatWrapping
            carpetText.wrapT = THREE.RepeatWrapping
            carpetText.repeat.set(45, 45)
            const floor = new THREE.Mesh(
                new THREE.PlaneGeometry(10000, 10000, 100, 100),
                carpetMat
            )
            floor.position.x = 0
            floor.position.y = 0
            floor.position.z = 0
            scene.add(floor)
            floor.lookAt(0, 1, 0)

            // load wood texture and apply to wall plane geometry
            const woodText = new THREE.TextureLoader().load('assets/textures/wood4-min.jpg')
            const wallMat = new THREE.MeshBasicMaterial({map: woodText, side: THREE.DoubleSide})
            woodText.wrapS = THREE.RepeatWrapping
            woodText.wrapT = THREE.RepeatWrapping
            woodText.repeat.set(45, 45)
            const backWall = new THREE.Mesh(
                new THREE.PlaneGeometry(10000, 10000, 100, 100),
                wallMat
            )
            backWall.position.z = -400
            scene.add(backWall)
            backWall.lookAt(0, 0, 1)

            // load canvas texture and apply to monitor plane geometry
            const monitorCanvas = document.getElementById('monitor-canvas')
            const monitorText = new THREE.CanvasTexture(monitorCanvas)
            console.log(monitorText);
            const monitorPlane = new THREE.Mesh(
                new THREE.PlaneGeometry(284, 145, 5, 5),
                new THREE.MeshBasicMaterial({map: monitorText, side: THREE.DoubleSide, wireframe: false})
            )
            monitorPlane.position.set(
                222.5,
                421,
                -102.7
            )
            monitorPlane.rotation.y = -10 * (Math.PI / 180)
            scene.add(monitorPlane)

            // #endregion geometry

            /**
             * models
             */
            
            // #region models
            // loads, positions, and scales desk
            let deskModel
            gltfLoader.load(
                'assets/models/desk-compressed.glb',
                obj => {
                    obj = obj.scene
                    deskModel = obj
                    scene.add(obj)
                    obj.scale.set(75, 75, 75)
                    obj.rotateY(3.14159 / 2)
                    obj.position.set(-45, 0, 50)
                    return deskModel
                },
                xhr => {
                    return xhr
                },
                err => {
                    console.log(err);
                }
            )
            
            // loads, positions, and scales, calculator
            let calculatorModel
            gltfLoader.load(
                'assets/models/calc.glb',
                obj => {
                    obj = obj.scene
                    calculatorModel = obj
                    scene.add(obj)
                    obj.scale.set(5, 5, 5)
                    obj.position.set(315, 310, 25)
                },
                xhr => {
                    return xhr
                },
                err => {
                    console.log(err);
                }
            )

            // loads, positions, and scales c64
            let c64Model
            gltfLoader.load(
                'assets/models/c64-compressed.glb',
                obj => {
                    obj = obj.scene
                    c64Model = obj
                    scene.add(obj)
                    obj.scale.set(50, 50, 50)
                    obj.position.set(-100, 660, 610)
                    obj.rotateZ(0 * (Math.PI / 180))
                    obj.rotateY(10 * (Math.PI / 180))
                    obj.rotateX(-30 * (Math.PI / 180))
                },
                xhr => {
                    return xhr
                },
                err => {
                    console.log(err);
                }
            )

            // loads, positions, and scales c64 monitor
            let c64MonitorModel
            gltfLoader.load(
                'assets/models/c64monitor-compressed.glb',
                obj => {
                    obj = obj.scene
                    c64MonitorModel = obj
                    scene.add(obj)
                    obj.scale.set(400, 400, 400)
                    obj.position.set(-250, 350, -160)
                    obj.rotateZ(0 * (Math.PI / 180))
                    obj.rotateY(10 * (Math.PI / 180))
                },
                xhr => {
                    return xhr
                },
                err => {
                    console.log(err);
                }
            )

            // loads, positions, and scales bookshelf
            let bookshelfModel
            gltfLoader.load(
                'assets/models/bookshelf-compressed.glb',
                obj => {
                    obj = obj.scene
                    bookshelfModel = obj
                    scene.add(obj)
                    obj.scale.set(400, 400, 400)
                    obj.position.set(700, 0, -200)
                    return bookshelfModel
                },
                xhr => {
                    return xhr
                },
                err => {
                    console.log(err);
                }
            )

            // loads, positions, and scales bookshelf
            let booksModel
            gltfLoader.load(
                'assets/models/books.glb',
                obj => {
                    obj = obj.scene
                    booksModel = obj
                    scene.add(obj)
                    obj.scale.set(57, 57, 57)
                    obj.rotation.y = (90 * (Math.PI /180))
                    obj.position.set(860, 480, -200)
                    return booksModel
                },
                xhr => {
                    return xhr
                },
                err => {
                    console.log(err);
                }
            )

            // loads, positions, and scales laptop
            let laptopModel
            gltfLoader.load(
                'assets/models/laptop-compressed.glb',
                obj => {
                    obj = obj.scene
                    laptopModel = obj
                    scene.add(obj)
                    obj.scale.set(100, 100, 100)
                    obj.position.set(20, 280, -90)
                    obj.rotateY(180 * (Math.PI / 180))
                },
                xhr => {
                    return xhr
                },
                err => {
                    console.log(err);
                }
            )

            // loads, positions, and scales monitor
            let monitorModel
            gltfLoader.load(
                'assets/models/monitor.glb',
                obj => {
                    obj = obj.scene
                    monitorModel = obj
                    scene.add(obj)
                    obj.scale.set(.35, .35, .35)
                    obj.position.set(220, 322, -140)
                    obj.rotateY(-100 * (Math.PI / 180))
                },
                xhr => {
                    return xhr
                },
                err => {
                    console.log(err);
                }
            )

            // #endregion models

            // #tag renderer init
            // initializes and sets up renderer
            const renderer = new THREE.WebGLRenderer({alpha: true});
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.autoClear = true

            // initializes and sets of composer for post processing effects
            const composer = new EffectComposer(renderer,  new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {stencilBuffer: true}))
            const clearPass = new ClearPass()
            const pixelPass = new RenderPixelatedPass(3, scene, cameraRig)
            const outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, cameraRig );
            const outPass = new OutputPass()
            
            // outline settings
            outlinePass.edgeStrength = 50

            composer.addPass(clearPass)
            composer.addPass(pixelPass)
            composer.addPass(outlinePass)
            composer.addPass(outPass)


            container.appendChild(renderer.domElement)
            container.appendChild(stats.dom)

            // three.js animate function, just calls render basically
            function animate () {
                requestAnimationFrame(animate)
                stats.update()
                render()
            }

            // #tag render
            // three.js render function, handles each frame
            const render = () => {
                // set camera properties
                cameraPerspective.position.set(this.camera.pos.x, this.camera.pos.y, this.camera.pos.z)
                cameraPerspective.near = .01
                cameraPerspective.far = 5000
                cameraPerspective.updateProjectionMatrix()

                // updates the monitor terminal texture
                monitorText.needsUpdate = true

                // change appearances if in vaporwave mode
                if (this.vaporwave) {
                    carpetMat.setValues({
                        color: 0x0000ff,
                        wireframe: true,
                        map: null
                    })
                    backWall.visible = false
                } else {
                    carpetMat.setValues({
                        color: 0xffffff,
                        wireframe: false,
                        map: carpetText
                    })
                    backWall.visible = true
                }

                // changes stuff if cheats are enabled
                if (this.sv_cheats == 1) {
                    stats.dom.style.opacity = '0.9'
                } else {
                    stats.dom.style.opacity = '0'
                }

                carpetMat.needsUpdate = true
                wallMat.needsUpdate = true

                // #tag model outlines
                // outline models based on segment index
                if (this.segmentIndex === 0) this.outline = []
                if (this.segmentIndex === 1) this.outline = [calculatorModel]
                if (this.segmentIndex === 2) this.outline = [c64Model, c64MonitorModel]
                if (this.segmentIndex === 3) this.outline = [booksModel]
                if (this.segmentIndex === 4) this.outline = [laptopModel]
                if (this.segmentIndex === 5) this.outline = [monitorModel]
                if (this.segmentIndex === 42) this.outline = []

                outlinePass.selectedObjects = this.outline

                // #tag set camera rotation
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

                // position and rotation if cheats are enabled
                if (this.sv_cheats == 1) {
                    if (this.segmentIndex == 5) {
                        // cameraPerspective.position.set(185, 410, 110)
                        cameraPerspective.rotation.set(
                            -3 * (Math.PI / 180),
                            -10 * (Math.PI / 180), 
                            -0.45 * (Math.PI / 180)
                        )
                    } else {
                        cameraPerspective.position.set(
                            this.camera.sv_cheats.position.x,
                            this.camera.sv_cheats.position.y,
                            this.camera.sv_cheats.position.z,
                        )
    
                        const axisX = new THREE.Vector3(1, 0, 0)
                        const axisY = new THREE.Vector3(0, 1, 0)
                        const axisZ = new THREE.Vector3(0, 0, 1)
    
                        cameraRig.rotateOnWorldAxis(axisX, this.camera.sv_cheats.rotation.x * (Math.PI / 180))
                        cameraRig.rotateOnWorldAxis(axisY, this.camera.sv_cheats.rotation.y * (Math.PI / 180))
                        cameraRig.rotateOnWorldAxis(axisZ, this.camera.sv_cheats.rotation.z * (Math.PI / 180))
                    }

                    renderer.clear()
                    composer.render()
                    return
                }

                // #region camera animation
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
                        // #tag position
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
                        // #tag rotation
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

                // #endregion camera animation

                // resize listener to update both camera and renderer aspect ratio
                window.addEventListener('resize', () => {
                    cameraPerspective.aspect = window.innerWidth / window.innerHeight
                    cameraPerspective.updateProjectionMatrix()

                    renderer.setSize(window.innerWidth, window.innerHeight)
                })

                // sets viewport and renders scene
                renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
                composer.setSize(window.innerWidth, window.innerHeight)
                // renderer.render(scene, cameraPerspective)
                renderer.clear()
                composer.render()
            }

            // calls animate for next frame
            animate()
        },
        // #endregion initBg
        // increases or decreases segment index based on vertical touch swipes
        handleSwipe () {
            if (this.touchYStart > this.touchYEnd) this.handleSegment(1)
            if (this.touchYStart < this.touchYEnd) this.handleSegment(-1)
        },
        // #tag terminal callback
        // method that terminal calls for handling things outside it's scope
        termCallback (data) {
            if (data.vaporwave !== undefined) this.vaporwave = data.vaporwave

            if (data.credits) {
                this.showCredits = true
                setTimeout(() => {
                    this.showCredits = false
                }, 5000)
            } 

            if (data.sv_cheats !== undefined) {
                this.sv_cheats = data.sv_cheats
                this.camera.sv_cheats.position = {...this.camera.pos}
            }

            if (data.debug) return eval(`this.${data.debug.join('.')}`);
            if (data.debugset) return eval(
                `this.${data.debugset.slice(0, data.debugset.length - 1).join('.')} = ${data.debugset[data.debugset.length - 1]}`
            )
        }
    },
    // #endregion methods
    // #region mounted
    mounted () {
        // initializes the three.js background
        this.initBg()

        // initialize the terminal that is displayed on the monitor
        this.terminal = new Terminal(
            document.getElementById('monitor-canvas').getContext('2d'),
            1280, 
            720,
            this.termCallback
        )
        this.terminal.init()
        this.terminal.paused = true
        
        // touchstart listener to update vars for tracking touchscreen swipes
        document.addEventListener('touchstart', e => {
            this.touchYStart = e.changedTouches[0].screenY
        })

        // touchend listener to update vars for tracking touchscreen swipes
        document.addEventListener('touchend', e => {
            this.touchYEnd = e.changedTouches[0].screenY
            if (this.sv_cheats == 0) this.handleSwipe()
        })

        // keydown listener for arrow key navigation
        document.addEventListener('keydown', e => {
            if (this.sv_cheats == 0) {
                if (e.key == 'ArrowUp' || e.key == 'ArrowLeft') this.handleSegment(-1)
                if (e.key == 'ArrowDown' || e.key == 'ArrowRight') this.handleSegment(1)
    
                if (e.key == '5') this.segmentIndex = 5
            } else {
                if (e.key == 'Escape' && this.segmentIndex != 42) this.segmentIndex = 42
                else if (e.key == 'Escape' && this.segmentIndex == 42) this.segmentIndex = 5

                if (this.segmentIndex !== 42) return

                if (e.key == 'ArrowUp') this.camera.sv_cheats.rotation.x += this.camera.sv_cheats.rotationSpeed
                if (e.key == 'ArrowDown') this.camera.sv_cheats.rotation.x -= this.camera.sv_cheats.rotationSpeed
                if (e.key == 'ArrowLeft') this.camera.sv_cheats.rotation.y += this.camera.sv_cheats.rotationSpeed
                if (e.key == 'ArrowRight') this.camera.sv_cheats.rotation.y -= this.camera.sv_cheats.rotationSpeed
                if (e.key == 'q') this.camera.sv_cheats.rotation.z += this.camera.sv_cheats.rotationSpeed
                if (e.key == 'e') this.camera.sv_cheats.rotation.z -= this.camera.sv_cheats.rotationSpeed

                if (e.key == 'w') this.camera.sv_cheats.position.z -= this.camera.sv_cheats.positionSpeed
                if (e.key == 's') this.camera.sv_cheats.position.z += this.camera.sv_cheats.positionSpeed
                if (e.key == 'a') this.camera.sv_cheats.position.x -= this.camera.sv_cheats.positionSpeed
                if (e.key == 'd') this.camera.sv_cheats.position.x += this.camera.sv_cheats.positionSpeed
                if (e.key == 'z') this.camera.sv_cheats.position.y -= this.camera.sv_cheats.positionSpeed
                if (e.key == 'x') this.camera.sv_cheats.position.y += this.camera.sv_cheats.positionSpeed
            }
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
    // #endregion mounted
    // #region watch
    watch: {
        // watches and handles for changes on segmentIndex
        segmentIndex (curr) {
            // updates the background color based on new segment
            // disabled for now
            this.changeBg(curr)
            
            // pauses terminal if not focused on it
            this.terminal.paused = curr !== 5

            /**
             * camera positions and rotations based on segment
             */

            // #tag segment 1 (landing)
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

            // #tag segment 2 (calculator)
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
                        z: 70
                    }
                    this.camera.tRot = {
                        x: -90,
                        y: 0,
                        z: 0
                    }
                }
            }

            // #tag segment 3 (c64)
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

            // #tag segment 4 (bookshelf)
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
                        y: 720,
                        z: 300
                    }
                    this.camera.tRot = {
                        x: -40,
                        y: -20,
                        z: -25
                    }
                }
            }

            // #tag segment 5 (laptop)
            // laptop segment
            if (curr == 4) {
                // camera positions and rotations for fifth segment in non mobile view
                if (!this.mobile) {
                    this.camera.tPos = {
                        x: 0,
                        y: 850,
                        z: 120
                    }
                    this.camera.tRot = {
                        x: -50,
                        y: 0,
                        z: 0
                    }
                } 
                // camera positions and rotations for fifth segment in mobile view
                else {
                    this.camera.tPos = {
                        x: -40,
                        y: 1000,
                        z: 300
                    }
                    this.camera.tRot = {
                        x: -40,
                        y: 0,
                        z: 0
                    }
                }
            }

            // #tag segment 6 (monitor)
            // monitor segment
            if (curr == 5) {
                // camera positions and rotations for sixth segment in non mobile view
                if (!this.mobile) {
                    this.camera.tPos = {
                        x: 185,
                        y: 410,
                        z: 110
                    }
                    this.camera.tRot = {
                        x: -3,
                        y: -10,
                        z: -.45
                    }
                } 
                // camera positions and rotations for sixth segment in mobile view
                else {
                    this.camera.tPos = {
                        x: 100,
                        y: 400,
                        z: 450
                    }
                    this.camera.tRot = {
                        x: 0,
                        y: -12.3,
                        z: -.39
                    }
                }
            }

        }
    }
    // #endregion watch
}
</script>

<!-- #region style -->
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

#monitor-canvas {
    opacity: 0;
    position: fixed;
}

#loading-screen {
    width: 100vw;
    height: 100vh;
    background-color: black;
    top: 0px;
    left: 0px;
    position: fixed;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
}

#loading-bar-wrapper {
    width: 60vw;
    height: 5em;
    background-color: black;
    display: flex;
    align-items: center;
    transform-style: preserve-3d;
    position: relative;
}

#loading-bar {
    height: 5em;
    background-color: white;
    padding: 1em;
    margin-left: -1em;
    transform: translateZ(-10px)
}

#loading-text {
    margin: auto;
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 3em;
}

/** loading vue transition */

.fade-leave-active {
    transition: opacity .5s;
}
.fade-leave-to {
    opacity: 0;
}

/** #region segment transitions */
/** segment appear vue transition */

.appear-enter-active, .appear-leave-active {
    transition: all 1s;
}

.appear-enter-from, .appear-leave-to {
    opacity: 0;
}

.appear-enter-from#title-segment, .appear-leave-to#title-segment {
    top: -50vh;
}

.appear-enter-active .segment-text, .appear-leave-active .segment-text {
    transition: all 1s;
}

.appear-enter-from #calculator-text, .appear-leave-to #calculator-text, 
.appear-enter-from #book-text, .appear-leave-to #book-text{
    right: -50vw;
}

.appear-enter-from #commodore-text, .appear-leave-to #commodore-text {
    left: -50vw;
}

.appear-enter-from #laptop-text, .appear-leave-to #laptop-text {
    top: -50vh;
}

/** #endregion segment transitions */

/** first segment / landing view */

#title-segment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
}

#title-header, #title-text {
    color: white;
    text-shadow: 1px 1px 1px black;
}

#title-header {
    font-size: 14vw;
}

#title-text {
    margin-top: -20vh;
    padding-bottom: 45vh;
    font-size: 1.6em;
}

/** #tag segment stylings */
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
    border-radius: 1em;
    border: 5px solid black
}

#calculator-text {
    background-color: rgba(169, 169, 255, 0.8);
    right: 10vh;
}

#commodore-text {
    background-color: rgba(255, 0, 0, .8);
    left: 10vh;
}

#book-text {
    background-color: rgba(0, 255, 0, .8);
    right: 10vh;
    width: calc(30vw - 20vh)
}

#laptop-text {
    background-color: rgba(237, 173, 34, 0.8);
    left: 10vh;
    top: 10vh;
    width: calc(100vw - 40vh);
    height: 25vh
}

#monitor-text {
    background-color: rgba(174, 0, 105, 0);
    width: 70vw;
    height: 71.5vh;
    padding: 0px;
    left: calc(20.2vw - 10vh);
    top: 2.3vh;
    color: white;
    border: 2px solid blue;
    font-family: dogica;
    border-radius: 0px;
    opacity: 0;
}

#credits-text {
    background-color: rgba(82, 241, 14, 0.8);
    color: black;
    left: calc(10vw - 10vh);
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/** #tag mobile stylings */
/** mobile view segment stylings */

@media screen and (max-device-width: 1000px) {
    #title-text {
        margin-top: 65vh
    }

    .segment-text {
        width: calc(90vw - 10px) !important;
        left: 0px;
        padding: 5vw;
        font-size: 1.1em;
        border-radius: 0px;
    }

    #calculator-text {
        height: 55vh;
        top: calc(45vh - 10vw - 10px);
        border-top-left-radius: 1em;
        border-top-right-radius: 1em;
    }

    #commodore-text {
        height: 45vh;
        top: 0px;
        left: 0px;
        border-bottom-left-radius: 1em;
        border-bottom-right-radius: 1em;
    }

    #book-text {
        height: 60vh;
        top: calc(40vh - 10vw - 10px);
        right: 0px;
        border-top-left-radius: 1em;
        border-top-right-radius: 1em;
    }

    #laptop-text {
        height: 55vh;
        top: 0px;
        left: 0px;
        border-bottom-left-radius: 1em;
        border-bottom-right-radius: 1em;
    }

    #monitor-text {
        width: 95vw;
        height: 25vh;
        top: calc(35vh - 10vw);
        padding: 0px;
        font-size: .8em;
    }

    /** #tag mobile transitions */
    /** vue transitions for mobile */

    .appear-enter-from#title-segment, .appear-leave-to#title-segment {
        top: 0px;
    }

    .appear-enter-from #calculator-text, .appear-leave-to #calculator-text, 
    .appear-enter-from #book-text, .appear-leave-to #book-text{
        top: calc(40vh - 10vw - 10px + 50vh);
    }

    .appear-enter-from #commodore-text, .appear-leave-to #commodore-text,
    .appear-enter-from #laptop-text, .appear-leave-to #laptop-text {
        left: 0px;
        top: -50vh;
    }
}
</style>
<!-- #endregion style -->