import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card";

const Scoops = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/scoops")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="container my-5">
      <h1>Types of IceCream</h1>
      <p>
        One ball : <span className="text-success">20₺</span>
      </p>
      <h3>
        Total Price :{" "}
        <span className="text-success">{basket.length * 20}  ₺</span>
      </h3>

      <div className="row gap-5 justify-content-between mt-4 p-3">
        {data.map((i) => (
          <Card
            basket={basket}
            setBasket={setBasket}
            item={i}
            key={i.name} />
        ))}
      </div>
    </div>
  );
};

export default Scoops;
