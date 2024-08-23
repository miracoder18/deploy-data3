import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@chakra-ui/react";
import { FaBeer } from "react-icons/fa";
import { Flex, Spacer } from "@chakra-ui/react";
import Postform from "./Postform";
import Postbutton from "./Postbutton";

// import { CiSearch } from "react-icons/ci";

// url="https://northwind.vercel.app/api/products/";
function Tablex() {
  useEffect(() => {
    fetch("https://northwind.vercel.app/api/products/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setdatas(data);
      });
  }, []);
  useEffect(() => {
    fetch("https://northwind.vercel.app/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setButtonsaz(data);
      });
  }, []);
 
  const [datas, setdatas] = useState([]);
  const [search, setsearch] = useState("");
  const [edit, setedit] = useState({});
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const [stock, setstock] = useState(0);
  const [toog, settoog] = useState(0);

  console.log(search);

 

  return (
    <div>
        <div><Button colorScheme='yellow' variant='solid' margin={4}>
    Sort by name
  </Button></div>
  <div><Button colorScheme='yellow' variant='solid' margin={4}>
    Sort by price
  </Button></div>
  
      <Postbutton toog={toog} settoog={settoog} />
      {toog ? (
        <Postform
          datas={datas}
          setdatas={setdatas}
          name={name}
          setname={setname}
          price={price}
          setprice={setprice}
          stock={stock}
          setstock={setstock}
        />
      ) : null}

      <form action="">
        <Flex justifyContent="center">
          <Input
            variant="outline"
            m={8}
            w={600}
            placeholder="Search"
            boxShadow="dark-lg"
            p="6"
            rounded="md"
            bg="white"
            onChange={(e) => {
              setsearch(e.target.value);
              e.preventDefault();
            }}
          />
        </Flex>

        <TableContainer>
          <Table variant="striped" colorScheme="blue">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th> unitPrice</Th>
                <Th>unitsInStock</Th>
                <Th>discontinued</Th>
                <Th>Edit</Th>
                <Th>delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {datas
                .filter((elem) => {
                  return search.toLocaleLowerCase() === ""
                    ? elem
                    : elem.name.toLocaleLowerCase().includes(search);
                })
                .map((elem, i) => {
                  return (
                    <Tr
                      key={uuidv4()}
                      bg={elem.unitsInStock < 20 ? "red" : null}
                    >
                      <Td>
                        <b>{elem.id}</b>
                      </Td>
                      <Td> {elem.name}</Td>
                      <Td>{elem.unitPrice}</Td>
                      <Td>{elem.unitsInStock}</Td>
                      <Td>{elem.discontinued}</Td>
                      <Td>
                        <Button
                          colorScheme="teal"
                          data-id={elem.id}
                          onClick={(e) => {
                            setedit(e.target.getAttribute("data-id"));
                            console.log(
                              datas.find(
                                (elem) =>
                                  elem.id == e.target.getAttribute("data-id")
                              )
                            );

                            setname(
                              datas.find(
                                (elem) =>
                                  elem.id == e.target.getAttribute("data-id")
                              ).name
                            );
                            setprice(
                              datas.find(
                                (elem) =>
                                  elem.id == e.target.getAttribute("data-id")
                              ).unitPrice
                            );
                            setstock(
                              datas.find(
                                (elem) =>
                                  elem.id == e.target.getAttribute("data-id")
                              ).unitsInStock
                            );
                          }}
                        >
                          Edit
                        </Button>
                      </Td>
                      <Td>
                        {" "}
                        <Button
                          colorScheme="red"
                          data-id={elem.id}
                          onClick={(e) => {
                            let arr = [...datas];
                            arr = arr.filter(
                              (elem) =>
                                elem.id != e.target.getAttribute("data-id")
                            );
                            setdatas(arr);

                            fetch(
                              "https://northwind.vercel.app/api/products/" +
                                e.target.getAttribute("data-id"),
                              {
                                method: "DELETE",
                              }
                            );
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              {/* <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
        <Td >25.4</Td>
        <Td >25.4</Td>
        <Td ><Button colorScheme='teal' >
    Edit
  </Button></Td>
        <Td >  <Button colorScheme='red'>Delete</Button></Td>
      </Tr> */}
            </Tbody>
          </Table>
        </TableContainer>
      </form>
      <form
        m={9}
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          console.log("hde");
        }}
      >
        <label htmlFor="">Name</label>
        <Input
          placeholder="Basic usage"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <label htmlFor="">Unitprice</label>
        <Input
          placeholder="Basic usage"
          value={price}
          onChange={(e) => {
            setprice(e.target.value);
          }}
        />
        <label htmlFor="">unitsInStock</label>
        <Input
          placeholder="Basic usage"
          value={stock}
          onChange={(e) => {
            setstock(e.target.value);
          }}
        />
        <Button
          colorScheme="teal"
          type="submit"
          m={5}
          onClick={() => {
            console.log(elem.id);
            let obj = {
              name: name,
              unitPrice: price,
              unitsInStock: stock,
            };
            console.log(elem.id);
            fetch("https://northwind.vercel.app/api/products/" + elem.id, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(obj),
            }).then((res) => {
              setdatas([...datas, res.data]);
              let arr = [...datas];
              let findelement = arr.find((elem) => elem.id == res.data.id);
              datas.forEach(elem, (i) => {
                if (elem.id == findelement.id) {
                  console.log(id - si, i);
                }
              });
            });
            setname("");
            setprice(0);
            setstock(0);
          }}
        >
          Edit
        </Button>
      </form>
    </div>
  );
}

export default Tablex;
