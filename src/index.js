import { checkDevice } from './utils/checkDevice'
import { hideStartScreen } from './ui/hideStartScreen'
import { createStudio } from './entities/studio'
//import { createKeyBoard } from './utils/createKeyBoard'
import { createLoadManager } from './helpers/loadManager'
//import { createPlayer } from './entities/player'
import { startFrameUpdater  } from './utils/createFrameUpater'
import { ASSETS_TO_LOAD } from './constants/constants_assetsToLoad'
//import { createCyberTruck } from  './systems/cyberTruck'
//import { createTown } from './systems/town'
import { createDoor } from './entities/door'


const root = {
    appData: {}
}


const initApp = () => {
    root.device = checkDevice()
    root.studio = createStudio(root)
    //root.keyboard = createKeyBoard(root)
    root.loadManager = createLoadManager()

    root.loadManager.startLoad(ASSETS_TO_LOAD).then(assets => {
        root.studio.setBack(assets.skyBox)
        root.assets = assets

        root.studio.render()
        //root.town = createTown(root)
        //root.cyberTruck = createCyberTruck(root)
        //root.player = createPlayer(root)
        //root.studio.setCamera(root.player.getCamera())
        //root.cyberTruck.setPlayerToCollisions(root.player.getCollisionMesh())

        const door = createDoor(root)

        root.frameUpdater = startFrameUpdater(root)
        root.frameUpdater.on(n => {
            //root.player.update(n)
            //root.cyberTruck.update(n)
            root.studio.render()
            door.mesh.rotation.y += 0.01
        })
        //hideStartScreen(root, root.keyboard.show)
        hideStartScreen(root, () => {})
    })
}


window.addEventListener('load', initApp)
