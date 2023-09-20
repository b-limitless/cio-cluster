import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const test = async () => {
      try {
        const response = await axios.post("/api/users/verify", {
          verificationCode: "43813",
        });
        console.log("response", response);
      } catch (err) {
        console.log(err);
      }
    };
    test();
  }, []);

  console.log("hello updae")
  
  return <div className="App"></div>;
}

export default App;
