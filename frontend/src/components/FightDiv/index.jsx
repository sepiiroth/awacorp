import styled, { keyframes } from "styled-components";
import colors from "../../utils/style/colors";
import Green from "../../assets/test1.png";
import Purple from "../../assets/test2.png";
import { useRef, useEffect, useState } from "react";

// Animation de fondu
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  margin: 0;
  min-height: 71vh;
  display: grid;
  place-content: center;
  position: relative;
  background: linear-gradient(
    to right,
    ${colors.black},
    ${colors.dark_green},
    ${colors.black},
    ${colors.dark_purple},
    ${colors.black}
  );

  @media (max-width: 1000px) {
    display: none;
  }
  overflow: hidden;

  h1 {
    opacity: 0; // Initially hidden
    text-align: center;
    font-size: 5rem;
    word-spacing: 3px;
    color: ${colors.text} !important;
    text-shadow: rgb(0, 0, 0) 0px 3px 5px;
    font-weight: bold;
    text-transform: uppercase;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    pointer-events: none;

    &.visible {
      animation: ${fadeIn} 1.2s ease-in-out forwards;
    }
  }

  .gallery > img:hover .image-content {
    display: block; /* Affiché lors du survol de l'image */
  }

  .gallery {
    --z: 32px; /* control the zig-zag  */
    --s: 70vh; /* control the size */
    --g: 8px; /* control the gap */
    position: relative;

    display: grid;
    gap: var(--g);
    width: calc(2 * var(--s) + var(--g));
    grid-auto-flow: column;
  }

  .gallery > img {
    width: 0;
    min-width: calc(100% + var(--z) / 2);
    height: var(--s);
    object-fit: cover;
    -webkit-mask: var(--mask);
    mask: var(--mask);
    cursor: pointer;
    transition: 0.5s;
  }
  .gallery > img:hover {
    width: calc(var(--s) / 2);
  }
  .gallery > img:first-child {
    place-self: start;
    clip-path: polygon(calc(2 * var(--z)) 0, 100% 0, 100% 100%, 0 100%);
    --mask: conic-gradient(
        from -135deg at right,
        #0000,
        #000 1deg 89deg,
        #0000 90deg
      )
      50%/100% calc(2 * var(--z)) repeat-y;
  }
  .gallery > img:last-child {
    place-self: end;
    clip-path: polygon(0 0, 100% 0, calc(100% - 2 * var(--z)) 100%, 0 100%);
    --mask: conic-gradient(
        from 45deg at left,
        #0000,
        #000 1deg 89deg,
        #0000 90deg
      )
      50% calc(50% - var(--z)) / 100% calc(2 * var(--z)) repeat-y;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 3rem;
    }
  }
`;

function FightDiv() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const isMobile = window.innerWidth <= 1000;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <Container ref={containerRef}>
      <h1 className={isVisible ? "visible" : ""}>CHOISIS TON CAMP</h1>
      <div className="gallery">
        <img src={Green} alt="Archer from Fate/Stay"></img>
        <img src={Purple} alt="Saber from Fate/Stay"></img>
      </div>
    </Container>
  );
}

export default FightDiv;
