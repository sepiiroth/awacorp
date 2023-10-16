import Error from "../../components/Error";
import { useEffect } from "react";

function ErrorPage() {
  useEffect(() => {
    document.title = "Oops! - For the Universe";
  }, []);

  return <Error />;
}

export default ErrorPage;
