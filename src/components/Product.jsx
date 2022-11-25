import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { data } from "../data.js";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {MyImg} from "./MyImg.jsx";

export const Product = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log("url paraméter:", params);
  const selProduct = data.find((obj) => obj.id == params.id);
  console.log(selProduct);
  return (
    <Card style={{ width: "18rem" }}>
        <MyImg selProduct={selProduct}/>
      {/*<Card.Img variant="top" src={selProduct.imgUrl} />*/}
      <Card.Body>
        <Card.Title>{selProduct.name}</Card.Title>
        <Card.Text>
          Price: {selProduct.price}$
        </Card.Text>
        <Button variant="primary" onClick={() => navigate("/products")}>
          Back to all products
        </Button>
      </Card.Body>
    </Card>
  );
};
