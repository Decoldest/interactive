import React, { useRef, useEffect, useState, Children } from "react";
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
  handleCaughtBall: PropTypes.func,
  handleReturnBall: PropTypes.func,
};

export default function TestTortoise({
  thrown,
  ballPosition,
  caught,
  handleCaughtBall,
  handleReturnBall,
}) {
  const tortoiseBody = useRef();
  const group = useRef(null);
  const { nodes, materials, animations, scene } = useGLTF(
    "./models/tortoise.glb"
  );
  const { actions } = useAnimations(animations, group);
  const SPEED = 3;
  const INITIAL_POSITION = [2, 0, -2];
  const RETURN_POSITION = [0, 0, -4];

  // Example state to determine if the tortoise is moving or not
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    if (thrown || caught) {
      setIsMoving(true);
    }
  }, [thrown, caught]);

  useEffect(() => {
    // Play animation depending on condition
    if (!isMoving) {
      actions.walking.stop();
      actions.idle.play();
    } else {
      actions.walking.play();
    }
  }, [isMoving, actions]);

  useFrame(() => {
    if (thrown && ballPosition && tortoiseBody.current) {
      const targetPosition = ballPosition;
      goFetch(targetPosition.x, targetPosition.z);
    }
    if (thrown && ballPosition && tortoiseBody.current) {
      const targetPosition = ballPosition;
      goFetch(targetPosition.x, targetPosition.z);
    }

    if (caught) {
      console.log("returning");

      goFetch(RETURN_POSITION[0], RETURN_POSITION[2]);

      const tortoisePosition = tortoiseBody.current.translation();

      // Check if the tortoise has reached the initial position
      if (
        Math.abs(tortoisePosition.x - RETURN_POSITION[0]) <= 0.1 &&
        Math.abs(tortoisePosition.z - RETURN_POSITION[2]) <= 0.1
      ) {
        handleReturnBall();
        setIsMoving(false);
      }
    }
  });

  function goFetch(targetX, targetZ) {
    const tortoisePosition = tortoiseBody.current.translation();

    // Calculate direction to target
    const direction = new THREE.Vector3(
      targetX - tortoisePosition.x,
      0,
      targetZ - tortoisePosition.z
    ).normalize();

    const velocity = direction.multiplyScalar(SPEED);

    // Set the linear velocity only on the x and z axes
    tortoiseBody.current.setLinvel(
      { x: velocity.x, y: 0, z: velocity.z },
      true
    );

    // Rotate the tortoise towards the target
    const euler = new THREE.Euler();
    const quaternion = new THREE.Quaternion();
    const angle = Math.atan2(direction.x, direction.z) + Math.PI;

    tortoiseBody.current.setRotation(
      quaternion.setFromEuler(euler.set(0, angle, 0))
    );
  }

  const handleCollisionWithBall = (e) => {
    if (e.other.rigidBodyObject && e.other.rigidBodyObject.name === "ball") {
      handleCaughtBall();
    }
  };

  return (
    <RigidBody
      position={INITIAL_POSITION}
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
