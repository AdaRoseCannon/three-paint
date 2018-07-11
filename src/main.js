/* global registerPaint */

import * as typeface from 'three/examples/fonts/optimer_bold.typeface.json';
import {
  AmbientLight,
  DirectionalLight,
  Font,
  Group,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
  TextGeometry
} from "three";
import { PaintRenderer } from "./lib/PaintRenderer.js";

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  1,
  0.1,
  1000
);

const renderer = new PaintRenderer({size: {
  width: 100,
  height: 100
}});

renderer.setClearColor('black', 0);
renderer.setSize(100, 100);

// const cubeGeom = new BoxGeometry(1, 1, 1);
const material = new MeshLambertMaterial({ color: 0xaaaaaa, overdraw: 0.5 });
// const cube = new Mesh(cubeGeom, material);
// scene.add(cube);

const ambientLight = new AmbientLight(0x202020);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(0x00ffff);
directionalLight.position.set(1, 1, 0);

scene.add(directionalLight);

camera.position.z = 5;

const font = new Font(typeface);
const typeGeom = new TextGeometry(`There is no
ethical
consumption
under capitalism.`, {
  font: font,
  size: 1.0,
  height: 0.5,
  curveSegments: 2
});
typeGeom.computeBoundingBox();
const materials = [material, material];
const type = new Mesh(typeGeom, materials);
type.position.x = -0.5 * (typeGeom.boundingBox.max.x - typeGeom.boundingBox.min.x);
type.position.y = -1 + 0.5 * (typeGeom.boundingBox.max.y - typeGeom.boundingBox.min.y);
type.position.z = 0;
type.rotation.x = 0;
type.rotation.y = Math.PI * 2;

const group = new Group();
scene.add(group);
group.add(type);

registerPaint(
  "three",
  class {
    static get inputProperties() {
      return ["--rotate-x", "--rotate-y", "--rotate-z"];
    }

    paint(ctx, size, props) {
      const a = Math.min(0.5 * size.width / size.height, 1);
      group.scale.set(a,a,a);
      group.rotation.set(
        Math.PI * Number(props.get("--rotate-x"))/180,
        Math.PI * Number(props.get("--rotate-y"))/180,
        Math.PI * Number(props.get("--rotate-z"))/180
      );
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
      renderer.setContext(ctx);
      renderer.setSize(size.width, size.height);
      renderer.render(scene, camera);
    }
  }
);
