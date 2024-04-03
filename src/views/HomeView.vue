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
            <div>
                <div>scroll to see more</div>
                <div>vvvvvvvvv</div>
            </div>
        </segment-piece>
        <segment-piece bg="255, 0, 0" index="1" :segmentindex="segmentIndex">
            <div id="calculator-text">
                i started my programming journey in middle school when i found a graphing calculator at a thrift store for $5.
                at the time i was only interested in it because it let me play games in math class, but it served as a good introduction to code and how programs run.
                for the next 7 years i spent most of my time in math and chemistry making games on my calculator.
            </div>
        </segment-piece>
        <segment-piece bg="0, 255, 0" index="2" :segmentindex="segmentIndex">
            <div id="commodore-text">
                noticing my interest in the basic programming language, and being a programmer himself, my dad introduced me to his old commodore 64.
                i mainly just ran old floppy disks he had laying around, but i also followed a good handful of c64 basic tutorials from old magazines.
                it was around this same time my father showed me some of his programming books. i read books about data structures and other boring stuff during off campus sports events.
                at the beginning of high school i even carried a regular expressions reference book in my backpack.
            </div>
        </segment-piece>
    </div>
</template>

<script>
import SegmentPiece from '@/components/SegmentPiece.vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default {
    name: 'HomeView',
    data () {
        return {
            segmentIndex: 0,
            scrollStamp: 0,
            touchYStart: 0,
            touchYEnd: 0,
            mobile: false,
            camera: {
                posSpeed: 15,
                rotSpeed: 1,
                pos: {
                    x: 0,
                    y: 800,
                    z: 1000
                },
                rot: {
                    x: -20,
                    y: 0,
                    z: 0,
                },
                tPos: {
                    x: 0,
                    y: 800,
                    z: 1000
                },
                tRot: {
                    x: -20,
                    y: 0,
                    z: 0
                }
            }
        }
    },
    methods: {
        scrollSegment (e) {
            e.stopPropagation()
            if (e.timeStamp < this.scrollStamp + 1000) return

            if (e.wheelDeltaY < -10) this.handleSegment(1)
            if (e.wheelDeltaY > 10) this.handleSegment(-1)

            this.scrollStamp = e.timeStamp
        },
        handleSegment (dir) {
            this.segmentIndex += dir

            const numSegments = document.querySelectorAll('.segment-piece').length - 1
            if (this.segmentIndex < 0) this.segmentIndex = 0
            if (this.segmentIndex > numSegments) this.segmentIndex = numSegments
        },
        changeBg (curr, old) {
            const oldColor = document.querySelector(`[index="${old}"]`).getAttribute('bg')
            const currColor = document.querySelector(`[index="${curr}"]`).getAttribute('bg');
            console.log(oldColor, currColor);
            document.querySelector('.home-wrapper').style.backgroundColor = `rgba(${currColor}, .2)`
        },
        initBg () {
            const container = document.querySelector('#bg')

            const gltfLoader = new GLTFLoader()
            const scene = new THREE.Scene()

            const camera = new THREE.PerspectiveCamera(50, (window.innerWidth / window.innerHeight), 1, 10000)
            camera.position.z = 2500

            const cameraPerspective = new THREE.PerspectiveCamera(50, (window.innerWidth / window.innerHeight), 150, 1000)
            const cameraPerspectiveHelper = new THREE.CameraHelper(cameraPerspective)

            scene.add(cameraPerspectiveHelper)

            // const cameraRig = new THREE.Group()
            // cameraRig.add(cameraPerspective)
            const cameraRig = cameraPerspective

            scene.add(cameraRig)
            
            const ambientLight = new THREE.AmbientLight(0xFFFFFF)
            scene.add(ambientLight)

            const light = new THREE.DirectionalLight(0x00ff)
            scene.add(light)

            // const mesh = new THREE.Mesh(
			// 	new THREE.SphereGeometry(100, 16, 8),
			// 	new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
			// );
            // scene.add(mesh)

            const floor = new THREE.Mesh(
                new THREE.PlaneGeometry(10000, 10000, 100, 100),
                new THREE.MeshBasicMaterial({color: 0xf90fff, side: THREE.DoubleSide, wireframe: true})
            )
            floor.position.x = 0
            floor.position.y = 0
            floor.position.z = 0
            scene.add(floor)
            floor.lookAt(0, 1, 0)

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

            const renderer = new THREE.WebGLRenderer({antialias: true, gammaOutput: true, alpha: true});
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor( 0xfb97e6, 0);
            container.appendChild(renderer.domElement);

            function animate () {
                requestAnimationFrame(animate)
                render()
            }

            const render = () => {
                cameraPerspective.position.set(this.camera.pos.x, this.camera.pos.y, this.camera.pos.z)
                cameraPerspective.near = .01
                cameraPerspective.far = 5000
                cameraPerspective.updateProjectionMatrix()
                cameraPerspectiveHelper.update()
                cameraPerspectiveHelper.visible = false

                cameraRig.up.set(0, 1, 0)

                cameraRig.rotation.set(
                    this.camera.rot.x * (Math.PI / 180), 
                    this.camera.rot.y * (Math.PI / 180), 
                    this.camera.rot.z * (Math.PI / 180)
                )

                const planes = ['x', 'y', 'z']
                planes.forEach(axis => {
                    const pos = this.camera.pos
                    const tPos = this.camera.tPos
                    const rot = this.camera.rot
                    const tRot = this.camera.tRot
                    if (pos[axis] !== tPos[axis]) {
                        if (pos[axis] > tPos[axis] && pos[axis] - this.camera.posSpeed <= tPos[axis]) {
                            pos[axis] = tPos[axis]
                            return
                        }

                        if (pos[axis] < tPos[axis] && pos[axis] + this.camera.posSpeed >= tPos[axis]) {
                            pos[axis] = tPos[axis]
                            return
                        }

                        if (pos[axis] > tPos[axis]) pos[axis] -= this.camera.posSpeed
                        else pos[axis] += this.camera.posSpeed
                    }
                    if (rot[axis] !== tRot[axis]) {
                        // let worldVector
                        // if (axis === 'x') worldVector = new THREE.Vector3(1, 0, 0)
                        // if (axis === 'y') worldVector = new THREE.Vector3(0, 1, 0)
                        // if (axis === 'z') worldVector = new THREE.Vector3(0, 0, 1)

                        if (rot[axis] > tRot[axis] && rot[axis] - this.camera.rotSpeed <= tRot[axis]) {
                            rot[axis] = tRot[axis]
                            // cameraPerspective.rotateOnWorldAxis(worldVector, (rot[axis] - tRot[axis]) * (Math.PI / 180))
                            return
                        }

                        if (rot[axis] < tRot[axis] && rot[axis] + this.camera.rotSpeed >= tRot[axis]) {
                            rot[axis] = tRot[axis]
                            // cameraPerspective.rotateOnWorldAxis(worldVector, (rot[axis] - tRot[axis]) * (Math.PI / 180))
                            return
                        }


                        if (rot[axis] > tRot[axis]) {
                            rot[axis] -= this.camera.rotSpeed
                            // cameraRig.rotateOnWorldAxis(worldVector, THREE.MathUtils.degToRad(-this.camera.rotSpeed - 1))
                        } else {
                            rot[axis] += this.camera.rotSpeed
                            // cameraRig.rotateOnWorldAxis(worldVector, THREE.MathUtils.degToRad(this.camera.rotSpeed - 1))
                        } 
                    }
                })

                window.addEventListener('resize', () => {
                    cameraPerspective.aspect = window.innerWidth / window.innerHeight
                    cameraPerspective.updateProjectionMatrix()

                    renderer.setSize(window.innerWidth, window.innerHeight)
                })

                renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );
                renderer.render(scene, cameraPerspective)
            }

            animate()
        },
        handleSwipe () {
            if (this.touchYStart > this.touchYEnd) this.handleSegment(1)
            if (this.touchYStart < this.touchYEnd) this.handleSegment(-1)
        }
    },
    components: {
        SegmentPiece
    },
    mounted () {
        this.initBg()
        
        document.addEventListener('touchstart', e => {
            this.touchYStart = e.changedTouches[0].screenY
        })

        document.addEventListener('touchend', e => {
            this.touchYEnd = e.changedTouches[0].screenY
            this.handleSwipe()
        })

        this.mobile = window.innerHeight > window.innerWidth

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
        segmentIndex (curr, old) {
            this.changeBg(curr, old)

            if (curr === 0) {
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
                } else {
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

            if (curr == 1) {
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
                } else {
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

            if (curr == 2) {
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
                } else {
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
    font-size: 14vw;
    /* padding: 2rem; */
}

#title-text {
    padding-top: 5vh;
    padding-bottom: 45vh;
}

#calculator-text, #commodore-text {
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

@media screen and (max-device-width: 420px) {
    #calculator-text, #commodore-text {
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
    }
}
</style>