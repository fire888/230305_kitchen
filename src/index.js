import * as THREE from "three"
import { 
    PARAMS,
    PARAMS_GUI,
    ARR_STATES,
} from './constants/constants_params'
import { ASSETS_TO_LOAD } from './constants/constants_assetsToLoad'
import { createLoadManager } from './helpers/loadManager'
import { lerpObjFromTo } from './helpers/objHelper'
import { createStudio } from './entities/studio'
import { createDoor } from './entities/door'
import { createBox } from './entities/box'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { hideStartScreen } from './ui/hideStartScreen'



const root = {}

const initApp = () => {
    root.studio = createStudio(root)
    root.loadManager = createLoadManager()

    root.loadManager.startLoad(ASSETS_TO_LOAD).then(assets => {
        root.assets = assets

        /** create elements *****************/
        root.materials = [
            new THREE.MeshPhongMaterial({
                color: 0x333333,
                lightMap: assets['wAOMap'],
                lightMapIntensity: .35,
                normalMap: assets['wNormalMap'],
                normalScale: new THREE.Vector2(.2, .2),
                envMap: assets['skyBox'],
                map: assets['wMap'],
                reflectivity: .002,
                shininess: 100,
                specular: 0x333333,
                flatShading: true,
            }),
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
                envMap: assets['skyBox'],
                reflectivity: 1,
                shininess: 50,
                specular: 0xffffff,
                flatShading: true,
            }),
        ]
        root.materialLine = new THREE.LineBasicMaterial({ color: 0x888888 })


        const door = createDoor(root, PARAMS.door)
        door.mesh.receiveShadow = PARAMS_GUI.receiveShadow
        door.mesh.castShadow = true
        root.studio.addToScene(door.mesh)
        door.mesh.rotation.y = PARAMS.door.openAngle
        door.meshGeom.rotation.y = PARAMS.door.openAngle
        door.meshGeom.position.x = -200
        root.studio.addToScene(door.meshGeom)

        const box = createBox(root, PARAMS.door)
        box.mesh.receiveShadow = PARAMS_GUI.receiveShadow
        box.mesh.castShadow = true
        root.studio.addToScene(box.mesh)
        box.meshGeom.position.x = -200
        root.studio.addToScene(box.meshGeom)

        const changeMeshes = () => {
            door.setParams(PARAMS.door)
            door.mesh.rotation.y = PARAMS.door.openAngle
            door.meshGeom.rotation.y = PARAMS.door.openAngle
            box.setParams(PARAMS.door)
        }

        
        /** animate from state to state *******/
        let updaterDoorParams = null
        let currentStateIndex = 0
        const iterateToNext = () => {
            ++currentStateIndex
            if (currentStateIndex === ARR_STATES.length) {
                currentStateIndex = 0
            }
            updaterDoorParams = lerpObjFromTo(
                PARAMS.door,
                ARR_STATES[currentStateIndex].door, 
                data => {
                    for (let key in data) {
                        PARAMS.door[key] = data[key]
                    }
                    changeMeshes()
                },
                iterateToNext,
            )
        }
        iterateToNext()


        /** animate app **********************/
        const animate = () => {
            requestAnimationFrame(animate)
          
            if (PARAMS_GUI.animate) {
                updaterDoorParams && updaterDoorParams.update()
            }
            root.studio.render()
        } 
        animate()


        /** prepare app ui *****************/
        hideStartScreen(root, () => {
            const gui = new GUI()
            gui.add(PARAMS_GUI, 'animate')
            gui.add(PARAMS_GUI, 'receiveShadow').onChange(v =>  {
                box.mesh.receiveShadow = v
                door.mesh.receiveShadow = v
            })
            for (let key in PARAMS.door) {
                gui.add(PARAMS.door, key).min( PARAMS_GUI.door[key].min).max(PARAMS_GUI.door[key].max).onChange(v => {
                    PARAMS.door[key] = v
                    changeMeshes()
                }).listen()
            }
            gui.open()
        })
    })
}


window.addEventListener('load', initApp)
