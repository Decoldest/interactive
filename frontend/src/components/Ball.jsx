import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

export default function Ball(props) {
  const ballRef = useRef();
  const body = useRef();

  const [holding, setHolding] = useState(false);
  const [launch, setLaunch] = useState(false);

  useFrame(({ pointer: { x, y }, viewport: { height, width } }) => {
    if (holding) {
      const newPositionX = (x * width) / 2; // Scale pointer x to the viewport width
      const newPositionY = (y * height) / 2; // Scale pointer y to the viewport height

      body.current.setTranslation({ x: newPositionX, y: newPositionY -3, z: 2 });
      body.current.setLinvel({ x: 0, y: 0, z: 0 });
      body.current.setAngvel({ x: 0, y: 0, z: 0 });
    } else if (launch) {
      body.current.setLinvel({ x: 0, y: 10, z: -20 });
      setLaunch(false);
    }
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        setHolding(false);
        setLaunch(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <RigidBody
      ref={body}
      name="ball"
      colliders="ball"
      mass={2}
      restitution={0.6}
      friction={1}
      linearDamping={1}
      angularDamping={1}
      {...props}
    >
      <mesh
        ref={ballRef}
        castShadow
        position={[0, 4, 2]}
        onClick={() => setHolding(!holding)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#FFDE91" />
      </mesh>
    </RigidBody>
  );
}
