import { useSphere } from "@react-three/cannon";
import { useRef } from "react";

export default function Ball() {
  // const map = useLoader(TextureLoader, earthImg)
  const [ref] = useSphere(
    () => ({ args: [0.75], mass: 5, position: [0, 5, 0] }),
    useRef(null),
  );
  return (
    <mesh castShadow ref={ref}>
      <sphereGeometry args={[0.5, 64, 64]} />
      {/* <meshStandardMaterial map={map} /> */}
      <meshStandardMaterial />
    </mesh>
  );
}
