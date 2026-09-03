 import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { RadarCore } from "./components";
 
 function RadarSceneUpper() {

  return (

    <Canvas
      camera={{
        position: [
          0,
          2.8,
          4.6
        ],
        fov: 42
      }}
    >

      <ambientLight
        intensity={0.5}
      />

      <Stars
        radius={25}
        depth={18}
        count={500}
        factor={1.2}
        saturation={0}
        fade
        speed={0.3}
      />

      <RadarCore />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
      />

    </Canvas>

  );

}
export default RadarSceneUpper;