import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import { feature } from "topojson-client";

import { IndianFlag } from "./indianflag";

import {
  motion,
  AnimatePresence,
  useInView
} from "framer-motion";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "@vnedyalk0v/react19-simple-maps"; 

import {
  Canvas,
  useFrame
} from "@react-three/fiber";

import {
  Stars,
  OrbitControls
} from "@react-three/drei";

import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiCrosshair,
  FiImage,
  FiMapPin,
  FiStar,
  FiX
} from "react-icons/fi";

import {
  GiAirplane,
  GiRadarSweep,
  GiMissileLauncher,
  GiLaurelsTrophy,
  GiMedal
} from "react-icons/gi";


/* =========================================================
   3D RADAR
========================================================= */

export function RadarCore() {

  const radar = useRef(null);

  useFrame((_, delta) => {

    if (radar.current) {

      radar.current.rotation.y +=
        delta * 0.12;

    }

  });

  return (

    <group ref={radar}>

      <mesh
        rotation={[
          -Math.PI / 2,
          0,
          0
        ]}
      >

        <ringGeometry
          args={[
            1.7,
            2.2,
            64
          ]}
        />

        <meshBasicMaterial
          color="#16456a"
          wireframe
          transparent
          opacity={0.55}
        />

      </mesh>


      <mesh
        rotation={[
          -Math.PI / 2,
          0,
          0
        ]}
      >

        <ringGeometry
          args={[
            0.9,
            0.94,
            64
          ]}
        />

        <meshBasicMaterial
          color="#2ca7ff"
          wireframe
          transparent
          opacity={0.5}
        />

      </mesh>


      <mesh
        rotation={[
          -Math.PI / 2,
          0,
          0
        ]}
      >

        <circleGeometry
          args={[
            2.2,
            64
          ]}
        />

        <meshBasicMaterial
          color="#071522"
          transparent
          opacity={0.45}
        />

      </mesh>


      <mesh>

        <sphereGeometry
          args={[
            0.045,
            16,
            16
          ]}
        />

        <meshBasicMaterial
          color="#8ed7ff"
        />

      </mesh>

    </group>

  );

}



export function RadarScene() {

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

      <directionalLight
        position={[
          4,
          6,
          5
        ]}
        intensity={1.5}
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

      {/* 🇮🇳 INDIAN FLAG */}

      <IndianFlag />

      {/* Your existing radar */}

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

/* =========================================================
   AIRCRAFT SVG
========================================================= */

export function JetIcon({
  className = ""
}) {

  return (

    <svg
      className={className}
      viewBox="0 0 220 80"
    >

      <path
        d="
        M8 39
        h63
        L111 8
        l12 2
        -16 29
        h30
        l33-19
        10 3
        -24 16
        h42
        l14 5
        -14 5
        h-42
        l24 16
        -10 3
        -33-19
        h-30
        l16 29
        -12 2
        -40-31
        H8
        "
        fill="currentColor"
      />

    </svg>

  );

}


/* =========================================================
   SECTION HEADING
========================================================= */

export function SectionHeading({
  number,
  title,
  description
}) {

  return (

    <div className="section-heading">

      <div className="section-number">
        {number}
      </div>

      <h2>
        {title}
      </h2>

      <p>
        {description}
      </p>

    </div>

  );

}


/* =========================================================
   CAREER TIMELINE ITEM
========================================================= */

// function TimelineJourneyItem({ item, index, active, setActive, isRetirement }) {
//   const ref = useRef(null);
//   const isInView = useInView(ref, {
//     amount: 0.55,
//     margin: "-18% 0px -28% 0px"
//   });

//   useEffect(() => {
//     if (isInView) setActive(index);
//   }, [isInView, index, setActive]);

//   const retirement = Boolean(isRetirement);

//   return (
//     <motion.article
//       ref={ref}
//       data-index={index}
//       className={`journey-item ${active === index ? "is-active" : ""} ${retirement ? "is-retirement" : ""}`}
//       initial={{ opacity: 0, y: 55 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: false, amount: 0.28 }}
//       transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//     >
//       <div className="journey-node-wrap">
//         <motion.div
//           className="journey-node"
//           animate={
//             active === index
//               ? {
//                   scale: [1, 1.15, 1],
//                   boxShadow: retirement
//                     ? [
//                         "0 0 8px rgba(255,50,50,.25)",
//                         "0 0 32px rgba(255,50,50,.9)",
//                         "0 0 8px rgba(255,50,50,.25)"
//                       ]
//                     : [
//                         "0 0 8px rgba(82,255,145,.2)",
//                         "0 0 30px rgba(82,255,145,.85)",
//                         "0 0 8px rgba(82,255,145,.2)"
//                       ]
//                 }
//               : { scale: 1 }
//           }
//           transition={{ duration: 1.35, repeat: active === index ? Infinity : 0, ease: "easeInOut" }}
//         >
//           <span />
//         </motion.div>
//       </div>

//       <button type="button" className="journey-card" onClick={() => setActive(index)}>
//         <div className={`journey-date ${retirement ? "red" : ""}`}>{item.year}</div>
//         <h3>{item.title}</h3>

//         <div className={`journey-location ${retirement ? "red" : ""}`}>
//           {retirement ? <FiStar /> : <FiMapPin />}
//           <span>{item.place || item.location}</span>
//         </div>

//         <p>{item.description}</p>

//         {item.highlights?.length > 0 && (
//           <ul className="journey-highlights">
//             {item.highlights.map((highlight) => (
//               <li key={highlight}>{highlight}</li>
//             ))}
//           </ul>
//         )}
//       </button>
//     </motion.article>
//   );
// }

function TimelineJourneyItem({
  item,
  index,
  active,
  setActive,
  isRetirement,
}) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    amount: 0.55,
    margin: "-18% 0px -28% 0px",
  });

  useEffect(() => {
    if (isInView) {
      setActive(index);
    }
  }, [isInView, index, setActive]);

  const retirement = Boolean(isRetirement);

  return (
    <motion.article
      ref={ref}
      data-index={index}
      className={`journey-item ${
        active === index ? "is-active" : ""
      } ${retirement ? "is-retirement" : ""}`}
      initial={{
        opacity: 0,
        y: 45,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount: 0.25,
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* CENTER TIMELINE NODE */}
      <div className="journey-node-wrap">
        <motion.div
          className="journey-node"
          animate={
            active === index
              ? {
                  scale: [1, 1.18, 1],
                  boxShadow: retirement
                    ? [
                        "0 0 8px rgba(255,50,50,.25)",
                        "0 0 32px rgba(255,50,50,.95)",
                        "0 0 8px rgba(255,50,50,.25)",
                      ]
                    : [
                        "0 0 8px rgba(82,255,145,.2)",
                        "0 0 30px rgba(82,255,145,.85)",
                        "0 0 8px rgba(82,255,145,.2)",
                      ],
                }
              : {
                  scale: 1,
                }
          }
          transition={{
            duration: 1.35,
            repeat:
              active === index ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <span />
        </motion.div>
      </div>

      {/* LEFT SIDE */}
      <div className="journey-left">
        <div
          className={`journey-date ${
            retirement ? "red" : ""
          }`}
        >
          {item.year}
        </div>

        <h3>{item.title}</h3>

        <div
          className={`journey-location ${
            retirement ? "red" : ""
          }`}
        >
          {retirement ? (
            <FiStar />
          ) : (
            <FiMapPin />
          )}

          <span>
            {item.place || item.location}
          </span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <button
        type="button"
        className="journey-right"
        onClick={() => setActive(index)}
      >
        <p>{item.description}</p>

        {item.highlights?.length > 0 && (
          <ul className="journey-highlights">
            {item.highlights.map((highlight) => (
              <li key={highlight}>
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </button>
    </motion.article>
  );
}

/* =========================================================
   CAREER TIMELINE
========================================================= */

// export function TimelineRail({ items, active = 0, setActive }) {
//   const [localActive, setLocalActive] = useState(0);
//   const controlled = typeof setActive === "function";
//   const current = controlled ? active : localActive;
//   const update = controlled ? setActive : setLocalActive;

//   if (!items?.length) return null;

//   return (
//     <div className="journey-timeline-panel">
//       <div className="journey-timeline-topline">
//         <div className="journey-live-label">
//           <span className="live-dot" />
//           SERVICE JOURNEY
//         </div>
//         <div className="journey-progress-count">
//           {String(Math.min(current + 1, items.length)).padStart(2, "0")}
//           <span>/</span>
//           {String(items.length).padStart(2, "0")}
//         </div>
//       </div>

//       <div className="journey-timeline">
//         <div className="journey-line" />
//         {items.map((item, index) => (
//           <TimelineJourneyItem
//             key={`${item.title}-${index}`}
//             item={item}
//             index={index}
//             active={current}
//             setActive={update}
//             isRetirement={index === items.length - 1}
//           />
//         ))}
//       </div>

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={current}
//           className={`journey-detail ${current === items.length - 1 ? "retirement-detail" : ""}`}
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -12 }}
//           transition={{ duration: 0.28 }}
//         >
//           <div>
//             <span>{items[current]?.label || "SERVICE RECORD"}</span>
//             <strong>{items[current]?.title}</strong>
//           </div>
//           <small>{current === items.length - 1 ? "MISSION COMPLETE" : "SERVICE RECORD"}</small>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// }

export function TimelineRail({
  items,
  active = 0,
  setActive,
}) {
  const [localActive, setLocalActive] =
    useState(0);

  const controlled =
    typeof setActive === "function";

  const current = controlled
    ? active
    : localActive;

  const update = controlled
    ? setActive
    : setLocalActive;

  if (!items?.length) {
    return null;
  }

  return (
    <div className="journey-timeline-panel">

      {/* TOP HEADER */}
      <div className="journey-timeline-topline">
        <div className="journey-live-label">
          <span className="live-dot" />
          SERVICE JOURNEY
        </div>

        <div className="journey-progress-count">
          {String(
            Math.min(
              current + 1,
              items.length
            )
          ).padStart(2, "0")}

          <span>/</span>

          {String(items.length).padStart(
            2,
            "0"
          )}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="journey-timeline">

        {/* CENTER LINE */}
        <div className="journey-line" />

        {items.map((item, index) => (
          <TimelineJourneyItem
            key={`${item.title}-${index}`}
            item={item}
            index={index}
            active={current}
            setActive={update}
            isRetirement={
              index === items.length - 1
            }
          />
        ))}
      </div>

      {/* CURRENT RECORD */}
      {/* <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className={`journey-detail ${
            current === items.length - 1
              ? "retirement-detail"
              : ""
          }`}
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -12,
          }}
          transition={{
            duration: 0.28,
          }}
        >
          <div>
            <span>
              {items[current]?.label ||
                "SERVICE RECORD"}
            </span>

            <strong>
              {items[current]?.title}
            </strong>
          </div>

          <small>
            {current === items.length - 1
              ? "MISSION COMPLETE"
              : "SERVICE RECORD"}
          </small>
        </motion.div>
      </AnimatePresence> */}
    </div>
  );
}

/* =========================================================
   INDIA CAREER MAP
========================================================= */

// export function CareerMap({ items, active = 0 }) {
//   if (!items?.length) return null;

//   const postings = items.slice(0, -1);

//   const coordinates = [
//     [77.5946, 12.9716], // Bangalore
//     [91.8933, 25.5788], // Shillong
//     [76.3869, 30.3398], // Patiala
//     [73.0243, 26.2389], // Jodhpur
//     [73.0243, 26.2389], // Jodhpur internal posting
//     [92.7265, 11.6234], // Port Blair
//     [83.3732, 26.7606], // Gorakhpur
//     [71.0140, 25.8120], // Uttarlai
//     [77.1025, 28.7041], // Delhi
//     [79.4304, 28.3670], // Bareilly
//     [92.7789, 27.5619], // Tezpur
//     [81.8463, 25.4358]  // Prayagraj
//   ];

//   const activePosting = active >= 0 && active < postings.length ? postings[active] : null;
//   const [indiaMap, setIndiaMap] = useState(null);

//   useEffect(() => {
//     fetch("/maps/india-states.topojson")
//       .then((response) => {
//         if (!response.ok) throw new Error(`Map request failed: ${response.status}`);
//         return response.json();
//       })
//       .then((topology) => {
//         if (!topology?.objects?.data) throw new Error("Expected TopoJSON object 'data' was not found.");
//         setIndiaMap(feature(topology, topology.objects.data));
//       })
//       .catch((error) => console.error("India map loading failed:", error));
//   }, []);

//   return (
//     <div className="india-map-card">
//       <div className="map-card-header">
//         <div>
//           <span>IAF / CAREER TRACKING</span>
//           <strong>INDIA</strong>
//         </div>
//         <small>1990 — 2026</small>
//       </div>

//       <div className="map-stage">
//         <div className="map-grid" />

//         <ComposableMap
//           projection="geoMercator"
//           projectionConfig={{ center: [78.5, 22.5], scale: 980 }}
//           width={760}
//           height={720}
//           className="india-map-svg"
//         >
//           <Geographies geography={indiaMap}>
//             {({ geographies }) =>
//               geographies.map((geo) => (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   fill="#08131b"
//                   stroke="#4d6e78"
//                   strokeWidth={0.7}
//                   style={{
//                     default: { outline: "none" },
//                     hover: { fill: "#102630", stroke: "#67ff9c", strokeWidth: 1, outline: "none" },
//                     pressed: { outline: "none" }
//                   }}
//                 />
//               ))
//             }
//           </Geographies>

//           {postings.map((item, index) => {
//             const isActive = active === index;
//             const position = coordinates[index];
//             if (!position) return null;

//             return (
//               <Marker key={`${item.title}-${index}`} coordinates={position}>
//                 <motion.circle
//                   r={8}
//                   fill="none"
//                   stroke="#ff3030"
//                   strokeWidth={1.4}
//                   animate={isActive ? { scale: [0.4, 3.5], opacity: [0.9, 0] } : { scale: 1, opacity: 0 }}
//                   transition={isActive ? { duration: 1.65, repeat: Infinity, ease: "easeOut" } : { duration: 0.2 }}
//                 />
//                 <motion.circle
//                   r={isActive ? 5 : 3}
//                   fill="#ff3030"
//                   stroke="#ffaaaa"
//                   strokeWidth={1}
//                   animate={isActive ? { opacity: [0.35, 1, 0.35], scale: [1, 1.35, 1] } : { opacity: 0.25, scale: 1 }}
//                   transition={isActive ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
//                 />
//               </Marker>
//             );
//           })}
//         </ComposableMap>

//         <div className="map-scan-line" />
//         <div className="map-crosshair">+</div>

//         <AnimatePresence mode="wait">
//           {activePosting && (
//             <motion.div
//               key={`${activePosting.title}-${active}`}
//               className="map-active-card"
//               initial={{ opacity: 0, x: 16 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -16 }}
//             >
//               <span><i /> ACTIVE CHAPTER</span>
//               <strong>{activePosting.title}</strong>
//               <small>{activePosting.place}</small>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {active === items.length - 1 && (
//           <motion.div
//             className="map-retirement-banner"
//             animate={{ opacity: [0.45, 1, 0.45] }}
//             transition={{ duration: 1.4, repeat: Infinity }}
//           >
//             RETIREMENT // 31 AUG 2026
//           </motion.div>
//         )}
//       </div>

//       <div className="map-card-footer">
//         <span><i className="legend-red" /> POSTING LOCATION</span>
//         <span>N ↑</span>
//       </div>
//     </div>
//   );
// }
// export function CareerMap({
//   items,
//   active = 0,
// }) {
//   if (!items?.length) {
//     return null;
//   }

//   /*
//     Every journey item except the final
//     retirement item is a posting/location.
//   */
//   const postings = items.slice(0, -1);

//   /*
//     Longitude / Latitude

//     1. Bangalore
//     2. Shillong
//     3. Patiala
//     4. Jodhpur
//     5. Jodhpur
//     6. Port Blair
//     7. Gorakhpur
//     8. Uttarlai
//     9. Delhi
//     10. Bareilly
//     11. Tezpur
//     12. Prayagraj
//   */
//   const coordinates = [
//     [77.5946, 12.9716], // Bangalore
//     [91.8933, 25.5788], // Shillong
//     [76.3869, 30.3398], // Patiala
//     [73.0243, 26.2389], // Jodhpur
//     [73.0243, 26.2389], // Jodhpur - Internal Posting
//     [92.7265, 11.6234], // Port Blair
//     [83.3732, 26.7606], // Gorakhpur
//     [71.0140, 25.8120], // Uttarlai
//     [77.1025, 28.7041], // Delhi
//     [79.4304, 28.3670], // Bareilly
//     [92.7789, 27.5619], // Tezpur
//     [81.8463, 25.4358], // Prayagraj
//   ];

//   /*
//     Safety check:
//     Only use coordinates that actually exist.
//   */
//   const safePostings = postings
//     .map((item, index) => ({
//       item,
//       index,
//       coordinates: coordinates[index],
//     }))
//     .filter((entry) => Array.isArray(entry.coordinates));

//   const activePosting =
//     active >= 0 && active < postings.length
//       ? postings[active]
//       : null;

//   /*
//     INDIA MAP DATA
//   */
//   const [indiaMap, setIndiaMap] = useState(null);

//   useEffect(() => {
//     fetch("/maps/india-states.topojson")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(
//             `Map request failed: ${response.status}`
//           );
//         }

//         return response.json();
//       })
//       .then((topology) => {
//         const geojson = feature(
//           topology,
//           topology.objects.data
//         );

//         setIndiaMap(geojson);
//       })
//       .catch((error) => {
//         console.error(
//           "India map loading failed:",
//           error
//         );
//       });
//   }, []);

//   return (
//     <div className="india-map-card">

//       {/* MAP HEADER */}
//       <div className="map-card-header">
//         <div>
//           <span>
//             IAF / CAREER TRACKING
//           </span>

//           <strong>
//             INDIA
//           </strong>
//         </div>

//         <small>
//           1990 — 2026
//         </small>
//       </div>

//       {/* MAP */}
//       <div className="map-stage">

//         <div className="map-grid" />

//         <ComposableMap
//           projection="geoMercator"
//           projectionConfig={{
//             center: [
//               78.5,
//               22.5,
//             ],
//             scale: 980,
//           }}
//           width={760}
//           height={720}
//           className="india-map-svg"
//         >

//           {/* INDIA STATES */}
//           <Geographies geography={indiaMap}>
//             {({ geographies }) =>
//               geographies.map((geo) => (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   fill="#08131b"
//                   stroke="#4d6e78"
//                   strokeWidth={0.7}
//                   style={{
//                     default: {
//                       outline: "none",
//                     },

//                     hover: {
//                       fill: "#102630",
//                       stroke: "#67ff9c",
//                       strokeWidth: 1,
//                       outline: "none",
//                     },

//                     pressed: {
//                       outline: "none",
//                     },
//                   }}
//                 />
//               ))
//             }
//           </Geographies>

//           {/* POSTING MARKERS */}
//           {safePostings.map(
//             ({
//               item,
//               index,
//               coordinates,
//             }) => {

//               const isActive =
//                 active === index;

//               return (
//                 <Marker
//                   key={`${item.title}-${index}`}
//                   coordinates={coordinates}
//                 >

//                   {/* RADAR RIPPLE */}
//                   <motion.circle
//                     r={8}
//                     fill="none"
//                     stroke="#ff3030"
//                     strokeWidth={1.4}

//                     animate={
//                       isActive
//                         ? {
//                             scale: [
//                               0.4,
//                               3.5,
//                             ],
//                             opacity: [
//                               0.9,
//                               0,
//                             ],
//                           }
//                         : {
//                             scale: 1,
//                             opacity: 0,
//                           }
//                     }

//                     transition={
//                       isActive
//                         ? {
//                             duration: 1.65,
//                             repeat: Infinity,
//                             ease: "easeOut",
//                           }
//                         : {
//                             duration: 0.2,
//                           }
//                     }
//                   />

//                   {/* LOCATION DOT */}
//                   <motion.circle
//                     r={
//                       isActive
//                         ? 5
//                         : 3
//                     }

//                     fill="#ff3030"
//                     stroke="#ffaaaa"
//                     strokeWidth={1}

//                     animate={
//                       isActive
//                         ? {
//                             opacity: [
//                               0.35,
//                               1,
//                               0.35,
//                             ],
//                             scale: [
//                               1,
//                               1.35,
//                               1,
//                             ],
//                           }
//                         : {
//                             opacity: 0.25,
//                             scale: 1,
//                           }
//                     }

//                     transition={
//                       isActive
//                         ? {
//                             duration: 0.9,
//                             repeat: Infinity,
//                             ease: "easeInOut",
//                           }
//                         : {
//                             duration: 0.2,
//                           }
//                     }
//                   />

//                 </Marker>
//               );
//             }
//           )}

//         </ComposableMap>

//         {/* SCANNING EFFECT */}
//         <div className="map-scan-line" />

//         {/* CROSSHAIR */}
//         <div className="map-crosshair">
//           +
//         </div>

//         {/* ACTIVE LOCATION */}
//         <AnimatePresence mode="wait">

//           {activePosting && (
//             <motion.div
//               key={`${activePosting.title}-${active}`}
//               className="map-active-card"

//               initial={{
//                 opacity: 0,
//                 x: 16,
//               }}

//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}

//               exit={{
//                 opacity: 0,
//                 x: -16,
//               }}
//             >

//               <span>
//                 <i />
//                 ACTIVE POSTING
//               </span>

//               <strong>
//                 {activePosting.title}
//               </strong>

//               <small>
//                 {
//                   activePosting.place ||
//                   activePosting.location
//                 }
//               </small>

//             </motion.div>
//           )}

//         </AnimatePresence>

//         {/* RETIREMENT */}
//         {active === items.length - 1 && (
//           <motion.div
//             className="map-retirement-banner"

//             animate={{
//               opacity: [
//                 0.45,
//                 1,
//                 0.45,
//               ],
//             }}

//             transition={{
//               duration: 1.4,
//               repeat: Infinity,
//             }}
//           >
//             RETIREMENT //
//             31 AUG 2026
//           </motion.div>
//         )}

//       </div>

//       {/* MAP FOOTER */}
//       <div className="map-card-footer">

//         <span>
//           <i className="legend-red" />
//           POSTING LOCATION
//         </span>

//         <span>
//           N ↑
//         </span>

//       </div>

//     </div>
//   );
// }


export function CareerMap({
  items,
  active = 0,
}) {
  const mapRef = useRef(null);

  const mapInView = useInView(mapRef, {
    amount: 0.25,
    once: false,
  });

  if (!items?.length) {
    return null;
  }

  /*
    Last item = retirement.
    Everything before it = posting.
  */
  const postings = items.slice(0, -1);

  const coordinates = [
    [77.5946, 12.9716], // Bangalore
    [91.8933, 25.5788], // Shillong
    [76.3869, 30.3398], // Patiala
    [73.0243, 26.2389], // Jodhpur
    [73.0243, 26.2389], // Jodhpur
    [92.7265, 11.6234], // Port Blair
    [83.3732, 26.7606], // Gorakhpur
    [71.0140, 25.8120], // Uttarlai
    [77.1025, 28.7041], // Delhi
    [79.4304, 28.3670], // Bareilly
    [92.7789, 27.5619], // Tezpur
    [81.8463, 25.4358], // Prayagraj
  ];

  const safePostings = postings
    .map((item, index) => ({
      item,
      index,
      coordinates: coordinates[index],
    }))
    .filter((entry) =>
      Array.isArray(entry.coordinates)
    );

  const activePosting =
    active >= 0 &&
    active < postings.length
      ? postings[active]
      : null;

  const [indiaMap, setIndiaMap] =
    useState(null);

  useEffect(() => {
    fetch("/maps/india-states.topojson")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Map request failed: ${response.status}`
          );
        }

        return response.json();
      })
      .then((topology) => {
        if (
          !topology?.objects?.data
        ) {
          throw new Error(
            "Expected TopoJSON object 'data' was not found."
          );
        }

        const geojson = feature(
          topology,
          topology.objects.data
        );

        setIndiaMap(geojson);
      })
      .catch((error) => {
        console.error(
          "India map loading failed:",
          error
        );
      });
  }, []);

  return (
    <motion.div
      ref={mapRef}
      className="india-map-card"
    >
      {/* HEADER */}
      <div className="map-card-header">
        <div>
          <span>
            IAF / CAREER TRACKING
          </span>

          <strong>
            INDIA
          </strong>
        </div>

        <small>
          1990 — 2026
        </small>
      </div>

      {/* MAP */}
      <div className="map-stage">

        <div className="map-grid" />

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [
              78.5,
              22.5,
            ],
            scale: 980,
          }}
          width={760}
          height={720}
          className="india-map-svg"
        >

          {/* STATES */}
          <Geographies
            geography={indiaMap}
          >
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#08131b"
                  stroke="#4d6e78"
                  strokeWidth={0.7}
                  style={{
                    default: {
                      outline: "none",
                    },

                    hover: {
                      fill: "#102630",
                      stroke: "#67ff9c",
                      strokeWidth: 1,
                      outline: "none",
                    },

                    pressed: {
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {/* ALL POSTING LOCATIONS */}
          {safePostings.map(
            ({
              item,
              index,
              coordinates,
            }) => (
              <Marker
                key={`${item.title}-${index}`}
                coordinates={coordinates}
              >

                {/* BIG RED GLOW */}
                <motion.circle
                  r={9}
                  fill="none"
                  stroke="#ff2020"
                  strokeWidth={1.5}
                  animate={
                    mapInView
                      ? {
                          scale: [
                            0.7,
                            3.8,
                          ],
                          opacity: [
                            0.9,
                            0,
                          ],
                        }
                      : {
                          scale: 0.7,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: 1.6,
                    repeat: mapInView
                      ? Infinity
                      : 0,
                    ease: "easeOut",
                    delay: index * 0.08,
                  }}
                />

                {/* MAIN RED DOT */}
                <motion.circle
                  r={
                    mapInView
                      ? 5
                      : 3
                  }
                  fill="#ff1f1f"
                  stroke="#ffb0b0"
                  strokeWidth={1}
                  animate={
                    mapInView
                      ? {
                          opacity: [
                            0.65,
                            1,
                            0.65,
                          ],
                          scale: [
                            1,
                            1.45,
                            1,
                          ],
                        }
                      : {
                          opacity: 0.3,
                          scale: 1,
                        }
                  }
                  transition={{
                    duration: 0.9,
                    repeat: mapInView
                      ? Infinity
                      : 0,
                    ease: "easeInOut",
                    delay: index * 0.08,
                  }}
                />

              </Marker>
            )
          )}
        </ComposableMap>

        {/* SCAN */}
        <div className="map-scan-line" />

        {/* CROSSHAIR */}
        <div className="map-crosshair">
          +
        </div>

        {/* ACTIVE POSTING CARD */}
        {/* <AnimatePresence mode="wait">
          {activePosting && (
            <motion.div
              key={`${activePosting.title}-${active}`}
              className="map-active-card"
              initial={{
                opacity: 0,
                x: 16,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -16,
              }}
            >
              <span>
                <i />
                CURRENT POSTING
              </span>

              <strong>
                {activePosting.title}
              </strong>

              <small>
                {activePosting.place ||
                  activePosting.location}
              </small>
            </motion.div>
          )}
        </AnimatePresence> */}

      </div>

      {/* FOOTER */}
      <div className="map-card-footer">
        <span>
          <i className="legend-red" />
          POSTING LOCATION
        </span>

        <span>
          N ↑
        </span>
      </div>
    </motion.div>
  );
}
/* =========================================================
   FEATURE CARD
========================================================= */

export function FeatureCard({
  role,
  index
}) {

  let Icon =
    FiCrosshair;


  if (
    role.title ===
    "Akash Missile"
  ) {

    Icon =
      GiMissileLauncher;

  }


  if (
    role.title ===
    "Leadership"
  ) {

    Icon =
      GiLaurelsTrophy;

  }


  return (

    <motion.article

      className={
        `feature-card ${role.accent}`
      }

      whileHover={{
        y: -8
      }}

      transition={{
        duration: 0.3
      }}

    >

      <div className="feature-number">

        {role.number}

      </div>


      <div className="feature-category">

        {role.category}

      </div>


      <div className="feature-icon">

        <Icon />

      </div>


      <h3>

        {role.title}

      </h3>


      <p>

        {role.description}

      </p>


      <div className="feature-bottom">

        <span />

        0{index + 1}

      </div>

    </motion.article>

  );

}


/* =========================================================
   PHOTO CARD
========================================================= */

export function PhotoCard({ photo, onOpen }) {
  return (
    <motion.button
      type="button"
      className="photo-card"
      onClick={onOpen}
      whileHover={{ y: -7 }}
    >
      <div className="photo-placeholder">
        <img
          src={photo.image}
          alt={photo.title}
        />
      </div>

      <div className="photo-overlay" />

      <div className="photo-content">
        <small>
          ARCHIVE // 0{photo.id}
        </small>

        <h3>{photo.title}</h3>

        <p>{photo.description}</p>
      </div>
    </motion.button>
  );
}

/* =========================================================
   PHOTO MODAL
========================================================= */

export function PhotoModal({ photo, close }) {
  return (
    <motion.div
      className="modal-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
    >
      <motion.div
        className="photo-modal"
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(event) => event.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          type="button"
          className="modal-close"
          onClick={close}
        >
          <FiX />
        </button>

        {/* ACTUAL IMAGE */}
        <div className="modal-image">
          <img
            src={photo.image}
            alt={photo.title}
            className="modal-photo"
          />
        </div>

        {/* DETAILS */}
        <div className="modal-details">
          <small>PHOTO ARCHIVE</small>

          <h3>{photo.title}</h3>

          <p>{photo.description}</p>

          <code>
            gallery/photo-{photo.id}.jpg
          </code>
        </div>
      </motion.div>
    </motion.div>
  );
}