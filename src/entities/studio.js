import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


export const createStudio = () => {
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById( 'webgl-canvas' ),
        antialias: true,
    })
    renderer.setClearColor(0x000000)
    renderer.setPixelRatio( window.devicePixelRatio)
    renderer.setSize( window.innerWidth, window.innerHeight )

    const scene = new THREE.Scene()

    const lightA = new THREE.AmbientLight( 0x4c1200, 1 )
    lightA.position.set( 5, 5, 5 )
    scene.add( lightA )

    const light = new THREE.PointLight( 0x5b7558, 2, 10000)
    light.position.set( -1000, 100, 200)
    scene.add( light )
    scene.fog = new THREE.Fog(0x000000, 0, 200)

    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 100, 100)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update();


    const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        if (camera) {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        }
    }
    window.addEventListener('resize', resize)


    return {
        light,
        render: () => {
            if (!camera ) {
                return;
            }
            renderer.render(scene, camera)
        },
        setCamera: cam => {
            camera = cam
        },
        addToScene: mesh => {
            scene.add(mesh)
        },
        setBack: back => {
            scene.background = back
        }
    }
}