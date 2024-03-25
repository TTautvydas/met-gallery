import React, { useState, useEffect, useMemo } from "react";
import { StyledImage } from "../styles/image.style";
import axios from "axios";
import { Wrapper } from "../styles/HomePage.style";

const HomePage: React.FC = () => {
  const [objectList, setObjectList] = useState([]);
  const [randomID, setRandomID] = useState<number | null>(null);
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [objectData, setObjectData] = useState<any>(null);

  // get all object IDs and save it to state
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

  // out of object IDs list get a random ID and save it to state
  useEffect(() => {
    if (objectList.length > 0 && randomID === null) {
      const randomIndex = Math.floor(Math.random() * objectList.length);
      const randomID = objectList[randomIndex];
      setRandomID(randomID);
    }
  }, [objectList, randomID]);

  //use random id to fetch object data and save it to state
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

  //render object title, name, image
  return (
    <Wrapper>
      <h1>ID: {randomID}</h1>
      {objectData && (
        <>
          <h2>Title: {objectData.title}</h2>
          <h3>Artist: {objectData.artistDisplayName}</h3>
        </>
      )}
      {primaryImage && <StyledImage src={primaryImage} alt="Primary image" />}
    </Wrapper>
  );
};

export default HomePage;
