import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three"

export default function Ground(props) {
  const groundTexture = useTexture("./textures/sand-texture.jpg");
  groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(1000, 1000);
  groundTexture.anisotropy = 16;
  groundTexture.encoding = THREE.sRGBEncoding;
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
        <meshStandardMaterial map={groundTexture} />
      </mesh>
    </RigidBody>
  );
}
