import { useEffect } from "react";
import Title from "../../components/Title";
import DoubleDesc from "../../components/DoubleDesc";
import TripleDesc from "../../components/TripleDesc";
import Text from "../../components/Text";

import CalculMatchmaking from "../../components/CalculMatchmaking";
function Matchmaking() {
  useEffect(() => {
    document.title = "Matchmaking - For the Universe";
  }, []);

  return (
    <div>
      <Title title="MATCHMAKING" description="EXPLICATION" />
      <DoubleDesc />
      <TripleDesc />
      <CalculMatchmaking />
      <Text
        description="Besoin de tester le matchmaking ?"
        btn="yes"
        btnText="Tester le matchmaking"
        btnLink="/simulation"
      />
    </div>
  );
}

export default Matchmaking;
