import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

export default function Ball(props) {
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

  // const handlePointerDown = (event) => {
  //   if (event.button === 0) {
  //     // Left mouse button
  //     setHolding(true);
  //     setInitialPointer({
  //       x: (event.clientX * window.innerWidth) / window.innerWidth,
  //       y: (event.clientY * window.innerHeight) / window.innerHeight,
  //     });
  //   }
  // };

  // const handlePointerUp = (event) => {
  //   if (event.button === 0) {
  //     setHolding(false);
  //     launch();
  //   }
  // };

  useEffect(() => {
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
      setHolding(true);
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

    // window.addEventListener("pointerdown", handlePointerDown);
    // window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      // window.removeEventListener("pointerdown", handlePointerDown);
      // window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    endThrowTime,
    initialPointer.x,
    initialPointer.y,
  ]);

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
    >
      <mesh ref={ballRef} castShadow position={[0, 4, 2]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#FFDE91" />
      </mesh>
    </RigidBody>
  );
}
