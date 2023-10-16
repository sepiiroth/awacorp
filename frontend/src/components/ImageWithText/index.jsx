import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import colors from "../../utils/style/colors";
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
  color: ${colors.text};
  text-align: center;
  margin-top: 0 !important;
  margin-bottom: 0 !important;

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }
  p {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

const ImageDiv = styled.div`
  background: ${colors.dark};
  background: radial-gradient(circle, ${colors.dark} 0%, ${colors.black} 100%);
`;

const ImageDivs = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 750px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    object-fit: cover;
    display: block;
    -webkit-mask-image: radial-gradient(circle, white, transparent);
    mask-image: radial-gradient(circle, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }

  @media (max-width: 768px) {
    min-height: 500px;
  }
`;

const AnimatedText = styled.div`
  opacity: 0;
  animation: ${(props) => (props.inView ? fadeIn : "none")} 0.8s ease-in-out
    forwards;
`;

function ImageWithText({ image, title, description, part, btn }) {
  const [ref, inView] = useInView({
    triggerOnce: false, // L'animation sera déclenchée une seule fois
  });

  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const isMobile = window.innerWidth <= 768;

  const handleMouseMove = (event) => {
    if (isMobile) return;

    const { width, height } = imageRef.current.getBoundingClientRect();
    const x = -(event.clientX - width / 2) * 0.01;
    const y = -(event.clientY - height / 2) * 0.01;
    imageRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <ImageDiv>
      <Container className="container my-5" ref={containerRef}>
        <div className={`row ${part === "right" ? "d-flex" : ""}`}>
          <ImageDivs
            ref={imageRef}
            className={`col-lg-6 ${part === "right" ? "order-lg-2" : ""}`}
          >
            <img src={image} alt="T-Shirt" />
          </ImageDivs>
          <div className="col-lg-6 d-flex align-items-center">
            <AnimatedText className="p-5 visible" ref={ref} inView={inView}>
              <h1 className="display-4">{title}</h1>
              <p className="lead">{description}</p>
              {btn ? (
                <Link to="/champions">
                  <button className="button">Découvrir les champions</button>
                </Link>
              ) : null}
            </AnimatedText>
          </div>
        </div>
      </Container>
    </ImageDiv>
  );
}

ImageWithText.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  part: PropTypes.string.isRequired,
  btn: PropTypes.bool,
};

export default ImageWithText;
