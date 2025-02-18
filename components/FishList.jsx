import React from "react";

function FishList({ data, onDelete }) {
  return (
    <>
      <h1>Seznam rybiček</h1>
      <div className="list">
        {data.map((fish) => {
          return (
            <div className="item" key={fish.id}>
              <span>
                <big>{fish.name}</big> /{" "}
                {fish.type === "small"
                  ? "🐟malá rybička (10 l vody)"
                  : "🐠velká rybka (20 l vody)"}
              </span>
              <button
                onClick={() => onDelete(fish.id, fish.type)}
                className="btn-delete"
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FishList;
