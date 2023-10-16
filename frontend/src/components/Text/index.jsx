import styled from "styled-components";
import colors from "../../utils/style/colors";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: ${colors.primary};

  div {
    display: grid;
    justify-content: center;
    padding: 15px;
    color: ${colors.text};
    text-align: center;
    font-size: 1.2rem;

    p {
      font-weight: bold;
    }
  }

  .play {
    background: ${colors.light_green};
    border: ${colors.light_green} 1px solid;
    padding: 10px 20px; // Adjust the padding for buttons
    display: inline-block; // Make it inline for centering
    transition: background-color 0.3s; // Add transition for hover effect
  }

  .play:hover {
    background-color: ${colors.dark_green}; // Change background on hover
  }

  a,
  Link {
    text-decoration: none;
    color: ${colors.text}; // Ensure text color is consistent
  }

  @media (max-width: 768px) {
    div {
      font-size: 1rem;
    }

    .lead {
      font-size: 1rem;
    }
  }
`;

function Text({ description, btn, btnText = "JOUEZ GRATUITEMENT", btnLink }) {
  const Button = () => {
    if (btnLink && btnLink.startsWith("http")) {
      return (
        <a href={btnLink} className="button play">
          {btnText}
        </a>
      );
    } else {
      return (
        <Link to={btnLink} className="button play">
          {btnText}
        </Link>
      );
    }
  };

  return (
    <Container>
      <div className="container">
        <p className="lead">{description}</p>
        {btn && <Button />}
      </div>
    </Container>
  );
}

export default Text;
