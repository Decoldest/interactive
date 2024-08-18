import { useState, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import PropTypes from "prop-types";
import { RigidBody } from "@react-three/rapier";

Obj.propTypes = {
  floorPlane: PropTypes.object,
};

function Obj({ floorPlane }) {
  const [pos, setPos] = useState([0, 1, 0]);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  let planeIntersectPoint = new THREE.Vector3();

  const dragObjectRef = useRef();

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([
          planeIntersectPoint.x,
          planeIntersectPoint.y,
          planeIntersectPoint.z,
        ]);

        dragObjectRef.current.setTranslation({
          x: planeIntersectPoint.x,
          y: planeIntersectPoint.y,
          z: planeIntersectPoint.z,
        });
        dragObjectRef.current.setLinvel({ x: 0, y: 0, z: 0 });
        dragObjectRef.current.setAngvel({ x: 0, y: 0, z: 0 });
      }

      return timeStamp;
    },
    { delay: true }
  );

  return (
    <RigidBody {...bind()} ref={dragObjectRef}>
      <animated.mesh castShadow>
        <sphereGeometry
          attach="geometry"
          args={[0.5, 32, 32]} // Updated args for higher resolution sphere
        />
        <meshNormalMaterial attach="material" />
      </animated.mesh>
    </RigidBody>
  );
}

export default Obj;
