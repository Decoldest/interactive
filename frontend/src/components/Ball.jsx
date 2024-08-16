import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { lerp } from "three/src/math/MathUtils.js";

const MIN_HEIGHT = -0.5; // Minimum height for the ball

export default function Ball() {
  // const map = useLoader(TextureLoader, earthImg)
  const [ref, api] = useSphere(
    () => ({
      args: [0.75],
      mass: 5,
      position: [0, 5, 0],
      restitution: 0.4,
      type: "Dynamic",
    }),
    useRef(null)
  );

  const pointerRef = useRef();
  const [holding, setHolding] = useState(false);

  const values = useRef([0, 0]);
  const currentPosition = useRef([0, 0, 0]);
  api.position.subscribe((pos) => {
    currentPosition.current = pos;
  });
  
  useFrame(({ pointer: { x, y }, viewport: { height, width } }) => {
    if (holding) {
      setUnaffectedByGravity(api);

      const newPositionX = (x * width) / 2;
      // Ensure newPositionY does not go below MIN_HEIGHT
      const newPositionY = y < MIN_HEIGHT
        ? currentPosition.current[1]
        : Math.max((y * height) / 2, MIN_HEIGHT);

      api.position.set(newPositionX, newPositionY, 0);
      // api.rotation.set(0, 0, values.current[1]);
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
