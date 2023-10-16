import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer";
import colors from "../../utils/style/colors";
import err from "../../assets/404.png";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ErrorWrapper = styled.div`
  margin: 30px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${colors.text};

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ErrorTitle = styled.h1`
  font-weight: 300;
  animation: ${fadeIn} 1s forwards;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ErrorSubtitle = styled.h2`
  font-weight: 300;
  animation: ${fadeIn} 1s forwards;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const Illustration = styled.img`
  width: 400px;
  animation: ${fadeIn} 1s forwards;
  margin: 20px 0;
  @media (max-width: 768px) {
    width: 300px;
  }
  @media (max-width: 576px) {
    width: 200px;
  }
`;

function Error() {
  const [ref, inView] = useInView({
    triggerOnce: true, // L'animation sera déclenchée une seule fois
  });

  return (
    <ErrorWrapper ref={ref}>
      <div>
        {inView && <ErrorTitle>Oups...</ErrorTitle>}
        <Illustration src={err} />
        {inView && (
          <ErrorSubtitle>
            Il semblerait que la page que vous cherchez n’existe pas.
          </ErrorSubtitle>
        )}
      </div>
    </ErrorWrapper>
  );
}

export default Error;
