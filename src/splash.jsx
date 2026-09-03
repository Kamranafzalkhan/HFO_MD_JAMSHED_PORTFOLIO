import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function splash({ onComplete }) {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) return;

    // =========================================================
    // SCENE
    // =========================================================

    const scene = new THREE.Scene();

    scene.background = new THREE.Color("#02070d");

    scene.fog = new THREE.FogExp2("#02070d", 0.018);

    // =========================================================
    // CAMERA
    // =========================================================

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );

    camera.position.set(0, 8.5, 15);
    camera.lookAt(0, 0, 0);

    // =========================================================
    // RENDERER
    // =========================================================

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mount.appendChild(renderer.domElement);

    // =========================================================
    // LIGHTING
    // =========================================================

    const ambientLight = new THREE.AmbientLight(
      "#47728c",
      1.2
    );

    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(
      "#168cff",
      8,
      35
    );

    blueLight.position.set(0, 5, 2);

    scene.add(blueLight);

    const topLight = new THREE.DirectionalLight(
      "#dceeff",
      2.5
    );

    topLight.position.set(5, 12, 8);

    topLight.castShadow = true;

    scene.add(topLight);

    // =========================================================
    // GROUND
    // =========================================================

    const groundGeometry = new THREE.PlaneGeometry(
      80,
      80
    );

    const groundMaterial = new THREE.MeshStandardMaterial({
      color: "#030b12",
      roughness: 0.92,
      metalness: 0.25,
    });

    const ground = new THREE.Mesh(
      groundGeometry,
      groundMaterial
    );

    ground.rotation.x = -Math.PI / 2;

    ground.receiveShadow = true;

    scene.add(ground);

    // =========================================================
    // GRID
    // =========================================================

    const grid = new THREE.GridHelper(
      60,
      60,
      "#0b5a87",
      "#062238"
    );

    grid.position.y = 0.02;

    grid.material.transparent = true;
    grid.material.opacity = 0.22;

    scene.add(grid);

    // =========================================================
    // RADAR GROUND SYSTEM
    // =========================================================

    const radarSystem = new THREE.Group();

    radarSystem.position.y = 0.08;

    scene.add(radarSystem);

    const rings = [];

    const ringSizes = [
      2.4,
      3.7,
      5.0,
      6.3,
    ];

    ringSizes.forEach((radius, index) => {
      const geometry =
        new THREE.RingGeometry(
          radius - 0.012,
          radius,
          128
        );

      const material =
        new THREE.MeshBasicMaterial({
          color:
            index === ringSizes.length - 1
              ? "#168cff"
              : "#0a70aa",
          transparent: true,
          opacity:
            index === ringSizes.length - 1
              ? 0.75
              : 0.32,
          side: THREE.DoubleSide,
        });

      const ring = new THREE.Mesh(
        geometry,
        material
      );

      ring.rotation.x = -Math.PI / 2;

      radarSystem.add(ring);

      rings.push(ring);
    });

    // =========================================================
    // RADAR RADIAL TICKS
    // =========================================================

    const tickGroup = new THREE.Group();

    for (let i = 0; i < 180; i++) {
      const angle =
        (i / 180) * Math.PI * 2;

      const inner =
        i % 5 === 0 ? 5.85 : 6.08;

      const outer = 6.38;

      const points = [];

      points.push(
        new THREE.Vector3(
          Math.cos(angle) * inner,
          0,
          Math.sin(angle) * inner
        )
      );

      points.push(
        new THREE.Vector3(
          Math.cos(angle) * outer,
          0,
          Math.sin(angle) * outer
        )
      );

      const geometry =
        new THREE.BufferGeometry().setFromPoints(
          points
        );

      const material =
        new THREE.LineBasicMaterial({
          color:
            i % 5 === 0
              ? "#42b8ff"
              : "#07527e",
          transparent: true,
          opacity:
            i % 5 === 0
              ? 0.7
              : 0.3,
        });

      const tick =
        new THREE.Line(
          geometry,
          material
        );

      tickGroup.add(tick);
    }

    radarSystem.add(tickGroup);

    // =========================================================
    // RADAR CROSSHAIR
    // =========================================================

    const crossGroup = new THREE.Group();

    const crossMaterial =
      new THREE.LineBasicMaterial({
        color: "#087bc0",
        transparent: true,
        opacity: 0.35,
      });

    const crossSize = 6.3;

    const horizontalGeometry =
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(
          -crossSize,
          0,
          0
        ),
        new THREE.Vector3(
          crossSize,
          0,
          0
        ),
      ]);

    const verticalGeometry =
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(
          0,
          0,
          -crossSize
        ),
        new THREE.Vector3(
          0,
          0,
          crossSize
        ),
      ]);

    crossGroup.add(
      new THREE.Line(
        horizontalGeometry,
        crossMaterial
      )
    );

    crossGroup.add(
      new THREE.Line(
        verticalGeometry,
        crossMaterial
      )
    );

    radarSystem.add(crossGroup);

    // =========================================================
    // RADAR SWEEP
    // =========================================================

    const sweepGroup = new THREE.Group();

    const sweepGeometry =
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0.08, 0),
        new THREE.Vector3(6.3, 0.08, 0),
      ]);

    const sweepMaterial =
      new THREE.LineBasicMaterial({
        color: "#48baff",
        transparent: true,
        opacity: 0.95,
      });

    const sweep =
      new THREE.Line(
        sweepGeometry,
        sweepMaterial
      );

    sweepGroup.add(sweep);

    const glowGeometry =
      new THREE.CircleGeometry(
        6.3,
        64,
        -0.25,
        0.5
      );

    const glowMaterial =
      new THREE.MeshBasicMaterial({
        color: "#168cff",
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      });

    const glow =
      new THREE.Mesh(
        glowGeometry,
        glowMaterial
      );

    glow.rotation.x = -Math.PI / 2;

    sweepGroup.add(glow);

    radarSystem.add(sweepGroup);

    // =========================================================
    // VEHICLE
    // =========================================================

    const vehicle = new THREE.Group();

    vehicle.position.y = 0.5;

    scene.add(vehicle);

    // Main body

    const bodyGeometry =
      new THREE.BoxGeometry(
        4.5,
        1.25,
        2.1
      );

    const bodyMaterial =
      new THREE.MeshStandardMaterial({
        color: "#101b23",
        metalness: 0.85,
        roughness: 0.35,
      });

    const body =
      new THREE.Mesh(
        bodyGeometry,
        bodyMaterial
      );

    body.castShadow = true;

    vehicle.add(body);

    // Cabin

    const cabinGeometry =
      new THREE.BoxGeometry(
        1.55,
        1.25,
        1.9
      );

    const cabinMaterial =
      new THREE.MeshStandardMaterial({
        color: "#172630",
        metalness: 0.75,
        roughness: 0.32,
      });

    const cabin =
      new THREE.Mesh(
        cabinGeometry,
        cabinMaterial
      );

    cabin.position.set(
      -1.25,
      1.15,
      0
    );

    cabin.castShadow = true;

    vehicle.add(cabin);

    // Windows

    const windowMaterial =
      new THREE.MeshStandardMaterial({
        color: "#06121d",
        metalness: 0.5,
        roughness: 0.15,
        emissive: "#061b2b",
        emissiveIntensity: 0.8,
      });

    const frontWindow =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          0.08,
          0.58,
          1.35
        ),
        windowMaterial
      );

    frontWindow.position.set(
      -2.04,
      1.35,
      0
    );

    vehicle.add(frontWindow);

    // =========================================================
    // WHEELS
    // =========================================================

    const wheelGeometry =
      new THREE.CylinderGeometry(
        0.55,
        0.55,
        0.35,
        32
      );

    const wheelMaterial =
      new THREE.MeshStandardMaterial({
        color: "#050709",
        metalness: 0.4,
        roughness: 0.8,
      });

    const wheelPositions = [
      [-1.45, -0.55, 1.08],
      [1.45, -0.55, 1.08],
      [-1.45, -0.55, -1.08],
      [1.45, -0.55, -1.08],
    ];

    wheelPositions.forEach(
      ([x, y, z]) => {
        const wheel =
          new THREE.Mesh(
            wheelGeometry,
            wheelMaterial
          );

        wheel.rotation.x =
          Math.PI / 2;

        wheel.position.set(
          x,
          y,
          z
        );

        wheel.castShadow = true;

        vehicle.add(wheel);
      }
    );

    // =========================================================
    // RADAR MAST
    // =========================================================

    const mastGeometry =
      new THREE.CylinderGeometry(
        0.22,
        0.28,
        2.4,
        24
      );

    const mastMaterial =
      new THREE.MeshStandardMaterial({
        color: "#27353d",
        metalness: 0.9,
        roughness: 0.28,
      });

    const mast =
      new THREE.Mesh(
        mastGeometry,
        mastMaterial
      );

    mast.position.y = 2.25;

    mast.castShadow = true;

    vehicle.add(mast);

    // =========================================================
    // RADAR DISH
    // =========================================================

    const dishSystem =
      new THREE.Group();

    dishSystem.position.y = 3.55;

    vehicle.add(dishSystem);

    const dishGeometry =
      new THREE.CylinderGeometry(
        1.45,
        1.15,
        0.22,
        48,
        1,
        false
      );

    const dishMaterial =
      new THREE.MeshStandardMaterial({
        color: "#1b2932",
        metalness: 0.85,
        roughness: 0.3,
        wireframe: true,
      });

    const dish =
      new THREE.Mesh(
        dishGeometry,
        dishMaterial
      );

    dish.rotation.z =
      Math.PI / 2;

    dish.rotation.x =
      -0.35;

    dishSystem.add(dish);

    // Dish center

    const dishCenter =
      new THREE.Mesh(
        new THREE.SphereGeometry(
          0.22,
          24,
          24
        ),
        new THREE.MeshStandardMaterial({
          color: "#4bbcff",
          emissive: "#087dcc",
          emissiveIntensity: 2,
        })
      );

    dishSystem.add(dishCenter);

    // =========================================================
    // SIGNAL PARTICLES
    // =========================================================

    const particleCount = 140;

    const particlePositions =
      new Float32Array(
        particleCount * 3
      );

    for (
      let i = 0;
      i < particleCount;
      i++
    ) {
      const angle =
        Math.random() *
        Math.PI *
        2;

      const radius =
        2 +
        Math.random() * 9;

      particlePositions[
        i * 3
      ] =
        Math.cos(angle) *
        radius;

      particlePositions[
        i * 3 + 1
      ] =
        0.08 +
        Math.random() * 1.8;

      particlePositions[
        i * 3 + 2
      ] =
        Math.sin(angle) *
        radius;
    }

    const particleGeometry =
      new THREE.BufferGeometry();

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        particlePositions,
        3
      )
    );

    const particleMaterial =
      new THREE.PointsMaterial({
        color: "#35adff",
        size: 0.045,
        transparent: true,
        opacity: 0.75,
      });

    const particles =
      new THREE.Points(
        particleGeometry,
        particleMaterial
      );

    scene.add(particles);

    // =========================================================
    // ANIMATION
    // =========================================================

    const clock =
      new THREE.Clock();

    let animationFrame;

    const animate = () => {
      animationFrame =
        requestAnimationFrame(
          animate
        );

      const elapsed =
        clock.getElapsedTime();

      // Radar rotation
      sweepGroup.rotation.y =
        -elapsed * 1.8;

      // Ground radar slowly rotates
      radarSystem.rotation.y =
        elapsed * 0.08;

      // Radar dish rotates
      dishSystem.rotation.y =
        elapsed * 1.25;

      // Signal particles
      particles.rotation.y =
        elapsed * 0.025;

      // Vehicle subtle breathing movement
      vehicle.position.y =
        0.5 +
        Math.sin(elapsed * 2) *
          0.025;

      // Cinematic camera
      camera.position.x =
        Math.sin(elapsed * 0.18) *
        1.1;

      camera.position.y =
        8.2 +
        Math.sin(elapsed * 0.35) *
          0.25;

      camera.lookAt(
        0,
        1.1,
        0
      );

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // =========================================================
    // PROGRESS
    // =========================================================

    const start =
      performance.now();

    const duration = 8000;

    let progressFrame;

    const updateProgress = (
      now
    ) => {
      const elapsed =
        now - start;

      const value = Math.min(
        elapsed / duration,
        1
      );

      setProgress(
        Math.floor(value * 100)
      );

      if (value < 1) {
        progressFrame =
          requestAnimationFrame(
            updateProgress
          );
      } else {
        setTimeout(() => {
          onComplete();
        }, 150);
      }
    };

    progressFrame =
      requestAnimationFrame(
        updateProgress
      );

    // =========================================================
    // RESIZE
    // =========================================================

    const handleResize = () => {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    // =========================================================
    // CLEANUP
    // =========================================================

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      cancelAnimationFrame(
        progressFrame
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      renderer.dispose();

      if (
        renderer.domElement &&
        mount.contains(
          renderer.domElement
        )
      ) {
        mount.removeChild(
          renderer.domElement
        );
      }
    };
  }, [onComplete]);

  return (
    <div className="splash-screen">

      {/* THREE.JS */}
      <div
        ref={mountRef}
        className="splash-canvas"
      />

      {/* DARK OVERLAY */}
      <div className="splash-overlay" />

      {/* HUD CORNERS */}

      <div className="hud-corner top-left" />
      <div className="hud-corner top-right" />
      <div className="hud-corner bottom-left" />
      <div className="hud-corner bottom-right" />

      {/* TOP SYSTEM INFO */}

      <div className="splash-system left">
        <span>SYSTEM INITIALIZED</span>
        <small>RADAR SYSTEM CHECK</small>
        <small>VECTOR CALIBRATION</small>
        <small>SIGNAL ACQUISITION</small>
        <small>
          ALL SYSTEMS :
          <b>NOMINAL</b>
        </small>
      </div>

      <div className="splash-system right">
        <span>SECURE CONNECTION</span>
        <small>INDIAN AIR FORCE</small>
        <small>LEGACY ARCHIVE</small>
        <small>SERVICE BEFORE SELF</small>
      </div>

      {/* CENTER BRAND */}

      <div className="splash-brand">

        <div className="splash-emblem">
          ✦
        </div>

        <div className="splash-title">
          IAF
        </div>

        {/* <div className="splash-subtitle">
          LEGACY ARCHIVE
        </div> */}

      </div>

      {/* BOTTOM */}

      <div className="splash-bottom">

        <div className="splash-message">
          PREPARING FOR THE JOURNEY AHEAD
        </div>

        <div className="splash-loading-label">
          <span>LOADING EXPERIENCE</span>
          <b>{progress}%</b>
        </div>

        <div className="splash-progress">
          <div
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

      </div>

      <div className="splash-classified">
        CLASSIFIED
        <br />
        DISCRETION ADVISED
      </div>

      <div className="splash-status">
        STRENGTH
        <br />
        COURAGE
        <br />
        COMMITMENT
      </div>

    </div>
  );
}