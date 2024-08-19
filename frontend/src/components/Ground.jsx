import { RigidBody } from "@react-three/rapier";

export default function Ground(props) {
  return (
    <RigidBody
      name="ground"
      type="fixed"
      rotation-x={-Math.PI / 2}
      restitution={0.8}
      friction={0.8}
      {...props}
    >
      <mesh receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshPhysicalMaterial color="#172017" />
      </mesh>
    </RigidBody>
  );
}

