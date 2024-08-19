import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

useGLTF.preload("./models/tortoise.glb");

export default function TestTortoise(props) {
  const group = useRef(null);
  const { nodes, materials, animations, scene } = useGLTF("./models/tortoise.glb");
  const { actions } = useAnimations(animations, group);
  
  // Example state to determine if the tortoise is moving or not
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    // Play the "idle" animation when stationary
    if (!isMoving) {
      actions.idle.play();
    } else {
      actions.idle.stop();
    }
  }, [isMoving, actions]);

  return (
    <RigidBody>
      <group ref={group} {...props}>
        <primitive object={scene} />
      </group>
    </RigidBody>
  );
}
