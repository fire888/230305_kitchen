import * as THREE from 'three'


const createDoorGeometry = (params) => {
    let v = []

    const updatePoints = () => {
        const {
            w = 50,
            h = 50,
            zBox = -30,
            tBox = 2,
        } = params

        /** box ******/
        v.push(
            0, 0, 0, // 0
            w, 0, 0, // 1
            w, h, 0, // 2
            0, h, 0, // 3

            0, 0, zBox, // 4
            w, 0, zBox, // 5
            w, h, zBox, // 6
            0, h, zBox, // 7
        )

        v.push(
            tBox, tBox, 0,         // 8
            w - tBox, tBox, 0,     // 9
            w - tBox, h - tBox, 0, // 10
            tBox, h - tBox, 0,     // 11

            tBox, tBox, zBox + tBox,         // 12
            w - tBox, tBox, zBox + tBox,     // 13
            w - tBox, h - tBox, zBox + tBox, // 14
            tBox, h - tBox, zBox + tBox,     // 15
        )
    }

    updatePoints()


    const i = []
    const uv = []

    i.push(
        4, 0, 3, 4, 3, 7, //left
        7, 3, 2, 7, 2, 6, // top
        1, 5, 6, 1, 6, 2, // left
        1, 0, 4, 1, 4, 5, // bottom
        5, 4, 7, 5, 7, 6, // back
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


    /** inner Box  *****/
    i.push(
        8, 9, 13, 8, 13, 12, //bottom
        13, 9, 10, 13, 10, 14, //right
        8, 12, 15, 8, 15, 11, //left
        10, 11, 15, 10, 15, 14, // top
        12, 13, 14, 12, 14, 15, ///back

        // front
        0, 1, 9, 0, 9, 8,
        9, 1, 2, 9, 2, 10,
        11, 10, 2, 11, 2, 3,
        0, 8, 11, 0, 11, 3,

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




    const geometry = new THREE.BufferGeometry()

    const vF32 = new Float32Array(v)
    geometry.setAttribute('position', new THREE.BufferAttribute(vF32, 3))
    const uvF32 = new Float32Array(uv)
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvF32, 2))


    geometry.setIndex(i)
    geometry.computeVertexNormals()


    const updateParams = () => {
        v = []
        updatePoints()
        for (let i = 0; i < v.length; ++i) {
            vF32[i] = v[i]
            geometry.attributes.position.needsUpdate = true
        }
    }


    return {
        geometry,
        setParams: p => {
            params = p
            updateParams()
        },
    }
}


export const createBox = (root, params) => {
    const geometryBox = createDoorGeometry(params)

    const mesh = new THREE.Mesh(
        geometryBox.geometry,
        root.materials[0],
    )
    return {
        mesh,
        ...geometryBox,
    }
}