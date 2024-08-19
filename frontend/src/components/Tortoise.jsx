/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 public/models/tortoise.gltf 
*/

import React from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/tortoise.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="blockbench_export">
        <group>
          <group name="body" position={[0, 0.75, 0.063]}>
            <group name="tall" position={[0, 0, 0.688]}>
              <group name="back_tall" position={[0, 0, 0.625]}>
                <mesh name="cube_10" geometry={nodes.cube_10.geometry} material={nodes.cube_10.material} position={[0, 0.125, 0.063]} />
                <mesh name="cube_11" geometry={nodes.cube_11.geometry} material={nodes.cube_11.material} position={[-0.188, 0.25, 0.125]} rotation={[0, 0, 0.654]} />
                <mesh name="cube_12" geometry={nodes.cube_12.geometry} material={nodes.cube_12.material} position={[0.188, 0.25, 0.375]} rotation={[0, 0, -0.654]} />
                <mesh name="cube_13" geometry={nodes.cube_13.geometry} material={nodes.cube_13.material} position={[-0.188, 0.25, 0.375]} rotation={[0, 0, 0.654]} />
                <mesh name="cube_14" geometry={nodes.cube_14.geometry} material={nodes.cube_14.material} position={[0.188, 0.25, 0.125]} rotation={[0, 0, -0.654]} />
              </group>
              <mesh name="cube_8" geometry={nodes.cube_8.geometry} material={nodes.cube_8.material} position={[0, 0.125, 0.063]} />
            </group>
            <group name="neck" position={[0, 0, -0.625]}>
              <group name="head" position={[0, -0.125, -0.5]}>
                <group name="jaw">
                  <mesh name="cube_19" geometry={nodes.cube_19.geometry} material={nodes.cube_19.material} position={[0, -0.313, -0.5]} />
                </group>
                <mesh name="cube_15" geometry={nodes.cube_15.geometry} material={nodes.cube_15.material} position={[0, 0.188, -0.063]} />
                <mesh name="cube_16" geometry={nodes.cube_16.geometry} material={nodes.cube_16.material} position={[0, 0.063, -0.5]} />
                <mesh name="cube_17" geometry={nodes.cube_17.geometry} material={nodes.cube_17.material} position={[-0.438, 0.375, -0.375]} />
                <mesh name="cube_18" geometry={nodes.cube_18.geometry} material={nodes.cube_18.material} position={[0.438, 0.375, -0.375]} />
              </group>
              <mesh name="cube_9" geometry={nodes.cube_9.geometry} material={nodes.cube_9.material} position={[0, -0.25, -0.063]} />
            </group>
            <mesh name="cube" geometry={nodes.cube.geometry} material={nodes.cube.material} position={[0, -0.75, -0.063]} />
            <mesh name="cube_1" geometry={nodes.cube_1.geometry} material={nodes.cube_1.material} position={[0, -0.125, 0]} />
            <mesh name="cube_2" geometry={nodes.cube_2.geometry} material={nodes.cube_2.material} position={[0, 0.5, -0.063]} />
            <mesh name="cube_3" geometry={nodes.cube_3.geometry} material={nodes.cube_3.material} position={[0, 0.5, -0.063]} />
          </group>
          <group name="back_right_leg" position={[0.75, 0.75, 0.375]}>
            <mesh name="cube_4" geometry={nodes.cube_4.geometry} material={nodes.cube_4.material} position={[0.063, -0.75, -0.063]} />
          </group>
          <group name="back_left_leg" position={[-0.75, 0.75, 0.375]}>
            <mesh name="cube_5" geometry={nodes.cube_5.geometry} material={nodes.cube_5.material} position={[-0.063, -0.75, -0.063]} />
          </group>
          <group name="right_leg" position={[0.75, 0.813, -0.25]}>
            <mesh name="cube_6" geometry={nodes.cube_6.geometry} material={nodes.cube_6.material} position={[0.063, -0.813, -0.125]} />
          </group>
          <group name="left_leg" position={[-0.75, 0.813, -0.25]}>
            <mesh name="cube_7" geometry={nodes.cube_7.geometry} material={nodes.cube_7.material} position={[-0.063, -0.813, -0.125]} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/tortoise.gltf')
