import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import Ball from "./components/Ball";
import Ground from "./components/Ground";

function App() {
  return (
    <Canvas
        camera={{ fov: 50, position: [1, 2, 6] }}
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
        iterations={10}
        tolerance={0.0001}
        defaultContactMaterial={{
          contactEquationRelaxation: 1,
          contactEquationStiffness: 1e7,
          friction: 0.9,
          frictionEquationRelaxation: 2,
          frictionEquationStiffness: 1e7,
          restitution: 0.4,
        }}
        gravity={[0, -50, 0]}
        allowSleep={false}
      >
        <Ball />
        
        <Ground />
      </Physics>
      <axesHelper args={[5]} />
    </Canvas>
  );
}

export default App;
