"use client";

import * as React from "react";
import { useState } from "react";
import axios from "axios";
import yaml from "yaml";

import { DeleteIcon, AddIcon, EditIcon } from "@chakra-ui/icons";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Stack,
  Textarea,
  Text,
  Link,
  Button,
} from "@chakra-ui/react";
import MyTreeView from "./treeview";

const Practice2 = () => {
  const [disable, setDisable] = useState(true);
  const [obj, setObj] = useState({});
  const [obj2, setObj2] = useState();
  const [submitActive, setSubmitActive] = useState(false);
  const [content, setContent] = useState();
  const k = window.location.href.split("/");
  const [came, setCame] = useState(false);

  axios.post("/host-vars", { ref: k[5] }).then((res) => {
    setObj(res.data.response);
    setObj2(res.data.response);
    const link = (window.location + "").split("host-vars/")[1];
    let itemArr = [];
    link.split("/").map((item) => itemArr.push(item));
    itemArr.map((item) => {
      if (typeof obj2 == "object") {
        setObj2(obj2[item]);
      } else {
      }
    });
    setCame(true);
  });

  function edit() {
    setDisable(false);
    setSubmitActive(true);
  }
  function onChange(event) {
    setContent(event.target.value);
  }

  function renderTree(nodes, path) {
    path = path + "/" + nodes[0];
    return (
      <>
        <AccordionItem>
          <h2>
            <AccordionButton
              _expanded={{ bg: "#E53E3E", color: "white" }}
              href="/"
            >
              <Link as="a" color="black" href={window.location + path}>
                {nodes[0]}
              </Link>

              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg="#FFF5F5">
            {typeof nodes[1] === "object" ? (
              Array.isArray(nodes[1]) ? (
                nodes[1].map((node) =>
                  Object.entries(node).map((item) => renderTree(item, path))
                )
              ) : (
                Object.entries(nodes[1]).map((node) => renderTree(node, path))
              )
            ) : (
              <>{nodes[1]}</>
            )}
          </AccordionPanel>
        </AccordionItem>
      </>
    );
  }

  return (
    <>
      <Stack direction="row">
        {Array(1)
          .fill()
          .map(() => {
            return (
              <>
                <ChakraProvider>
                  <Accordion allowMultiple w="20%">
                    {Object.entries(obj).map((node) => renderTree(node, ""))}
                  </Accordion>
                </ChakraProvider>
              </>
            );
          })}
        <br></br>
        <Box w="50%">
          {came ? (
            <>
              <Box bg="#FFF5F5">
                <Text fontSize="xl" color="tomato">
                  {(window.location + "").split("/").slice(-1)}
                </Text>
              </Box>
              <textarea
                disabled={disable}
                class="form-control"
                w="50%"
                rows={yaml.stringify(obj2).length / 15}
                onChange={onChange}
              >
                {yaml.stringify(obj2)}
              </textarea>
            </>
          ) : null}
          <br></br>
          {submitActive ? (
            <Button colorScheme="facebook" size="sm">
              Submit
            </Button>
          ) : null}
        </Box>
        <br></br>
        <br></br>
        {came ? (
          <Stack>
            <Button colorScheme="gray" size="xs" onClick={edit}>
              <EditIcon></EditIcon>
              Edit
            </Button>
            <Button colorScheme="teal" size="xs">
              <AddIcon></AddIcon>
              Add Item
            </Button>
            <Button colorScheme="red" size="xs">
              <DeleteIcon></DeleteIcon>
              Delete This Item
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </>
  );
};

export default Practice2;
