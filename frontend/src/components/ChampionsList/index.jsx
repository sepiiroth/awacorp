import styled, { keyframes } from "styled-components";
import colors from "../../utils/style/colors";
import { useState, useEffect } from "react";

import DpsIcon from "../../assets/dps_icon.png";
import SupportIcon from "../../assets/support_icon.png";
import TankIcon from "../../assets/tank_icon.png";
import VoiderIcon from "../../assets/voider_icon.png";

import BigEd from "../../assets/character/biged.jpg";
import Tami from "../../assets/character/tami.jpg";
import JAlien from "../../assets/character/jalien.jpg";
import Frostorc from "../../assets/character/frostorc.jpg";

import Sun from "../../assets/character/sun.jpg";
import Breto from "../../assets/character/breto.jpg";
import Not from "../../assets/character/void.png";

import Actio from "../../assets/character/actio.jpg";
import Cons from "../../assets/character/cons.jpg";
import Elydre from "../../assets/character/elydre.jpg";
import Portas from "../../assets/character/portas.jpg";

import Ligee from "../../assets/character/ligee.jpg";
import Steve from "../../assets/character/steve.jpg";
import Morpha from "../../assets/character/morpha.jpg";
import Sousou from "../../assets/character/sousou.jpg";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  @media (min-width: 1000px) {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
    background: linear-gradient(
      to right,
      ${colors.black},
      ${colors.dark},
      ${colors.dark},
      ${colors.dark},
      ${colors.dark},
      ${colors.dark},
      ${colors.black}
    );

    h1 {
      text-align: center;
      font-size: 1.6rem;
      word-spacing: 3px;
      color: ${colors.text} !important;
      text-shadow: rgb(0, 0, 0) 0px 3px 5px;
      font-weight: bold;
      text-transform: uppercase;
      position: relative;

      img {
        width: 40px;
        margin: 10px;
        position: absolute;
        top: -110%;
        left: 48%;
        transform: translate(-50%, -50%);
        filter: invert(1);
      }
    }

    .parent {
      width: 25%;
      margin: 10px;
    }

    .children {
      display: grid;
      text-align: center;
      animation: ${fadeIn} 1s forwards;
    }

    .contain {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;

      gap: 1em;
      width: 100%;
      height: 500px;
      transition: all 400ms;
      margin-top: 30px;
    }

    .box {
      position: relative;
      background: var(--img) center center;
      background-size: cover;
      transition: all 400ms;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      filter: grayscale(75%) opacity(24%);
    }

    .tank {
      filter: grayscale(20%) opacity(50%) sepia(1) hue-rotate(50deg);
    }

    .voider {
      filter: grayscale(20%) opacity(50%) sepia(1) hue-rotate(270deg);
    }

    .dps {
      filter: grayscale(20%) opacity(50%) sepia(1) hue-rotate(200deg);
    }

    .support {
      filter: grayscale(20%) opacity(50%) sepia(1) hue-rotate(0deg);
    }

    .box::after {
      content: attr(data-text);
      position: absolute;
      top: 20px;
      background: ${colors.semitransparent_black};
      border-radius: 15px;
      color: #fff;
      padding: 10px 10px 10px 14px;
      letter-spacing: 4px;
      text-transform: uppercase;
      transform: translateY(60px);
      opacity: 0;
      transition: all 400ms;
    }

    .box::before {
      content: attr(data-subtext);
      position: absolute;
      bottom: 20px;
      background: ${colors.transparent_black};
      border-radius: 15px;
      color: #fff;
      padding: 5px 5px 5px 7px;
      margin: 5px;
      letter-spacing: 1px;
      font-size: 0.8rem;
      text-transform: uppercase;
      transform: translateY(80px);
      opacity: 0;
      transition: all 400ms;
    }

    .box:hover::before {
      transform: translateY(20px);
      opacity: 1;
      transition-delay: 200ms;
    }

    .box:hover::after {
      transform: translateY(0);
      opacity: 1;
      transition-delay: 100ms;
    }

    .contain .box:hover {
      filter: grayscale(0%) opacity(100%);
    }

    .box:nth-child(odd) {
      transform: translateY(-16px);
      opacity: 0;
      animation: ${fadeIn} 1s forwards;
      animation-delay: 0.4s;
    }

    .box:nth-child(even) {
      transform: translateY(16px);
      opacity: 0;
      animation: ${fadeIn} 1s forwards;
      animation-delay: 0.5s;
    }
  }

  @media (max-width: 1000px) {
    height: auto;
    display: grid;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 50px;
    background: linear-gradient(
      to right,
      ${colors.black},
      ${colors.dark},
      ${colors.dark},
      ${colors.dark},
      ${colors.dark},
      ${colors.dark},
      ${colors.black}
    );

    color: ${colors.text};

    .parent {
      &.new {
        margin-top: 100px;
      }

      h1 {
        text-align: center;
        font-size: 1.2rem;
        word-spacing: 3px;
        text-shadow: rgb(0, 0, 0) 0px 3px 5px;
        font-weight: bold;
        text-transform: uppercase;
        position: relative;
        animation: ${fadeIn} 1s forwards;

        img {
          width: 30px;
          position: absolute;
          top: -110%;
          left: 50%;
          transform: translate(-50%, -50%);
          filter: invert(1);
        }
      }
    }

    .box {
      opacity: 0;
      animation: ${fadeIn} 1s forwards;
      animation-delay: 0.4s;

      margin-top: 30px;
      img {
        opacity: 0;
        animation: ${fadeIn} 1s forwards;
        animation-delay: 0.4s;

        width: 60%;
      }

      h3 {
        opacity: 0;
        animation: ${fadeIn} 1s forwards;
        animation-delay: 0.6s;
        margin-top: 15px;
        font-weight: bold;
      }

      span {
        opacity: 0;
        animation: ${fadeIn} 1s forwards;
        animation-delay: 0.7s;
      }
    }
  }
`;

function ChampionsList() {
  const [hoveredBox, setHoveredBox] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <Container>
        <div className="parent">
          <h1>
            <img src={TankIcon} alt="dps_icon" />
            Tank
          </h1>
          <div className="box">
            <img src={BigEd} alt="biged-img" />
            <h3>BigEd</h3>
            <span>
              Malformé de naissance, Ed a été moqué toute son enfance, ce qui
              l'a rendu fou. Pour cacher son énorme tête, il se met sous un drap
              couvrant l'entièreté de son corps. Depuis ce jour, il utilise sa
              tête pour se défendre.
            </span>
          </div>
          <div className="box">
            <img src={Tami} alt="tami-img" />
            <h3>Tami</h3>
            <span>
              Armure d'un samouraï refusant la mort, son âme a fusionné avec
              celle-ci. Maintenant, il est le protecteur de l'île de
              Shinrakushima.
            </span>
          </div>
          <div className="box">
            <img src={JAlien} alt="jalien-img" />
            <h3>JAlien</h3>
            <span>
              Dénommé Jalien par les hommes à cause de sa ressemblance avec un
              certain piment de la planète Terre. Jalien va de planète en
              planète pour pouvoir se nourrir et ainsi féconder ses oeufs qui, à
              leur éclosion, dévasteront la planète sur laquelle ils se
              trouvent, ne laissant aucune trace de vie.
            </span>
          </div>
          <div className="box">
            <img src={Frostorc} alt="frostorc-img" />
            <h3>Frostorc</h3>
            <span>
              Chef de guerre d'une tribu d'orc de gel, il est belliqueux et
              impose le respect à ses soldats. Bien qu'à première vue Frostorc
              parait froid et menaçant, son ultime objectif est d'unifier les
              tribus d'orc de gel afin de vivre en paix ... quel qu'en soit le
              prix.
            </span>
          </div>
        </div>
        <div className="parent new">
          <h1>
            <img src={VoiderIcon} alt="dps_icon" />
            Voider
          </h1>
          <div className="box">
            <img src={Sun} alt="sun-img" />
            <h3>Sun</h3>
            <span>
              Un jour, tandis qu'il explorait les environs, il découvrit deux
              bâtons abandonnés par terre. Les bâtons semblaient être une
              extension naturelle de ses membres. Sun, dont la démonstration de
              combat avec les deux bâtons laissa une empreinte durable dans les
              mémoires des habitants de la jungle.
            </span>
          </div>
          <div className="box">
            <img src={Breto} alt="breto-img" />
            <h3>Breto</h3>
            <span>
              Breto est le cousin de Ligée. Il est soldat dans la Garde Royal de
              Marélysia. Quand Ligée a été appelée pour défendre l'univers, il
              l'a suivi pour la protéger. Breto utilise sa vitesse et son
              incroyable ouïe au combat.
            </span>
          </div>
          <div className="box">
            <img src={Not} alt="not-img" />
            <h3>?</h3>
            <span>Bientôt disponible...</span>
          </div>
          <div className="box">
            <img src={Not} alt="not-img" />
            <h3>?</h3>
            <span>Bientôt disponible...</span>
          </div>
        </div>
        <div className="parent new">
          <h1>
            <img src={DpsIcon} alt="dps_icon" />
            DPS
          </h1>
          <div className="box">
            <img src={Actio} alt="actio-img" />
            <h3>Actio</h3>
            <span>
              Sentinelle armée d'Androméria, une planète aux technologies
              avancées, Actio est devenu chasseur de prime lorsque son bataillon
              a été laissé pour mort lors d'une bataille de conquête perdue par
              son peuple.
            </span>
          </div>
          <div className="box">
            <img src={Cons} alt="cons-img" />
            <h3>Cons</h3>
            <span>
              À l'origine, Cons n'était qu'une simple table d'incantation d'un
              groupe de puissants mages. Mais lors d'une cérémonie ratée par les
              mages, Cons pris vie et gagna des pouvoirs cosmiques puisant son
              énergie de l'univers même. Depuis, il parcourt l'univers pour le
              protéger.
            </span>
          </div>
          <div className="box">
            <img src={Elydre} alt="elydre-img" />
            <h3>Elydre</h3>
            <span>
              Créature légendaire pour certains, divinité pour d'autres, Elydre
              est connu à travers l'univers pour sa capacité à contrôler les
              éléments. Certains peuples de la galaxie pensent même que son
              humeur serait à l'origine de tous les phénomènes naturels et
              météorologiques universels.
            </span>
          </div>
          <div className="box">
            <img src={Portas} alt="vega-img" />
            <h3>Vega</h3>
            <span>
              Veganebula était autrefois un être humain ordinaire sur la planète
              Terre. Passionné par l'astronomie dès son plus jeune âge, Vega
              s'est immergé dans l'étude des étoiles et des mystères de
              l'univers. Ses recherches et ses découvertes ont attiré
              l'attention d'une organisation secrète, connue sous le nom de
              l'Ordre des Astralites. Cet ordre ancien était dédié à la
              préservation de la connaissance cosmique et à la protection de
              l'équilibre entre les mondes.
            </span>
          </div>
        </div>
        <div className="parent new">
          <h1>
            <img src={SupportIcon} alt="dps_icon" />
            Support
          </h1>
          <div className="box">
            <img src={Ligee} alt="ligee-img" />
            <h3>Ligee</h3>
            <span>
              Princesse du royaume Marélysia, Ligée est la fille du roi Neptor.
              Sa voix enchanteresse lui permet de séduire quiconque entend son
              chant, et sa maitrise des artefacts magiques de Marélysia lui
              octroie des pouvoirs lui permettant d'aider son peuple et de le
              défendre.
            </span>
          </div>
          <div className="box">
            <img src={Steve} alt="steve-img" />
            <h3>Steve</h3>
            <span>
              Enfant complétement fou, Steve se prend pour un docteur. Interné
              dans un hopital psychiatrique, il a réussi à s'enfuir et voler une
              seringue. Il parcourt les rues sinistres de Nocturnia en volant le
              sang des passants, seul...
            </span>
          </div>
          <div className="box">
            <img src={Morpha} alt="manik-img" />
            <h3>Manik</h3>
            <span>
              Incarnation de la moralité, Manik représente la balance entre le
              bien et le mal. Il change de forme et d'attitude en fonction des
              actions qu'il effectue.
            </span>
          </div>
          <div className="box">
            <img src={Sousou} alt="sousou-img" />
            <h3>Sousou</h3>
            <span>
              Voleur sans égal, Sousou est connu pour voler tout et tout le
              monde. Dans chacun de ses vols, il a l'habitude de cacher son
              butin dans ses deux grosses poches. il s'associe à un partenaire
              différent à chaque coup et partage ses trésors.
            </span>
          </div>
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        <div className="parent">
          <div className="children">
            <h1>
              <img src={TankIcon} alt="dps_icon" />
              Tank
            </h1>
            <div
              className="contain"
              style={{
                gridTemplateColumns:
                  hoveredBox === 1
                    ? "10fr 1fr 1fr 1fr"
                    : hoveredBox === 2
                    ? "1fr 10fr 1fr 1fr"
                    : hoveredBox === 3
                    ? "1fr 1fr 10fr 1fr"
                    : hoveredBox === 4
                    ? "1fr 1fr 1fr 10fr"
                    : "1fr 1fr 1fr 1fr",
              }}
            >
              <div
                className="box box-1 tank"
                style={{ "--img": `url(${BigEd})` }}
                data-text="BigEd"
                data-subtext="Malformé de naissance, Ed a été moqué toute son enfance, ce qui l'a rendu fou. Pour cacher son énorme tête, il se met sous un drap couvrant l'entièreté de son corps. Depuis ce jour, il utilise sa tête pour se défendre."
                onMouseEnter={() => setHoveredBox(1)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
              <div
                className="box box-2 tank"
                style={{ "--img": `url(${Tami})` }}
                data-text="Tami"
                data-subtext="Armure d'un samouraï refusant la mort, son âme a fusionné avec celle-ci. Maintenant, il est le protecteur de l'île de Shinrakushima."
                onMouseEnter={() => setHoveredBox(2)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
              <div
                className="box box-3 tank"
                style={{ "--img": `url(${JAlien})` }}
                data-text="JAlien"
                data-subtext="Dénommé Jalien par les hommes à cause de sa ressemblance avec un certain piment de la planète Terre. Jalien va de planète en planète pour pouvoir se nourrir et ainsi féconder ses oeufs qui, à leur éclosion, dévasteront la planète sur laquelle ils se trouvent, ne laissant aucune trace de vie."
                onMouseEnter={() => setHoveredBox(3)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
              <div
                className="box box-4 tank"
                style={{ "--img": `url(${Frostorc})` }}
                data-text="Frostorc"
                data-subtext="Chef de guerre d'une tribu d'orc de gel, il est belliqueux et impose le respect à ses soldats. Bien qu'à première vue Frostorc parait froid et menaçant, son ultime objectif est d'unifier les tribus d'orc de gel afin de vivre en paix ... quel qu'en soit le prix."
                onMouseEnter={() => setHoveredBox(4)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
            </div>
          </div>
        </div>
        <div className="parent">
          <div className="children">
            <h1>
              <img src={VoiderIcon} alt="dps_icon" />
              Voider
            </h1>
            <div
              className="contain"
              style={{
                gridTemplateColumns:
                  hoveredBox === 5
                    ? "10fr 1fr 1fr 1fr"
                    : hoveredBox === 6
                    ? "1fr 10fr 1fr 1fr"
                    : hoveredBox === 7
                    ? "1fr 1fr 10fr 1fr"
                    : hoveredBox === 8
                    ? "1fr 1fr 1fr 10fr"
                    : "1fr 1fr 1fr 1fr",
              }}
            >
              <div
                className="box box-1 voider"
                style={{ "--img": `url(${Sun})` }}
                data-text="Sun"
                data-subtext=" Un jour, tandis qu'il explorait les environs, il découvrit deux bâtons abandonnés par terre. Les bâtons semblaient être une extension naturelle de ses membres. Sun, dont la démonstration de combat avec les deux bâtons laissa une empreinte durable dans les mémoires des habitants de la jungle."
                onMouseEnter={() => setHoveredBox(5)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
              <div
                className="box box-2 voider"
                style={{ "--img": `url(${Breto})` }}
                data-text="Breto"
                data-subtext="Breto est le cousin de Ligée. Il est soldat dans la Garde Royal de Marélysia. Quand Ligée a été appelée pour défendre l'univers, il l'a suivi pour la protéger. Breto utilise sa vitesse et son incroyable ouïe au combat."
                onMouseEnter={() => setHoveredBox(6)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
              <div
                className="box box-3 voider"
                style={{ "--img": `url(${Not})` }}
                data-text="?"
                data-subtext="Bientôt disponible..."
                onMouseEnter={() => setHoveredBox(7)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
              <div
                className="box box-4 voider"
                style={{ "--img": `url(${Not})` }}
                data-text="?"
                data-subtext="Bientôt disponible..."
                onMouseEnter={() => setHoveredBox(8)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
            </div>
          </div>
        </div>
        <div className="parent">
          <div className="children">
            <h1>
              <img src={DpsIcon} alt="dps_icon" />
              DPS
            </h1>
            <div
              className="contain"
              style={{
                gridTemplateColumns:
                  hoveredBox === 9
                    ? "10fr 1fr 1fr 1fr"
                    : hoveredBox === 10
                    ? "1fr 10fr 1fr 1fr"
                    : hoveredBox === 11
                    ? "1fr 1fr 10fr 1fr"
                    : hoveredBox === 12
                    ? "1fr 1fr 1fr 10fr"
                    : "1fr 1fr 1fr 1fr",
              }}
            >
              <div
                className="box box-1 dps"
                style={{ "--img": `url(${Actio})` }}
                data-text="Actio"
                data-subtext="Sentinelle armée d'Androméria, une planète aux technologies avancées, Actio est devenu chasseur de prime lorsque son bataillon a été laissé pour mort lors d'une bataille de conquête perdue par son peuple."
                onMouseEnter={() => setHoveredBox(9)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
              <div
                className="box box-2 dps"
                style={{ "--img": `url(${Cons})` }}
                data-text="Cons"
                data-subtext="À l'origine, Cons n'était qu'une simple table d'incantation d'un groupe de puissants mages. Mais lors d'une cérémonie ratée par les mages, Cons pris vie et gagna des pouvoirs cosmiques puisant son énergie de l'univers même. Depuis, il parcourt l'univers pour le protéger."
                onMouseEnter={() => setHoveredBox(10)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
              <div
                className="box box-3 dps"
                style={{ "--img": `url(${Elydre})` }}
                data-text="Elydre"
                data-subtext="Créature légendaire pour certains, divinité pour d'autres, Elydre est connu à travers l'univers pour sa capacité à contrôler les éléments.

                Certains peuples de la galaxie pensent même que son humeur serait à l'origine de tous les phénomènes naturels et météorologiques universels."
                onMouseEnter={() => setHoveredBox(11)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
              <div
                className="box box-4 dps"
                style={{ "--img": `url(${Portas})` }}
                data-text="Vega"
                data-subtext="Veganebula était autrefois un être humain ordinaire sur la planète Terre. Passionné par l'astronomie dès son plus jeune âge, Vega s'est immergé dans l'étude des étoiles et des mystères de l'univers.

                Ses recherches et ses découvertes ont attiré l'attention d'une organisation secrète, connue sous le nom de l'Ordre des Astralites. Cet ordre ancien était dédié à la préservation de la connaissance cosmique et à la protection de l'équilibre entre les mondes."
                onMouseEnter={() => setHoveredBox(12)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
            </div>
          </div>
        </div>
        <div className="parent">
          <div className="children">
            <h1>
              <img src={SupportIcon} alt="dps_icon" />
              Support
            </h1>
            <div
              className="contain"
              style={{
                gridTemplateColumns:
                  hoveredBox === 13
                    ? "10fr 1fr 1fr 1fr"
                    : hoveredBox === 14
                    ? "1fr 10fr 1fr 1fr"
                    : hoveredBox === 15
                    ? "1fr 1fr 10fr 1fr"
                    : hoveredBox === 16
                    ? "1fr 1fr 1fr 10fr"
                    : "1fr 1fr 1fr 1fr",
              }}
            >
              <div
                className="box box-1 support"
                style={{ "--img": `url(${Ligee})` }}
                data-text="Ligée"
                data-subtext="Princesse du royaume Marélysia, Ligée est la fille du roi Neptor. Sa voix enchanteresse lui permet de séduire quiconque entend son chant, et sa maitrise des artefacts magiques de Marélysia lui octroie des pouvoirs lui permettant d'aider son peuple et de le défendre."
                onMouseEnter={() => setHoveredBox(13)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
              <div
                className="box box-2 support"
                style={{ "--img": `url(${Steve})` }}
                data-text="Steve"
                data-subtext="Enfant complétement fou, Steve se prend pour un docteur. Interné dans un hopital psychiatrique, il a réussi à s'enfuir et voler une seringue. Il parcourt les rues sinistres de Nocturnia en volant le sang des passants, seul..."
                onMouseEnter={() => setHoveredBox(14)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
              <div
                className="box box-3 support"
                style={{ "--img": `url(${Morpha})` }}
                data-text="Manik"
                data-subtext="Incarnation de la moralité, Manik représente la balance entre le bien et le mal. Il change de forme et d'attitude en fonction des actions qu'il effectue."
                onMouseEnter={() => setHoveredBox(15)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
              <div
                className="box box-4 support"
                style={{ "--img": `url(${Sousou})` }}
                data-text="Sousou"
                data-subtext="Voleur sans égal, Sousou est connu pour voler tout et tout le monde. Dans chacun de ses vols, il a l'habitude de cacher son butin dans ses deux grosses poches. il s'associe à un partenaire différent à chaque coup et partage ses trésors."
                onMouseEnter={() => setHoveredBox(16)}
                onMouseLeave={() => setHoveredBox(null)}
              ></div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default ChampionsList;
