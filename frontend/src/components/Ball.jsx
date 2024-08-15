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

  const [holding, setHolding] = useState(false);

  const values = useRef([0, 0]);
  useFrame((state) => {
    if (holding) {
      setUnaffectedByGravity(api);
      values.current[0] = lerp(
        values.current[0],
        (state.pointer.x * Math.PI) / 5,
        0.2,
      );
      values.current[1] = lerp(
        values.current[1],
        (state.pointer.y * Math.PI) / 5,
        0.2,
      );
      api.position.set(state.pointer.x * 5, state.pointer.y * 5, 0);
      api.rotation.set(0, 0, values.current[1]);
    } else {
      setAffectedByGravity(api);
    }
  });

  const setUnaffectedByGravity = (api) => {
    api.velocity.set(0, 0, 0);
    api.angularVelocity.set(0, 0, 0);
    api.mass.set(0);
  };

  const setAffectedByGravity = (api) => {
    api.mass.set(5);
  };

  return (
    <mesh castShadow ref={ref} onClick={() => setHolding(true)}>
      <sphereGeometry args={[0.5, 64, 64]} />
      {/* <meshStandardMaterial map={map} /> */}
      <meshStandardMaterial />
    </mesh>
  );
}
