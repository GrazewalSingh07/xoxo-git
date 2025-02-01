// import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
// import { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import gsap from "gsap";

// const Model = () => {
//   const { scene } = useGLTF("/FinalRendering.glb");
//   const modelRef = useRef();

//   const handleMouseMove = (event) => {
//     if (!modelRef.current) return;

//     // Normalize cursor position (-1 to 1)
//     const x = (event.clientX / window.innerWidth) * 2 - 1;
//     const y = (event.clientY / window.innerHeight) * 2 - 1;

//     // Smoothly animate model position & rotation
//     gsap.to(modelRef.current.rotation, { 
//       x: y * 0.2, 
//       y: x * 0.3, 
//       duration: 0.5, 
//       ease: "power2.out" 
//     });

//     gsap.to(modelRef.current.position, { 
//       x: x * 0.5, 
//       y: y * 0.5, 
//       duration: 0.5, 
//       ease: "power2.out" 
//     });
//   };

//   return (
//     <group ref={modelRef} scale={0.1} position={[0, -1, 0]}>
//       <primitive object={scene} onPointerMove={handleMouseMove} />
//     </group>
//   );
// };

// export const ModelParallax = () => {
//   return (
//     <Canvas
//       camera={{ position: [0, 1, -4.5], near: 0.01, far: 1000 }} // Camera inside the model
//       style={{ width: "100vw", height: "100vh" }}
//     >
//       <ambientLight intensity={0.5} />
//       <Environment preset="lobby" />
//       <Model />
//       <OrbitControls   />
//     </Canvas>
//   );
// };
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
 
import gsap from "gsap";
export function Model(props) {
  const { nodes, materials } = useGLTF('/FinalRendering.glb')
  const modelRef = useRef();
  const isHovered = useRef(false);

  // Floating animation
  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.position.y += Math.sin(clock.getElapsedTime() * 2) * 0.003;
    }
  });

  // Handle hover start (activate parallax)
  const handlePointerOver = () => {
    isHovered.current = true;
  };

  // Handle hover end (reset to original position)
  const handlePointerOut = () => {
    isHovered.current = false;
    gsap.to(modelRef.current.rotation, { x: 0, y: 0, duration: 0.5 });
    gsap.to(modelRef.current.position, { x: 0, y: 0, duration: 0.5 });
  };

  // Parallax effect on mouse move (only when hovered)
  const handleMouseMove = (event) => {
    if (!isHovered.current || !modelRef.current) return;

    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;

    gsap.to(modelRef.current.rotation, { 
      x: y * 0.1, 
      y: x * 0.2, 
      duration: 0.3, 
      ease: "power2.out" 
    });

    gsap.to(modelRef.current.position, { 
      x: x * 0.3, 
      y: y * 0.3, 
      duration: 0.3, 
      ease: "power2.out" 
    });
  };
  return (
    <group  ref={modelRef}{...props} dispose={null} onPointerMove={handleMouseMove} 
    onPointerOver={handlePointerOver} 
    onPointerOut={handlePointerOut}>
      <group position={[-6.601, -5.98, -15.425]} rotation={[-Math.PI / 2, 0, 0]} scale={0.077}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[146.456, -169.293, -99.182]}>
            <group position={[-60.414, 247.24, 300.227]}>
              <mesh geometry={nodes.Wall_1_1_Wall_1_0_1.geometry} material={materials.Wall_1} />
              <mesh geometry={nodes.Wall_1_1_Wall_1_0_2.geometry} material={materials['Mat.3']} />
              <mesh geometry={nodes.Wall_1_1_Wall_1_0_3.geometry} material={materials['Mat.3.1']} />
              <mesh geometry={nodes.Wall_1_1_Wall_1_0_4.geometry} material={materials['Astronaut_2.1']} />
              <mesh geometry={nodes.Wall_1_1_Wall_1_0_5.geometry} material={materials['Astronaut_1.2']} />
              <mesh geometry={nodes.Wall_1_1_Wall_1_0_6.geometry} material={materials.material} />
              <mesh geometry={nodes.Wall_1_1_Wall_1_0_7.geometry} material={materials['Mat.2']} />
              <mesh geometry={nodes.Wall_1_1_Wall_1_0_8.geometry} material={materials.Vloer} />
              <mesh geometry={nodes.Wall_1_1_Wall_1_0_9.geometry} material={materials.rope} />
              <mesh geometry={nodes.Wall_1_1_Wall_1_0_10.geometry} material={materials.Stenen} />
              <mesh geometry={nodes.Wall_1_1_Wall_1_0_11.geometry} material={materials['Mat.1']} />
              <mesh geometry={nodes.Wall_1_1_Wall_1_0_12.geometry} material={materials.Rand} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

 

export const ModelParallax = () => {
  return (
    <div style={{width:'100%',}}>
     
      <Canvas style={{height:'80vh',width:'80vw',margin:'auto',paddingTop:'8vh'}} camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <Environment preset="lobby" />
        <Model />
        <OrbitControls />
       
      </Canvas>
    </div>
  );
};
