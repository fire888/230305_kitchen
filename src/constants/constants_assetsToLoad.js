import '../assets/progress-img.png'

import cyberTruckSrc from '../assets/cyber_truck/scene.gltf'
import '../assets/cyber_truck/scene.bin'

import townSrc from '../assets/town.obj'

import b01ImgSrc from '../assets/mapTown01.jpg'
import b02ImgSrc from '../assets/mapTown02.jpg'
import bumpMap from '../assets/bump.jpg'
import truckShadow from '../assets/truckShadow.jpg'
import nx from '../assets/nx.jpg'
import px from '../assets/px.jpg'
import nz from '../assets/nz.jpg'
import pz from '../assets/pz.jpg'
import ny from '../assets/ny.jpg'
import py from '../assets/py.jpg'

import wMap from '../assets/wood/streaky-plywood_albedo.png'
import wAOMap from '../assets/wood/streaky-plywood_ao.png'
import wHeightMap from '../assets/wood/streaky-plywood_height.png'
import wNormalMap from '../assets/wood/streaky-plywood_normal-ogl.png'


export const SEGMENT_SIZE = [40, 30]

export const ASSETS_TO_LOAD = [
    //{
    //    type: 'obj',
    //    filename: townSrc,
    //    key: 'town'
    //},
    //{
    //    type: 'gltfBin',
    //    filename: cyberTruckSrc,
    //    key: 'cyberTruck'
    //},
    // {
    //     type: 'img',
    //     filename: b01ImgSrc,
    //     key: 'b01Map'
    // },
    // {
    //     type: 'img',
    //     filename: bumpMap,
    //     key: 'bumpMap'
    // },
    // {
    //     type: 'img',
    //     filename: b02ImgSrc,
    //     key: 'b02Map'
    // },
    // {
    //     type: 'img',
    //     filename: truckShadow,
    //     key: 'truckShadowMap'
    // },
    {
        type: 'cubeTextures',
        filename: [px, nx, py, ny, nz, pz],
        key: 'skyBox'
    },
    {
        type: 'img',
        filename: wMap,
        key: 'wMap',
    },
    {
        type: 'img',
        filename: wAOMap,
        key: 'wAOMap',
    },
    {
        type: 'img',
        filename: wNormalMap,
        key: 'wNormalMap',
    },
    {
        type: 'img',
        filename: wHeightMap,
        key: 'wHeightMap',
    },
]