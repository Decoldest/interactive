import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import Ball from "./components/Ball";
import Ground from "./components/Ground";

function App() {
  return (
    <Canvas>
      <directionalLight position={[0, 1, 2]} intensity={0.8} />
      <ambientLight intensity={0.2} />
      <Physics>
        <Ball />
        <Ground />
      </Physics>
    </Canvas>
  );
}

export default App;
