import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { lerp } from "three/src/math/MathUtils.js";

export default function Ball() {
  // const map = useLoader(TextureLoader, earthImg)
  const [ref, api] = useSphere(
    () => ({ args: [0.75], mass: 5, position: [0, 5, 0], restitution: 1 }),
    useRef(null),
  );

  const [holding, setHolding] = useState(true);
  
  const values = useRef([0, 0])
  useFrame((state) => {
    if (holding) {
      api.velocity.set(0, 0, 0); // Stop movement
      api.angularVelocity.set(0, 0, 0); // Stop rotation
      api.mass.set(0); // Set mass to 0 to ignore gravity
    } else {
      api.mass.set(5); // Restore mass when not held
    }
    values.current[0] = lerp(values.current[0], (state.pointer.x * Math.PI) / 5, 0.2)
    values.current[1] = lerp(values.current[1], (state.pointer.y * Math.PI) / 5, 0.2)
    api.position.set(
      state.pointer.x * 2,
      state.pointer.y * 2,   
      0                     
    );    api.rotation.set(0, 0, values.current[1])

    if (state.pointer.isPressed) {
      console.log("pressed");
      setHolding(false);
    } else {
      setHolding(true);
    }
  })

  return (
    <mesh castShadow ref={ref}>
      <sphereGeometry args={[0.5, 64, 64]} />
      {/* <meshStandardMaterial map={map} /> */}
      <meshStandardMaterial />
    </mesh>
  );
}
