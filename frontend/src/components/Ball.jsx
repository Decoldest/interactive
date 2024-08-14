import { useSphere } from "@react-three/cannon";
import { useRef } from "react";

export default function Ball() {
  const [ref, api] = useSphere(() => ({
    mass: 5,
    args: [1],
  }));

  const throwBall = () => {
    api.velocity.set(0, 2, -10);
  };

  return (
    <>
      <mesh ref={ref} onClick={throwBall}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={"blue"} />
      </mesh>
    </>
  );
}
