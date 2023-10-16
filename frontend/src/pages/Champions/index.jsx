import ChampionsList from "../../components/ChampionsList";
import Title from "../../components/Title";
import { useEffect } from "react";

function Champions() {
  useEffect(() => {
    document.title = "Champions - For the Universe";
  }, []);

  return (
    <div>
      <Title title="Champions" />
      <ChampionsList />
    </div>
  );
}

export default Champions;
