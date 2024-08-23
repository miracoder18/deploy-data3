import React from "react";

import { Button, ButtonGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Center, Square, Circle } from '@chakra-ui/react'
function Postform({
  datas,
  setdatas,
  name,
  setname,
  price,
  setprice,
  stock,
  setstock,
}) {
  return (
    <div>
      <Center><form
      
     
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log("hde");
        }}
      >
        <label htmlFor="">Name</label>
        <Input
        variant='filled'
         isInvalid
    errorBorderColor='red.300'
       
          placeholder="Basic usage"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <label htmlFor="">Unitprice</label>
        <Input
         isInvalid
    errorBorderColor='red.300'
        variant='filled'
       
          placeholder="Basic usage"
          value={price}
          onChange={(e) => {
            setprice(e.target.value);
          }}
        />
        <label htmlFor="">unitsInStock</label>
        <Input
         isInvalid
    errorBorderColor='red.300'
        variant='filled'
        
          placeholder="Basic usage"
          value={stock}
          onChange={(e) => {
            setstock(e.target.value);
          }}
        />
        <Button
     margin={4}
          colorScheme="teal"
          type="submit"
          onClick={() => {
            let obj = {
              name: name,
              unitPrice: price,
              unitsInStock: stock,
            };
            fetch("https://northwind.vercel.app/api/products/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(obj),
            }).then((res) => {
              setdatas([...datas, res.data]);
            });
            setname("");
            setprice(0);
            setstock(0);
          }}
        >
          Post
        </Button>
      </form></Center>
      
    </div>
  );
}

export default Postform;
