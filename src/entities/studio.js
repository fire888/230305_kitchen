import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


export const createStudio = () => {
    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById( 'webgl-canvas' ),
        antialias: true,
    })
    renderer.setClearColor(0x333333)
    renderer.setPixelRatio( window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const scene = new THREE.Scene()

    const lightA = new THREE.AmbientLight( 0xffffff, 2)
    scene.add( lightA )

    const dirLight = new THREE.DirectionalLight( 0xffffff, 5)
    dirLight.position.set(0, 300, 200)
    dirLight.castShadow = true
    dirLight.shadow.camera.top = 500
    dirLight.shadow.camera.bottom = -500
    dirLight.shadow.camera.left = -500
    dirLight.shadow.camera.right = 500
    dirLight.shadow.camera.near = 0.1
    dirLight.shadow.camera.far = 1000
    scene.add(dirLight)

    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000, 1, 1),
        new THREE.ShadowMaterial( { color: 0x000011, opacity: .3, side: THREE.DoubleSide })
    )

    ground.rotation.x = - Math.PI / 2
    ground.position.y = -1
    ground.receiveShadow = true
    scene.add(ground)


    //const helper = new THREE.CameraHelper(dirLight.shadow.camera)
    //scene.add(helper)


    scene.fog = new THREE.Fog(0x000000, 300, 3000)

    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 10000)
    camera.position.set(100, 200, 200)
    camera.lookAt(50, 20, 0)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(70, 50, 0)
    controls.update();


    const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        if (camera) {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        }
    }
    window.addEventListener('resize', resize)


    let count = 5.3

    return {
        render: () => {
            if (!camera ) {
                return;
            }
            count += 0.001
            dirLight.position.x = Math.sin(count) * 150 - 300
            dirLight.position.z = Math.cos(count) * 150 + 200
            renderer.render(scene, camera)
        },
        addToScene: mesh => {
            scene.add(mesh)
        },
    }
}