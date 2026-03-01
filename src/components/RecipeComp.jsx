import React, { useEffect, useState } from "react";

function RecipeComp() {
  const url = "https://dummyjson.com/recipes";

  const [data, setData] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const dataObj = await response.json();
      setData(dataObj.recipes);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Recipes</h1>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {data.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            style={{
              boxShadow: "0px 0px 5px black",
              width: "260px",
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />

            <h3>{recipe.name}</h3>

            <p><strong>Ingredients:</strong></p>
            <ul>
              {recipe.ingredients.slice(0, 3).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p><strong>Tags:</strong> {recipe.tags.join(", ")}</p>

            <p>⭐ {recipe.rating} ({recipe.reviewCount} reviews)</p>

            <p><strong>Meal:</strong> {recipe.mealType.join(", ")}</p>
          </div>
        ))}
      </div>

      {/* Popup / Modal */}
      {selectedRecipe && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              width: "400px",
              borderRadius: "10px",
              maxHeight: "80%",
              overflowY: "auto",
            }}
          >
            <h2>{selectedRecipe.name}</h2>

            <p><strong>Prep Time:</strong> {selectedRecipe.prepTimeMinutes} mins</p>
            <p><strong>Cook Time:</strong> {selectedRecipe.cookTimeMinutes} mins</p>

            <p><strong>Instructions:</strong></p>
            <ol>
              {selectedRecipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <button
              onClick={() => setSelectedRecipe(null)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default RecipeComp;
