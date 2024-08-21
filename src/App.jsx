import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Ball from "./components/Ball";
import Ground from "./components/Ground";
import Tortoise from "./components/Tortoise";
import { useRef, useState } from "react";
import { Sky, Text } from "@react-three/drei";
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
        rotation: [(2 * Math.PI) / 180, 0, 0],
        zoom: 1,
      }}
      shadows
      resize={{ debounce: 0 }}
    >
      <Sky
        distance={450000}
        sunPosition={[100, 10, 100]}
        inclination={0.49}
        azimuth={0.25}
      />
      <ambientLight intensity={2} />
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
      <Physics gravity={[0, -30, 0]}>
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
      {!thrown && (
        <Text
          color="white"
          fontSize={0.5}
          position={[0, 5, -5]}
          anchorX="center"
          anchorY="middle"
        >
          Drag, flick, and release the ball to throw it
        </Text>
      )}
    </Canvas>
  );
}

export default App;
