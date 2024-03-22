import React, { useState, useEffect } from "react";
import { StyledImage } from "../styles/image.style";

const HomePage: React.FC = () => {
  const [objectData, setObjectData] = useState<any>(null);
  const [objectID, setObjectID] = useState<any>(null);

  const fetchData = async (id: string) => {
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
      if (!response.ok) {
        throw new Error("failed to fetch data");
      }
      const data = await response.json();
      setObjectData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /*
- Instead of object endpoint use department endpoint?
- Need to filter out all objects that have photos before rendering
*/

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(objectID);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={objectID}
          onChange={(e) => setObjectID(e.target.value)}
          placeholder="Enter Art ID"
        />
        <button type="submit">Get art</button>
      </form>
      {objectData ? (
        <div>
          {objectData.primaryImage ? (
            <div>
              <h1>{objectData.title}</h1>
              <StyledImage
                src={objectData.primaryImage}
                alt={objectData.title}
              />
            </div>
          ) : (
            <p>Photo not phound :/</p>
          )}
        </div>
      ) : (
        <p>Waiting...</p>
      )}
    </div>
  );
};

export default HomePage;
