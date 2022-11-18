import React, { useState } from "react";
import Cupcake from "@components/Cupcake";

export default function CupcakeList() {
  const [cupcakes, setCupcakes] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [selectAccessorie, setSelectAccessorie] = useState("");

  // Step 1: get all cupcakes
  React.useEffect(() => {
    fetch("http://localhost:4000/cupcakes")
      .then((res) => res.json())
      .then((data) => setCupcakes(data));
  }, []);

  // Step 3: get all accessories
  React.useEffect(() => {
    fetch("http://localhost:4000/accessories")
      .then((res) => res.json())
      .then((data) => setAccessories(data));
  }, []);

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectAccessorie}
            onChange={(e) => {
              setSelectAccessorie(e.target.value);
            }}
          >
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
            {accessories.map((accessorie) => {
              return (
                <option key={accessorie.id} value={accessorie.id}>
                  {accessorie.name}
                </option>
              );
            })}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {cupcakes
          .filter(
            (cupcake) =>
              selectAccessorie === "" ||
              cupcake.accessory_id === selectAccessorie
          )

          .map((cupcake) => (
            <li>
              <Cupcake key={cupcake.id} cupcake={cupcake} />
            </li>
          ))}

        <li className="cupcake-item">
          <Cupcake />
        </li>
        {/* end of block */}
      </ul>
    </>
  );
}
