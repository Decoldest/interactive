import { useRef } from "react";
import { useDrag } from "@use-gesture/react";
import * as THREE from "three";
import PropTypes from "prop-types";
import { RigidBody } from "@react-three/rapier";
import { forwardRef } from 'react';

const Ball = forwardRef(function Ball(props, body) {
  const { xyPlane, updateBallThrown } = props;

  const MIN_HEIGHT = 0.5;
  let planeIntersectPointXY = new THREE.Vector3();

  // Store previous position and time for velocity calculation
  const prevPosition = useRef(new THREE.Vector3());
  const prevTime = useRef(0);
  const MAGNITUDE_FACTOR = 5;
  const VELOCITY_THRESHOLD = 5;

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      // Use raycaster to check position
      event.ray.intersectPlane(xyPlane, planeIntersectPointXY);
      const clampYPosition = Math.max(planeIntersectPointXY.y, MIN_HEIGHT);
      const coordinates = {
        x: planeIntersectPointXY.x,
        y: clampYPosition,
        z: -clampYPosition / 2,
      };

      if (active) {
        // Calculate the time difference
        const deltaTime = (timeStamp - prevTime.current) / 1000; // convert to seconds
        prevTime.current = timeStamp;

        // Calculate the velocity
        const velocity = new THREE.Vector3()
          .subVectors(coordinates, prevPosition.current)
          .divideScalar(deltaTime * MAGNITUDE_FACTOR);

        // Update previous position
        prevPosition.current.copy(coordinates);

        // Update ball position
        body.current.setTranslation(coordinates);
        body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);

        // Prevent linear velocity on the ball for simple dragging
        if (velocity.y > VELOCITY_THRESHOLD) {
          body.current.setLinvel(velocity, true);
          updateBallThrown(true);
        } else {
          body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        }
      }
    },
    { delay: true }
  );

  return (
    <RigidBody
      {...bind()}
      ref={body}
      mass={2}
      colliders={"ball"}
      friction={1}
      restitution={0.6}
      linearDamping={0.5}
      angularDamping={0.5}
      position={[0, 10, 0]}
      name="ball"
    >
      <mesh castShadow receiveShadow>
        <sphereGeometry attach="geometry" args={[0.5, 32, 32]} />
        {/* <meshNormalMaterial attach="material" /> */}
      </mesh>
    </RigidBody>
  );
});


Ball.propTypes = {
  xyPlane: PropTypes.object,
  updateBallThrown: PropTypes.func,
};

export default Ball;
