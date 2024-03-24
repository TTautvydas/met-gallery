import React, { useState, useEffect, useMemo } from "react";
import { StyledImage } from "../styles/image.style";
import axios from "axios";

const HomePage: React.FC = () => {
  const [objectList, setObjectList] = useState([]);
  const [randomID, setRandomID] = useState<number | null>(null);
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [objectData, setObjectData] = useState<any>(null);

  useEffect(() => {
    axios
      .get(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11"
      )
      .then(({ data }) => {
        setObjectList(data.objectIDs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [objectList]);

  useEffect(() => {
    if (objectList.length > 0 && randomID === null) {
      const randomIndex = Math.floor(Math.random() * objectList.length);
      const randomID = objectList[randomIndex];
      setRandomID(randomID);
    }
  }, [objectList, randomID]);

  useEffect(() => {
    if (randomID !== null) {
      axios
        .get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID}`
        )
        .then(({ data }) => {
          setPrimaryImage(data.primaryImage);
          setObjectData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [randomID]);

  return (
    <div>
      <h1> {randomID}</h1>
      {objectData && (
        <>
          <h3>{objectData.title}</h3>
          <h4>{objectData.artistDisplayName}</h4>
        </>
      )}
      {primaryImage && <StyledImage src={primaryImage} alt="Primary image" />}
    </div>
  );
};

export default HomePage;
