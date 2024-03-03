import { ChakraProvider, Stack } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  LinkBox,
  LinkOverlay,
  Text,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import MyTreeView from "./treeview";
import { Box } from "@mui/material";
import { useState } from "react";
import LeftBar from "./practice";

const NavBar = (props) => {
  function submitFile() {
    var input = document.getElementById("formFileSm");
    const formData = new FormData();
    console.log(input.files[0]);
    formData.append("files", input.files[0]);
    formData.append("filename", input.files[0].name);
    fetch("/", {
      method: "POST",
      body: formData,
    });
  }
  return (
    <>
      <ChakraProvider>
        <Tabs size="md" variant="enclosed">
          <TabList>
            <Tab>Update Inventory</Tab>
            <Tab>Create Inventory</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack gap={0} direction="row" width="50%">
                <input
                  class="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  name="files"
                  onChange={submitFile}
                />
                <Button size="sm" colorScheme="facebook">
                  Submit
                </Button>
              </Stack>
              <Tabs defaultIndex={props.index}>
                <TabList>
                  <Tab>Hosts</Tab>
                  <Tab>Host Vars</Tab>
                  <Tab>Group Vars</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel> </TabPanel>
                  <TabPanel>
                    <LeftBar></LeftBar>
                  </TabPanel>
                  <TabPanel></TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <LeftBar></LeftBar>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ChakraProvider>
    </>
  );
};

export default NavBar;
