import React, { useState } from "react";
import SplashScreen from "./splash";

import heroPhoto from "./assets/gallery/main.png";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  FiArrowDown,
  FiArrowRight,
  FiMenu,
  FiX,
  FiMapPin,
  FiCalendar,
  FiShield,
  FiStar,
} from "react-icons/fi";

import {
  GiAirplane,
  GiMedal,
} from "react-icons/gi";

import {
  profile,
  journey,
  roles,
  honours,
  gallery,
} from "./data";

import {
  RadarScene,
  SectionHeading,
  TimelineRail,
  CareerMap,
  FeatureCard,
  PhotoCard,
  PhotoModal,
} from "./components";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // IMPORTANT:
  // Do not render the website at all while splash is active.
  if (showSplash) {
    return (
      <SplashScreen
        onComplete={() => setShowSplash(false)}
      />
    );
  }

  return <MainWebsite />;
}


/* =========================================================
   MAIN WEBSITE
========================================================= */

function MainWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeJourney, setActiveJourney] = useState(0);

  const { scrollYProgress } = useScroll();

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.2],
    [0, -120]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.16],
    [1, 0.25]
  );

  const navigate = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    setMenuOpen(false);
  };

  const navigation = [
    ["home", "Home"],
    ["journey", "Journey"],
    ["postings", "Postings"],
    ["training", "Training"],
    ["honours", "Honours"],
    ["gallery", "Gallery"],
    ["legacy", "Legacy"],
  ];

  return (
    <div className="website">

      {/* ==================================================
          PROGRESS BAR
      ================================================== */}

      <div className="progress-bar">
        <motion.div
          style={{
            scaleX: scrollYProgress,
            transformOrigin: "0%",
          }}
        />
      </div>


      {/* ==================================================
          PREMIUM NAVIGATION
      ================================================== */}

      <header className="navbar">

        <button
          className="logo"
          onClick={() => navigate("home")}
          aria-label="Go to Home"
        >
          <span className="logo-icon">
            <GiAirplane />
          </span>

          <span className="logo-text">
            <strong>IAF</strong>
            <small>LEGACY ARCHIVE</small>
          </span>
        </button>


        <nav
          className={
            menuOpen
              ? "navigation open"
              : "navigation"
          }
        >
          {navigation.map(([id, label]) => (
            <button
              key={id}
              className="nav-link"
              onClick={() => navigate(id)}
            >
              <span>{label}</span>
            </button>
          ))}
        </nav>


        <button
          className="nav-button"
          onClick={() => navigate("journey")}
        >
          <FiShield />

          <span>
            ENTER JOURNEY
          </span>

          <FiArrowRight className="nav-button-arrow" />
        </button>


        <button
          className="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

      </header>


      <main>

        {/* ==================================================
            HERO
        ================================================== */}

        <section
          id="home"
          className="hero"
        >

          <div className="hero-grid" />

          <div className="radar-scan" />


          <motion.div
            className="hero-content"
            style={{
              y: heroY,
              opacity: heroOpacity,
            }}
          >

            <h1>
              A LIFE
              <br />
              <em>IN SERVICE.</em>
            </h1>


            <div className="hero-name">
              {profile.name}
            </div>


            <div className="service-date">

              <span>
                <FiCalendar />
                {profile.serviceStart}
              </span>

              <b>—</b>

              <span>
                {profile.retirement}
              </span>

            </div>


            <div className="rank">
              <FiShield />
              {profile.rank} • {profile.honoraryRank}
            </div>


            <div className="hero-actions">

              <button
                className="primary-button"
                onClick={() => navigate("journey")}
              >
                BEGIN THE JOURNEY
                <FiArrowRight />
              </button>


              <button
                className="secondary-button"
                onClick={() => navigate("legacy")}
              >
                <FiStar />
                THE LEGACY
              </button>

            </div>

          </motion.div>


          {/* ==================================================
              HERO PHOTO
          ================================================== */}

          <div className="hero-portrait">

            <div className="portrait-frame">

              <div className="portrait-placeholder">

                <img
                  src={heroPhoto}
                  alt={`${profile.name} portrait`}
                  className="hero-portrait-image"
                  loading="eager"
                  decoding="async"
                />

              </div>

              <div className="portrait-label">
                ARCHIVE // PORTRAIT 01
              </div>

            </div>

          </div>


          <div className="hero-footer">

            <span>
              35+ YEARS OF SERVICE
            </span>

            <span>
              SCROLL TO EXPLORE
              <FiArrowDown />
            </span>

          </div>

        </section>


        {/* ==================================================
            JOURNEY
        ================================================== */}

        <section
          id="journey"
          className="section journey"
        >

          <SectionHeading
            number="01 / THE JOURNEY"
            title="One career. Many horizons."
            description="A complete visual record of his service journey, from training in 1990 to his final day of service in 2026."
          />


          <div className="journey-experience">

            <div className="journey-scroll-column">

              <TimelineRail
                items={journey}
                active={activeJourney}
                setActive={setActiveJourney}
              />

            </div>


            <div className="journey-map-column">

              <div className="journey-map-heading">

                <span className="map-heading-kicker">
                  <FiMapPin />
                  POSTING LOCATIONS
                </span>

                <h2>
                  Where the Journey Took Him
                </h2>

                <p>
                  The map highlights the places across India
                  where he served during his distinguished career.
                </p>

              </div>


              <div className="journey-map-sticky">

                <CareerMap
                  items={journey}
                  active={activeJourney}
                />

              </div>

            </div>

          </div>

        </section>


        {/* ==================================================
            TRAINING
        ================================================== */}

        <section
          id="training"
          className="section training"
        >

          <SectionHeading
            number="02 / EXPERTISE"
            title="Training. Leadership. Readiness."
            description="
              The professional side of the story.
              Focused on his experience while avoiding
              sensitive operational information.
            "
          />


          <div className="feature-grid">

            {roles.map((role, index) => (
              <FeatureCard
                key={role.title}
                role={role}
                index={index}
              />
            ))}

          </div>

        </section>


        {/* ==================================================
            HONOURS
        ================================================== */}

        <section
          id="honours"
          className="section honours"
        >

          <SectionHeading
            number="03 / HONOURS"
            title="Recognition, earned."
            description="
              A dedicated place for his rank, medals,
              commendations, certificates and important
              career milestones.
            "
          />


          <div className="honours-main">

            <div className="honour-medal">
              <GiMedal />
            </div>


            <div className="honour-primary">

              <span>
                HONORARY COMMISSION
              </span>

              <h3>
                {profile.honoraryRank}
              </h3>

              <p>
                Conferred on 15 August 2026 during the
                final chapter of his service.
              </p>

              <div className="verify-badge">
                15 AUG 2026
              </div>

            </div>


            <div className="honour-list">

              {honours.map((honour) => (

                <div
                  className="honour-row"
                  key={honour.number}
                >

                  <strong>
                    {honour.number}
                  </strong>

                  <span>

                    <b>
                      {honour.title}
                    </b>

                    <small>
                      {honour.description}
                    </small>

                  </span>

                </div>

              ))}

            </div>

          </div>

        </section>


        {/* ==================================================
            GALLERY
        ================================================== */}

        <section
          id="gallery"
          className="section gallery"
        >

          <SectionHeading
            number="04 / PHOTO ARCHIVE"
            title="The photographs tell the rest."
            description="
              These slots are intentionally waiting for the real
              photographs. After the surprise, replace them with
              his actual memories.
            "
          />


          <div className="gallery-grid">

            {gallery.map((photo) => (

              <PhotoCard
                key={photo.id}
                photo={photo}
                onOpen={() => setSelectedPhoto(photo)}
              />

            ))}

          </div>

        </section>


        {/* ==================================================
            LEGACY
        ================================================== */}

        <section
          id="legacy"
          className="legacy"
        >

          <div className="legacy-grid" />

          <div className="legacy-radar">
            <RadarScene />
          </div>


          <div className="legacy-content">

            <div className="eyebrow">
              <span className="status-dot" />
              FINAL CHAPTER // 31 AUG 2026
            </div>


            <h2>
              MISSION
              <br />
              <em>COMPLETE.</em>
            </h2>


            <p>
              A lifetime of service,
              discipline, responsibility
              and quiet sacrifice.
            </p>


            <div className="signature">

              <strong>
                MD JAMSHED AFZAL
              </strong>

              <span>
                INDIAN AIR FORCE
                <br />
                1990 — 2026
              </span>

            </div>

          </div>

        </section>

      </main>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="footer">

        <div>

          <strong>
            IAF / LEGACY
          </strong>

          <span>
            A PRIVATE FAMILY TRIBUTE
          </span>

        </div>


        <div>

          <span>

            <a
              href="https://www.linkedin.com/in/kamran-afzal-khan-17580122a/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              BUILT BY KAMRAN AFZAL KHAN
            </a>

          </span>

          <span>
            🇮🇳
          </span>

        </div>

      </footer>


      {/* ==================================================
          PHOTO MODAL
      ================================================== */}

      <AnimatePresence>

        {selectedPhoto && (

          <PhotoModal
            photo={selectedPhoto}
            close={() => setSelectedPhoto(null)}
          />

        )}

      </AnimatePresence>

    </div>
  );
}