import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody, quat } from "@react-three/rapier";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

useGLTF.preload("./models/tortoise.glb");

TestTortoise.propTypes = {
  thrown: PropTypes.bool,
  ballPosition: PropTypes.object,
  caught: PropTypes.bool,
};

export default function TestTortoise({ thrown, ballPosition, caught }) {
  const tortoiseBody = useRef();
  const group = useRef(null);
  const { nodes, materials, animations, scene } = useGLTF(
    "./models/tortoise.glb"
  );
  const { actions } = useAnimations(animations, group);

  // Example state to determine if the tortoise is moving or not
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    if (thrown) {
      setIsMoving(true);
    }
  }, [thrown]);

  useEffect(() => {
    // Play the "idle" animation when stationary
    if (!isMoving) {
      actions.idle.play();
    } else {
      actions.walking.play();
    }
  }, [isMoving, actions]);

  useFrame(() => {
    if (ballPosition && tortoiseBody.current && thrown) {
      const targetPosition = ballPosition;
      const tortoisePosition = tortoiseBody.current.translation();

      // Calculate direction to ball
      const direction = new THREE.Vector3(
        targetPosition.x - tortoisePosition.x,
        0,
        targetPosition.z - tortoisePosition.z
      ).normalize();

      const speed = 3;
      const velocity = direction.multiplyScalar(speed);

      // Set the linear velocity only on the x and z axes
      tortoiseBody.current.setLinvel(
        { x: velocity.x, y: 0, z: velocity.z },
        true
      );

      // Rotate the tortoise towards the ball
      const euler = new THREE.Euler()
      const quaternion = new THREE.Quaternion()
      const angle = Math.atan2(direction.x, direction.z) + Math.PI;

      tortoiseBody.current.setRotation(quaternion.setFromEuler(euler.set(0, angle, 0)))
    }
  });

  const handleCollisionWithBall = (e) => {
    if (e.body.name ==="ball") {
      console.log("touched ball");
    }
  }
 
  return (
    <RigidBody
      position={[2, 0, -2]}
      rotation={[0, Math.PI, 0]}
      ref={tortoiseBody}
      name="tortoise"
      onCollisionEnter={handleCollisionWithBall}
    >
      <group ref={group}>
        <primitive object={scene} />
      </group>
    </RigidBody>
  );
}
