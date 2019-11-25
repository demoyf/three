// three.js 部分有做一些修改，修改后的资源文件放在module/three 目录下，opentype也在其中。（修改的内容都是js，没有动ts）

import { MixOperation,MirroredRepeatWrapping } from 'three/src/constants';
import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial';
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { Color } from 'three/src/math/Color';
import { Scene } from 'three/src/scenes/Scene';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { Group } from 'three/src/objects/Group';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';

import { AmbientLight } from 'three/src/lights/AmbientLight';
import { PointLight } from 'three/src/lights/PointLight';
import { PointLightHelper } from 'three/src/helpers/PointLightHelper';
import { SpotLight } from 'three/src/lights/SpotLight';
import { SpotLightHelper } from 'three/src/helpers/SpotLightHelper';
import { DirectionalLight } from 'three/src/lights/DirectionalLight';
import { DirectionalLightHelper } from 'three/src/helpers/DirectionalLightHelper';
import { AxesHelper } from 'three/src/helpers/AxesHelper';

import { CubeTexture } from 'three/src/textures/CubeTexture';
import { CanvasTexture } from 'three/src/textures/CanvasTexture';
import { Texture } from 'three/src/textures/Texture';
import { Vector3 } from 'three/src/math/Vector3';
import { Box3 } from 'three/src/math/Box3';
import { Mesh } from 'three/src/objects/Mesh';
import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import { BufferAttribute,Float32BufferAttribute } from 'three/src/core/BufferAttribute';


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
