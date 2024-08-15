import { usePlane } from "@react-three/cannon";
import { useRef } from "react";

export default function Ground() {
  const [ref] = usePlane(
    () => ({
      position: [0, -1, 0],
      rotation: [-Math.PI / 2, 0, 0],
      type: "Static",
    }),
    useRef(null),
  );
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshPhongMaterial color="#172017" />
    </mesh>
  );
}

