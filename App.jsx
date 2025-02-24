import { useState, useEffect } from "react";
import "./App.css";
import RawData from "./FishData.json";
import FishList from "./components/FishList";
import FishForm from "./components/FishForm";

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [fishList, setFishList] = useState(RawData.fish);
  const [valid, setValid] = useState(false);
  const [addToPage, setAddToPage] = useState(false);
  const [volume, setVolume] = useState(0);

  //Akvárko - rozměry
  const [tempSize, setTempSize] = useState({
    length: "",
    width: "",
    height: "",
  });

  //Definování potřeby objemu rybiček
  const [fishRequierements, setFishRequierements] = useState({
    small: 10,
    big: 40,
  });

  //Validace velikosti akvárka pro potřeby rybiček
  const validateData = () => {
    const { length, width, height } = tempSize;
    if (
      length !== "" &&
      width !== "" &&
      height !== "" &&
      length !== 0 &&
      width !== 0 &&
      height !== 0 &&
      (length * width * height) / 1000 !== 0 &&
      (length * width * height) / 1000 >=
        fishRequierements.small + fishRequierements.big
    ) {
      setVolume((length * width * height) / 1000);
      setValid(true);
    } else {
      setValid(false);
    }
  };

  //Funkce pro smazání inputů po scvhálení rozměrů
  const resetAquarium = () => {
    const temp = {
      length: "",
      width: "",
      height: "",
    };
    setTempSize(temp);
  };

  useEffect(() => {
    validateData();
  }, [tempSize, fishRequierements]);

  //Handle funkce přijímá zapsané rozměry a ukládá do objektu
  const handleDimensions = (e) => {
    const source = e.target.name;
    switch (source) {
      case "length": {
        setTempSize({ ...tempSize, length: e.target.value });
        setAddToPage(false);
        break;
      }
      case "width": {
        setTempSize({ ...tempSize, width: e.target.value });
        setAddToPage(false);
        break;
      }
      case "height": {
        setTempSize({ ...tempSize, height: e.target.value });
        setAddToPage(false);
        break;
      }
      default:
        break;
    }
  };

  //Funkce po validaci rozměrů vepiše hlášku na stránce
  const handleApproveDimensions = () => {
    setAddToPage(true);
  };

  // ************************************************************
  //Handle funkce pro mazání dat (rybiček)
  const handleDelete = (idToDel, FishType) => {
    if (FishType === "small") {
      setFishRequierements({
        ...fishRequierements,
        small: fishRequierements.small - 10,
      });
    } else if (FishType === "big") {
      setFishRequierements({
        ...fishRequierements,
        big: fishRequierements.big - 20,
      });
    }
    const temp = fishList.filter((fish) => fish.id !== idToDel);
    setFishList(temp);
  };

  //Handle funkce pro přidání rybičky na seznam
  const handleAdd = (fish) => {
    if (fish.type === "small") {
      setFishRequierements({
        ...fishRequierements,
        small: fishRequierements.small + 10,
      });
    } else if (fish.type === "big") {
      setFishRequierements({
        ...fishRequierements,
        big: fishRequierements.big + 20,
      });
    }
    setFishList([...fishList, fish]);
  };

  useEffect(() => {
    if (volume < fishRequierements.small + fishRequierements.big) {
      setAddToPage(false);
    }
    if (fishRequierements.small + fishRequierements.big === 0) {
      setAddToPage(false);
    }
  });

  // ************************************************************
  return (
    <div className="page-container">
      <div className="page-toggler">
        <button
          className={`toggler-btn ${activeTab === 1 ? "active" : ""}`}
          name="list-of-fish"
          onClick={() => setActiveTab(1)}
        >
          Rybičky
        </button>

        <button
          className={`toggler-btn ${activeTab === 2 ? "active" : ""}`}
          name="aquarium"
          onClick={() => setActiveTab(2)}
        >
          Akvárium
        </button>
      </div>

      {activeTab === 1 && (
        <>
          <FishList data={fishList} onDelete={handleDelete} />
          <FishForm data={fishList} onAdd={handleAdd} />
        </>
      )}

      {activeTab === 2 && (
        <>
          <h1>Plánování rozměrů akvária</h1>
          <div className="aquarium-item">
            <p>
              {fishRequierements.small !== 0 ? (
                <>
                  🐟 Všechny malé rybičky z tvého seznamu potřebují{" "}
                  {fishRequierements.small} l vody
                </>
              ) : (
                <>🐟 V seznamu nejsou žádné malé rybičky</>
              )}
            </p>
          </div>
          <div className="aquarium-item">
            <p>
              {fishRequierements.big !== 0 ? (
                <>
                  🐠 Všechny velké rybičky z tvého seznamu potřebují{" "}
                  {fishRequierements.big} l vody
                </>
              ) : (
                <>🐠 V seznamu nejsou žádné velké rybičky</>
              )}
            </p>
          </div>
          <div
            className={`${addToPage === true ? "aquarium-item-approve" : ""}`}
          >
            <p>
              {addToPage === true
                ? `Navržené akvárium má objem ${volume} l a je dostatečně velké pro všechny rybičky`
                : ""}
            </p>
          </div>
          <div className="aquarium-form">
            <input
              type="number"
              name="length"
              id="length"
              placeholder="délka akvária (cm)"
              value={tempSize.length}
              onChange={handleDimensions}
            />
            <input
              type="number"
              name="width"
              id="width"
              placeholder="šířka (cm)"
              value={tempSize.width}
              onChange={handleDimensions}
            />
            <input
              type="number"
              name="height"
              id="height"
              placeholder="výška (cm)"
              value={tempSize.height}
              onChange={handleDimensions}
            />
            <button
              className="btn-aquarium"
              disabled={!valid}
              onClick={() => {
                resetAquarium();
                handleApproveDimensions();
              }}
            >
              📐Schválit rozměry
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
