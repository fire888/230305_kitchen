import * as THREE from 'three'
import wMap from "../assets/wood/streaky-plywood_albedo.png";
import wAOMap from "../assets/wood/streaky-plywood_ao.png";
import wNormalMap from "../assets/wood/streaky-plywood_normal-ogl.png";
import wHeightMap from "../assets/wood/streaky-plywood_height.png";

const createDoorGeometry = (
    {
        w = 50,
        h = 50,
        z = 3,
        frame = 5,
    }
) => {
    const vWood = []
    const indWood = []
    const uv = []

    const indexFrame = []

    /** box ******/
    vWood.push(
        0, 0, 0, // 0
        w, 0, 0, // 1
        w, h, 0, // 2
        0, h, 0, // 3

        0, 0, z, // 4
        w, 0, z, // 5
        w, h, z, // 6
        0, h, z, // 7
    )

    uv.push(
        0, 0,
        1, 0,
        1, 1,
        0, 1,

        0, 0,
        1, 0,
        1, 1,
        0, 1,
    )

    indWood.push(
        1, 0, 3, 1, 3, 2,  //back
        0, 4, 7, 0, 7 , 3, // left
        7, 6, 2, 7, 2, 3,  // top
        5, 1, 2, 5, 2, 6,  // right
        0, 1, 5, 0, 5, 4,  // bottom
    )


    /** front frame ***/
    vWood.push(
        frame, frame, z,          // 8
        w - frame, frame, z,      // 9
        w - frame, h - frame, z,  // 10
        frame, h - frame, z,      // 11
    )

    uv.push(
        .2, .2,
        .8, .2,
        .8, .8,
        .2, .8,
    )

    indWood.push(
        4, 5, 9, 4, 9, 8, // bottom
        5, 6, 10, 5, 10, 9, // right
        5, 6, 10, 5, 10, 9, // left
        4, 8, 11, 4, 11, 7, // right
        11, 10, 6, 11, 6, 7, // top
    )

    // /** back side *******/
    // vWood.push(
    //      w, 0, 0,
    //      0, 0, 0,
    //      0, h, 0,
    //      w, h, 0
    // )
    // indWood.push(0, 1, 2, 0, 2, 3)
    //
    //
    // /** top ***********/
    // vWood.push(
    //     0, h, z,
    //     w, h, z,
    //     w, h, 0,
    //     0, h, 0
    // )
    // indWood.push(4, 5, 6, 4, 6, 7)
    //
    //
    // /** left **********/
    // vWood.push(
    //     0, 0, 0,
    //     0, 0, z,
    //     0, h, z,
    //     0, h, 0
    // )
    // indWood.push(8, 9, 10, 8, 10, 11)
    //
    // /** right **********/
    // vWood.push(
    //     w, 0, z,
    //     w, 0, 0,
    //     w, h, 0,
    //     w, h, z
    // )
    // indWood.push(12, 13, 14, 12, 14, 15)
    //
    // /** bottom **********/
    // vWood.push(
    //     w, 0, z,
    //     0, 0, z,
    //     0, 0, 0,
    //     w, 0, 0
    // )
    // indWood.push(16, 17, 18, 16, 18, 19)
    //
    // /** front ***********/
    //
    // /** bottom **/
    // vWood.push(
    //     0, 0, z,
    //     w, 0, z,
    //     w - frame, frame, z,
    //     frame, frame, z,
    // )
    // indWood.push(20, 21, 22, 20, 22, 23)
    // indexFrame.push(22, 23)
    //
    // /** right **/
    // vWood.push(
    //     w, 0, z,
    //     w, h, z,
    //     w - frame, h - frame, z,
    //     w - frame, frame, z,
    // )
    // indWood.push(24, 25, 26, 24, 26, 27)
    // indexFrame.push(26, 27)




    const geometry = new THREE.BufferGeometry()

    const vF32 = new Float32Array(vWood)
    geometry.setAttribute('position', new THREE.BufferAttribute(vF32, 3))
    const uvF32 = new Float32Array(uv)
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvF32, 2))


    geometry.setIndex(indWood);
    geometry.computeVertexNormals()
    geometry.addGroup(0, 60, 0)
    geometry.addGroup(0, 0, 1)

    return {
        geometry,
    }
}

const m1 = new THREE.MeshPhongMaterial({ color: 0xff0000, flatShading: true })
const m2 = new THREE.MeshBasicMaterial({ color: 0x0FF000 })


export const createDoor = (root) => {


    const geometryDoor = createDoorGeometry(
        {
           x: 50, h: 50, z: 10, frame: 10,
        }
    )
    const materials = [
        new THREE.MeshPhongMaterial({
            color: 0x333333,
            lightMap: root.assets['wAOMap'],
            lightMapIntensity: .35,
            normalMap: root.assets['wNormalMap'],
            normalScale: new THREE.Vector2(.2, .2),
            envMap: root.assets['skyBox'],
            map: root.assets['wMap'],
            reflectivity: .002,
            shininess: 100,
            specular: 0x333333,
        }),
        new THREE.MeshPhongMaterial({
            color: 0x00ff00,
        }),
    ]


    root.studio.addToScene(new THREE.Mesh(
        new THREE.BoxGeometry(30, 30, 30),
        materials[0],
    ))

    // {
    //     type: 'img',
    //         filename: wMap,
    //     key: 'wMap',
    // },
    // {
    //     type: 'img',
    //         filename: wAOMap,
    //     key: 'wAOMap',
    // },
    // {
    //     type: 'img',
    //         filename: wNormalMap,
    //     key: 'wNormalMap',
    // },
    // {
    //     type: 'img',
    //         filename: wHeightMap,
    //     key: 'wHeightMap',
    // },



    const mesh = new THREE.Mesh(
        geometryDoor.geometry,
        //new THREE.BoxGeometry(50, 50, 50),
        materials,
    )
    root.studio.addToScene(mesh)

    return {
        mesh,
    }
}