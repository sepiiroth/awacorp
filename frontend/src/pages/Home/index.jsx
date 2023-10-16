import Banner from "../../components/Banner";
import ImageWithText from "../../components/ImageWithText";
import Logo from "../../assets/logo.png";
import Character from "../../assets/character.png";
import FightDiv from "../../components/FightDiv";
import Text from "../../components/Text";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "For the Universe";
  }, []);

  return (
    <div>
      <Banner />
      <ImageWithText
        title="UNE NOUVELLE ÈRE COMMENCE"
        description="For The Universe : où deux demi-dieux s'affrontent dans une danse stellaire pour le contrôle ultime de l'espace, décidant du sort des galaxies à chaque duel."
        image={Logo}
        part="left"
      />
      <FightDiv />
      <ImageWithText
        title="PRÊT À CHANGER LE DESTIN?"
        description="Plongez dans l'arène cosmique avec une multitude de champions, chacun doté de sorts uniques."
        image={Character}
        btn="true"
        part="right"
      />
      <Text
        description="Rejoignez la bataille cosmique dès maintenant."
        btn="true"
      />
    </div>
  );
}

export default Home;
