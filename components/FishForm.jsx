import React, { useEffect } from "react";
import { useState } from "react";
import "./FishForm.css";

function FishForm({ data, onAdd }) {
  const [valid, setValid] = useState(false);
  const [newFish, setNewFish] = useState({
    id: data.length > 0 ? Math.max(...data.map((fish) => fish.id)) + 1 : 1,
    name: "",
    type: "small",
  });

  const [selectedValue, setSelectedValue] = useState("small");

  const handleRadioChange = (value) => {
    console.log(value)
    let updatedFish = { ...newFish, type: value };
    setSelectedValue(value);
    setNewFish(updatedFish);
    validateData(newFish);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    let updatedFish = { ...newFish, name: val };
    setNewFish(updatedFish);
    validateData(updatedFish);
  };

  const validateData = (fish) => {
    if (fish.name === "") {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const resetNewFish = () => {
    const temp = {
      id: newFish.id + 1,
      name: "",
      type: selectedValue,
    };
    setNewFish(temp);
    setSelectedValue(selectedValue);
    validateData(temp);
  };

  return (
    <div className="fish-form">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="jméno rybky"
        value={newFish.name}
        onChange={handleChange}
      />
      <label htmlFor="option1">
        <input
          type="radio"
          id="option1"
          value="small"
          checked={selectedValue === "small"}
          onChange={() => handleRadioChange("small")}
        />
        Malá 🐟
      </label>

      <label htmlFor="option2">
        <input
          type="radio"
          id="option2"
          value="big"
          checked={selectedValue === "big"}
          onChange={() => handleRadioChange("big")}
        />
        Velká 🐠
      </label>

      <button
      className="btn-add"
        disabled={!valid}
        onClick={() => {
          resetNewFish();
          onAdd(newFish);
        }}
      >
        {selectedValue === "small" ? "🐟Přidej" : "🐠Přidej"}
      </button>
    </div>
  );
}

export default FishForm;