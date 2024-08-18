import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useDrag } from "react-use-gesture";

export default function BallTest(props) {
  const ballRef = useRef();
  const body = useRef();
  const [holding, setHolding] = useState(false);
  const [initialPointer, setInitialPointer] = useState({ x: 0, y: 0 });
  const startThrowTime = useRef();
  const endThrowTime = useRef();
  const minHeight = -3.5;
  const VELOCITY_THRESHOLD = 2;
  const NORMALIZATION_FACTOR = 100;

  useFrame(({ pointer: { x, y }, viewport: { height, width } }) => {
    if (holding) {
      body.current.setTranslation({
        x: (x * width) / 2,
        y: Math.max((y * height) / 2 - 3, minHeight),
        z: 0,
      });
      body.current.setLinvel({ x: 0, y: 0, z: 0 });
      body.current.setAngvel({ x: 0, y: 0, z: 0 });
    }
  });
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => set({ position: [x / aspect, -y / aspect, 0], rotation: [y / aspect, x / aspect, 0] }),
    onHover: ({ hovering }) => set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] })
  })

  const launch = (finalX, finalY) => {
    setHolding(false);
    const dx = finalX - initialPointer.x;
    const dy = finalY - initialPointer.y;
    console.log("dx, dy:", dx, dy);

    const flickVector = {
      x: dx,
      y: dy,
      z: Math.sqrt(dx ** 2 + dy ** 2),
    };

    const time = (endThrowTime.current - startThrowTime.current) / 1000;
    console.log(time);
    const velocities = getVelocitiesFromDT(flickVector, time);
    console.log(velocities);
    if (velocities.z > VELOCITY_THRESHOLD) {
      // Adjust this threshold value as needed
      body.current.setLinvel({
        x: velocities.x, // Adjust scaling as needed
        y: velocities.y,
        z: -velocities.z,
      });
    }
  };

  const handleMouseDown = (e) => {
    console.log(e.clientX, e.clientY);

    startThrowTime.current = new Date().getTime();
    setInitialPointer({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseUp = (e) => {
    console.log(e.clientX, e.clientY);

    endThrowTime.current = new Date().getTime();
    launch(e.clientX, e.clientY);
  };

  function getVelocitiesFromDT(distances, time) {
    return Object.keys(distances).reduce((acc, elem) => {
      acc[elem] = (distances[elem] * 2) / time / NORMALIZATION_FACTOR;
      return acc;
    }, {});
  }

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
      onClick={(e) => {
        console.log("AESfase");
        handleMouseDown(e);
      }}
      onDragStart={()=>console.log("asffaf")}
    >
      <mesh ref={ballRef} castShadow position={[0, 4, 2]}>
        <sphereGeometry
          args={[0.25, 32, 32]}
          
          onPointerUp={handleMouseUp}
        />
        <meshStandardMaterial color="#FFDE91" />
      </mesh>
    </RigidBody>
  );
}
