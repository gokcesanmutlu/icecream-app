import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Toppings = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/toppings')
      .then((res) => setData(res.data));
  }, []);

  // tiklenmişse sepete ekler değilse çıkararır
  const handleChange = (e, item) => {
    e.target.checked
      ? setBasket([...basket, item])
      : setBasket(basket.filter((i) => i.name !== item.name));
  };

  return (
    <div className="container">
      <h1>Topping Type</h1>
      <p>
        One topping: <span className="text-success">3₺</span>
      </p>
      <h3>
        Total topping price:{''} <span>{basket.length * 3} ₺</span>
      </h3>

      <div className="row gap-3 p-3">
        {data.map((item) => (
          <div
            style={{ width: '150px' }}
            className="col d-flex flex-column align-items-center py-4 rounded-5 top-card"
          >
            <label
              className="d-flex flex-column align-items-center gap-3"
              htmlFor={item.name}
            >
              <img
                height={100}
                src={item.imagePath}
                alt="sos-resim"
              />
              <p className="text-center text-nowrap">{item.name}</p>
            </label>

            <input
              onChange={(e) => handleChange(e, item)}
              id={item.name}
              type="checkbox"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toppings;