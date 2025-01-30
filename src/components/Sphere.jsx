import { Environment, OrbitControls, Stage } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

const Main=()=>{
    const sphere = useRef()
    useFrame(()=>{
       
      if(sphere.current) {
         
        sphere.current.position.x += 0.005
        sphere.current.rotation.y+= 0.005
      }
  
    })
    return <mesh position={[0,-1,0]} ref={sphere} >
    <sphereGeometry args={[1, 24, 24]} />
    <meshStandardMaterial color="hotpink" />
  </mesh>
}
export const Sphere = () => {
   
  return (
    <Canvas shadows>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset='sunset'/>
      <Stage>
      <Main/>
      </Stage>
  <OrbitControls/>
    </Canvas>
  )
}

