import { useSphere } from "@react-three/cannon";

export default function Ball() {
  const [ref] = useSphere(() => ({
    mass: 2,
    position: [0, 0, 0],
    args: [1],
  }));

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
}
