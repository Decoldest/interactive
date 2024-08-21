import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Ball from "./components/Ball";
import Ground from "./components/Ground";
import Tortoise from "./components/Tortoise";
import { useRef, useState } from "react";
import * as THREE from "three";

function App() {
  const xyPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const [thrown, setThrown] = useState(false);
  const [caught, setCaught] = useState(false);
  const ballRef = useRef();
  const tortoiseRef = useRef();

  const updateBallThrown = (isThrown) => {
    setThrown(isThrown);
  };

  const handleCaughtBall = () => {
    setCaught(true);
  };

  const handleReturnBall = () => {
    setCaught(false);
    setThrown(false);
  };

  return (
    <Canvas
      camera={{
        fov: 60,
        position: [1, 3, 8],
        rotation: [Math.PI / 90, 0, 0], // Rotate camera 45 degrees on x and y axes
        zoom: 1, // Default zoom
      }}
      shadows
    >
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
        gravity={[0, -30, 0]}
        // Rapier specific configuration if needed
      >

        <Ball
          xyPlane={xyPlane}
          updateBallThrown={updateBallThrown}
          ref={ballRef}
        />
        <Tortoise
          ballRef={ballRef}
          thrown={thrown}
          caught={caught}
          handleCaughtBall={handleCaughtBall}
          handleReturnBall={handleReturnBall}
          ref={tortoiseRef}
        />

        <Ground />
      </Physics>
    </Canvas>
  );
}

export default App;
