import { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { forwardRef } from "react";

useGLTF.preload("./models/tortoise.glb");

const Tortoise = forwardRef(function Tortoise(props, tortoiseBody) {
  const { ballRef, thrown, caught, handleCaughtBall, handleReturnBall } = props;
  const group = useRef(null);
  const { animations, scene } = useGLTF(
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
      actions.walking.timeScale = 3;
    }
  }, [isMoving, actions]);

  useFrame(() => {
    // Fetch ball
    if (thrown && ballRef && tortoiseBody.current) {
      const targetPosition = ballRef.current.translation();
      goFetch(targetPosition.x, targetPosition.z);
    }

    // Return ball
    if (caught) {
      goFetch(RETURN_POSITION[0], RETURN_POSITION[2]);
      ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);

      const tortoisePosition = tortoiseBody.current.translation();
      const tortoiseRotation = tortoiseBody.current.rotation();

      // Position the ball approximately in front of the tortoise
      if (ballRef.current && tortoiseBody.current) {
        const tortoiseFrontPosition = new THREE.Vector3(
          tortoisePosition.x - tortoiseRotation.y * tortoiseRotation.w * 4,
          tortoisePosition.y + 1.25,
          tortoisePosition.z +
            (0.5 - Math.abs(tortoiseRotation.y * tortoiseRotation.w)) * 7
        );

        ballRef.current.setTranslation(
          {
            x: tortoiseFrontPosition.x,
            y: tortoiseFrontPosition.y,
            z: tortoiseFrontPosition.z,
          },
          true
        );
      }

      // Check if the tortoise has reached the return position
      if (
        Math.abs(tortoisePosition.x - RETURN_POSITION[0]) <= 0.1 &&
        Math.abs(tortoisePosition.z - RETURN_POSITION[2]) <= 0.1
      ) {
        setIsMoving(false);
        releaseBall();
        handleReturnBall();
      }
    }
  });

  const releaseBall = () => {
    const { spit } = actions;

    // Play animation, then stop after approximate end of loop
    spit.play();
    setTimeout(() => {
      spit.stop();
    }, 2000);

    ballRef.current.setLinvel({ x: 0, y: 0, z: 3 }, true);
  };

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
    if (
      e.other.rigidBodyObject &&
      e.other.rigidBodyObject.name === "ball" &&
      !caught
    ) {
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
      castShadow
      receiveShadow
    >
      <mesh>
        <group ref={group}>
          <primitive object={scene} />
        </group>
      </mesh>
    </RigidBody>
  );
});

Tortoise.propTypes = {
  ballRef: PropTypes.object,
  thrown: PropTypes.bool,
  caught: PropTypes.bool,
  handleCaughtBall: PropTypes.func,
  handleReturnBall: PropTypes.func,
};

export default Tortoise;
