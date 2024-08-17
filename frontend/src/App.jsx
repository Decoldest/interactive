import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Ball from "./components/Ball";
import Ground from "./components/Ground";

function App() {
  return (
    <Canvas camera={{ fov: 50, position: [0, 2, 5] }} shadows>
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
        <Ball />
        <Ground />
        {/* <Ball position={[0, 0, 4]} /> */}
      </Physics>
      <axesHelper args={[5]} />
      <gridHelper args={[10, 10]} />
    </Canvas>
  );
}

export default App;
