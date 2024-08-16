import { RigidBody } from '@react-three/rapier'

export default function Ground(props) {
  return (
    <RigidBody name="ground" type="fixed" rotation-x={Math.PI * -0.5} restitution={0.8} friction={1} {...props}>
      <mesh receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#172017" />
      </mesh>
    </RigidBody>
  );
}