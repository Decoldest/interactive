import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Ball from "./components/Ball";
import Ground from "./components/Ground";
import BallTest from "./components/BallTest";
import Obj from "./components/Obj";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";


function App() {
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

  return (
    <Canvas camera={{ fov: 50, position: [1, 2, 20] }} shadows>
      {/* <color attach="background" args={['#171720']} /> */}
      <ambientLight intensity={2} />
      {/* <pointLight decay={2} intensity={1} position={[0, 0, 0]} /> */}
      <spotLight
        angle={0.6}
        castShadow
        decay={0}
        intensity={Math.PI}
        penumbra={1}
        position={[10, 10, 10]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <Physics
        gravity={[0, -20, 0]}
        // Rapier specific configuration if needed
      >
        <planeHelper args={[floorPlane, 5, "red"]} />

        <Obj floorPlane={floorPlane} />
        <Ground />
        {/* <Ball position={[0, 0, 4]} /> */}
      </Physics>
      <axesHelper args={[5]} />
      <gridHelper args={[10, 10]} />
    </Canvas>
  );
}

export default App;
