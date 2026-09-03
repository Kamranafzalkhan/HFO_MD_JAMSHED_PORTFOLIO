import React, { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/* =========================================================
   CREATE INDIAN FLAG TEXTURE
========================================================= */

function createIndianFlagTexture() {
  const canvas = document.createElement("canvas");

  canvas.width = 1200;
  canvas.height = 800;

  const ctx = canvas.getContext("2d");

  /* =====================================================
     SAFFRON
  ===================================================== */

  ctx.fillStyle = "#FF9D00";

  ctx.fillRect(
    0,
    0,
    1200,
    266.666
  );

  /* =====================================================
     WHITE
  ===================================================== */

  ctx.fillStyle = "#FFFFFF";

  ctx.fillRect(
    0,
    266.666,
    1200,
    266.666
  );

  /* =====================================================
     GREEN
  ===================================================== */

  ctx.fillStyle = "#00B83F";

  ctx.fillRect(
    0,
    533.333,
    1200,
    266.667
  );

  /* =====================================================
     ASHOKA CHAKRA
  ===================================================== */

  const cx = 600;
  const cy = 400;
  const radius = 105;

  /* Outer circle */

  ctx.strokeStyle = "#001F8F";
  ctx.lineWidth = 10;

  ctx.beginPath();

  ctx.arc(
    cx,
    cy,
    radius,
    0,
    Math.PI * 2
  );

  ctx.stroke();

  /* 24 spokes */

  ctx.strokeStyle = "#001F8F";
  ctx.lineWidth = 5;

  for (let i = 0; i < 24; i++) {
    const angle =
      (i * Math.PI * 2) / 24;

    const innerRadius = 12;

    const x1 =
      cx +
      Math.cos(angle) *
        innerRadius;

    const y1 =
      cy +
      Math.sin(angle) *
        innerRadius;

    const x2 =
      cx +
      Math.cos(angle) *
        radius;

    const y2 =
      cy +
      Math.sin(angle) *
        radius;

    ctx.beginPath();

    ctx.moveTo(x1, y1);

    ctx.lineTo(x2, y2);

    ctx.stroke();
  }

  /* Center */

  ctx.fillStyle = "#001F8F";

  ctx.beginPath();

  ctx.arc(
    cx,
    cy,
    13,
    0,
    Math.PI * 2
  );

  ctx.fill();

  /* =====================================================
     THREE TEXTURE
  ===================================================== */

  const texture =
    new THREE.CanvasTexture(canvas);

  texture.colorSpace =
    THREE.SRGBColorSpace;

  texture.anisotropy = 8;

  texture.needsUpdate = true;

  return texture;
}


/* =========================================================
   INDIAN FLAG COMPONENT
========================================================= */

export function IndianFlag() {

  /*
   * SMALLER FLAG
   *
   * Original:
   * 2.45 x 1.63
   *
   * New:
   * 1.55 x 1.03
   */

  const FLAG_WIDTH = 1.55;
  const FLAG_HEIGHT = 0.92;


  /* =======================================================
     CLOTH GEOMETRY
  ======================================================= */

  const geometry = useMemo(() => {

    const geo =
      new THREE.PlaneGeometry(
        FLAG_WIDTH,
        FLAG_HEIGHT,
        50,
        30
      );

    /*
     * Move geometry so that
     * its LEFT EDGE starts at X = 0.
     *
     * Therefore:
     *
     * Pole = X 0
     * Flag = X 0 → 1.55
     */

    geo.translate(
      FLAG_WIDTH / 2,
      0,
      0
    );

    return geo;

  }, []);


  /* =======================================================
     STORE ORIGINAL VERTICES
  ======================================================= */

  const originalPositions =
    useMemo(() => {

      const position =
        geometry.attributes.position;

      const values = [];

      for (
        let i = 0;
        i < position.count;
        i++
      ) {

        values.push({
          x: position.getX(i),
          y: position.getY(i),
          z: position.getZ(i)
        });

      }

      return values;

    }, [geometry]);


  /* =======================================================
     FLAG TEXTURE
  ======================================================= */

  const texture = useMemo(
    () => createIndianFlagTexture(),
    []
  );


  /* =======================================================
     CLOTH ANIMATION
  ======================================================= */

  useFrame((state) => {

    const time =
      state.clock.getElapsedTime();

    const position =
      geometry.attributes.position;


    for (
      let i = 0;
      i < position.count;
      i++
    ) {

      const original =
        originalPositions[i];


      /*
       * 0 = pole
       * 1 = free edge
       */

      const x =
        original.x / FLAG_WIDTH;


      /*
       * Keep pole edge almost fixed.
       */

      const strength =
        Math.pow(x, 1.7);


      /* =================================================
         LARGE CLOTH WAVE
      ================================================= */

      const wave1 =
        Math.sin(
          time * 2.3 +
          x * 8
        ) * 0.13;


      /* =================================================
         SMALL CLOTH DETAIL
      ================================================= */

      const wave2 =
        Math.sin(
          time * 4 +
          x * 16
        ) * 0.035;


      /* =================================================
         NATURAL CURVE
      ================================================= */

      const curve =
        Math.sin(
          x * Math.PI
        ) * 0.025;


      /* =================================================
         FINAL DEPTH
      ================================================= */

      position.setZ(
        i,
        (
          wave1 +
          wave2
        ) * strength +
        curve * strength
      );


      /* =================================================
         SMALL VERTICAL MOVEMENT
      ================================================= */

      const verticalWave =
        Math.sin(
          time * 2.1 +
          x * 7
        ) *
        0.018 *
        strength;


      position.setY(
        i,
        original.y +
        verticalWave
      );

    }


    position.needsUpdate = true;

    geometry.computeVertexNormals();

  });


  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {

    return () => {

      geometry.dispose();

      texture.dispose();

    };

  }, [
    geometry,
    texture
  ]);


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <group>

      {/* =================================================
          METALLIC POLE
      ================================================= */}

      <mesh
        position={[
          0,
          0,
          0
        ]}
      >

        <cylinderGeometry
          args={[
            0.028,
            0.038,
            4,
            15
          ]}
        />

        <meshStandardMaterial
          color="#BFC5CA"
          metalness={1}
          roughness={0.18}
        />

      </mesh>


      {/* =================================================
          GOLDEN FINIAL
      ================================================= */}

      <mesh
        position={[
          0,
          2.34,
          0
        ]}
      >

        <sphereGeometry
          args={[
            0.075,
            32,
            32
          ]}
        />

        <meshStandardMaterial
          color="#FFD54A"
          metalness={1}
          roughness={0.12}
          emissive="#8A6500"
          emissiveIntensity={0.35}
        />

      </mesh>


      {/* =================================================
          FLAG ATTACHMENT
      ================================================= */}

      <mesh
        position={[
          0,
          1.77,
          0
        ]}
      >

        <cylinderGeometry
          args={[
            0.04,
            0.04,
            0.08,
            20
          ]}
        />

        <meshStandardMaterial
          color="#FFD54A"
          metalness={1}
          roughness={0.15}
          emissive="#8A6500"
          emissiveIntensity={0.3}
        />

      </mesh>


      {/* =================================================
          FLAG
      ================================================= */}

      <mesh
        geometry={geometry}
        position={[
          0,
          1.32,
          0.015
        ]}
      >

        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}

          /*
           * Bright surface
           */

          color="#FFFFFF"

          roughness={0.55}

          metalness={0}

          /*
           * Subtle emission makes
           * the colors pop in dark scene.
           */

          emissive="#FFFFFF"
          emissiveMap={texture}
          emissiveIntensity={0.28}

          toneMapped={false}
        />

      </mesh>


      {/* =================================================
          SOFT FLAG AURA
      ================================================= */}

      <mesh
        geometry={geometry}
        position={[
          0,
          1.32,
          -0.025
        ]}
        scale={[
          1.015,
          1.015,
          1
        ]}
      >

        <meshBasicMaterial
          map={texture}
          side={THREE.BackSide}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />

      </mesh>

    </group>

  );
}