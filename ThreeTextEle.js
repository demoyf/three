// three.js 部分有做一些修改，修改后的资源文件放在module/three 目录下，opentype也在其中。（修改的内容都是js，没有动ts）

import { MixOperation,MirroredRepeatWrapping } from './module/three/src/constants';
import { MeshStandardMaterial } from './module/three/src/materials/MeshStandardMaterial';
import { MeshBasicMaterial } from './module/three/src/materials/MeshBasicMaterial';
import { ShaderMaterial } from './module/three/src/materials/ShaderMaterial';
import { TextureLoader } from './module/three/src/loaders/TextureLoader';
import { Color } from './module/three/src/math/Color';
import { Scene } from './module/three/src/scenes/Scene';
import { WebGLRenderer } from './module/three/src/renderers/WebGLRenderer';
import { Group } from './module/three/src/objects/Group';
import { PerspectiveCamera } from './module/three/src/cameras/PerspectiveCamera';

import { AmbientLight } from './module/three/src/lights/AmbientLight';
import { PointLight } from './module/three/src/lights/PointLight';
import { PointLightHelper } from './module/three/src/helpers/PointLightHelper';
import { SpotLight } from './module/three/src/lights/SpotLight';
import { SpotLightHelper } from './module/three/src/helpers/SpotLightHelper';
import { DirectionalLight } from './module/three/src/lights/DirectionalLight';
import { DirectionalLightHelper } from './module/three/src/helpers/DirectionalLightHelper';
import { AxesHelper } from './module/three/src/helpers/AxesHelper';

import { CubeTexture } from './module/three/src/textures/CubeTexture';
import { CanvasTexture } from './module/three/src/textures/CanvasTexture';
import { Texture } from './module/three/src/textures/Texture';
import { Vector3 } from './module/three/src/math/Vector3';
import { Box3 } from './module/three/src/math/Box3';
import { Mesh } from './module/three/src/objects/Mesh';
import { BufferGeometry } from './module/three/src/core/BufferGeometry.js';
import { BufferAttribute,Float32BufferAttribute } from './module/three/src/core/BufferAttribute';


(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.THREE = {}));
})(this, function (exports) {
    // const
    exports.MixOperation = MixOperation;
    exports.MirroredRepeatWrapping = MirroredRepeatWrapping;

    // basic
    exports.WebGLRenderer = WebGLRenderer;
    exports.PerspectiveCamera = PerspectiveCamera;
    exports.Scene = Scene;

    // material
    exports.MeshStandardMaterial = MeshStandardMaterial;
    exports.MeshBasicMaterial = MeshBasicMaterial;
    exports.ShaderMaterial = ShaderMaterial;

    // loader
    exports.TextureLoader = TextureLoader;

    exports.Color = Color;
    exports.Group = Group;
    exports.Vector3 = Vector3;
    exports.Box3 = Box3;
    exports.Mesh = Mesh;

    exports.AmbientLight = AmbientLight;
    exports.PointLight = PointLight;
    exports.PointLightHelper = PointLightHelper;
    exports.SpotLight = SpotLight;
    exports.SpotLightHelper = SpotLightHelper;
    exports.DirectionalLight = DirectionalLight;
    exports.DirectionalLightHelper = DirectionalLightHelper;
    exports.AxesHelper = AxesHelper;
    
    exports.CubeTexture = CubeTexture;
    exports.CanvasTexture = CanvasTexture;
    exports.Texture = Texture;

    exports.BufferGeometry = BufferGeometry;
    exports.BufferAttribute = BufferAttribute;
    exports.Float32BufferAttribute = Float32BufferAttribute;
});
