import logo from "./logo.svg";
import "./App.css";
import MyTreeView from "./treeview";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { ChakraProvider, Stack } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Link,
  Menu,
  MenuIcon,
  MenuItem,
  MenuList,
  MenuDivider,
  MenuButton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { TreeItem } from "@mui/x-tree-view";
import { TreeView } from "@mui/x-tree-view";
import { useEffect } from "react";
import Practice from "./practice";
import NavBar from "./NavBar";
import FileButton from "./FileButton";
import ExpandedView from "./practice2";

function App() {
  const [redirection, setRedirection] = useState("inventory");
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
    setRedirection("/" + ("" + input.files[0].name).split(".zip")[0]);
  }

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/:variable/">
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
                        <Link as="a" color="white" href={redirection}>
                          Submit
                        </Link>
                      </Button>
                    </Stack>
                    <Tabs defaultIndex={0}>
                      <TabList>
                        <Tab>Hosts</Tab>
                        <Tab>Host Vars</Tab>
                        <Tab>Group Vars</Tab>
                      </TabList>

                      <TabPanels>
                        <TabPanel> </TabPanel>
                        <TabPanel>
                          <FileButton></FileButton>
                        </TabPanel>
                        <TabPanel></TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>
                  <TabPanel></TabPanel>
                </TabPanels>
              </Tabs>
            </ChakraProvider>
          </Route>
          <Route exact path="/:variable/host-vars/:variable">
            <NavBar index={1}></NavBar>
          </Route>
          <Route path="/:variable/host-vars/">
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
                    <Tabs defaultIndex={1}>
                      <TabList>
                        <Tab>Hosts</Tab>
                        <Tab>Host Vars</Tab>
                        <Tab>Group Vars</Tab>
                      </TabList>

                      <TabPanels>
                        <TabPanel> </TabPanel>
                        <TabPanel>
                          <ExpandedView></ExpandedView>
                        </TabPanel>
                        <TabPanel></TabPanel>
                      </TabPanels>
                    </Tabs>
                  </TabPanel>
                  <TabPanel>
                    <ExpandedView></ExpandedView>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ChakraProvider>
          </Route>

          <Route>
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
                        <Link as="a" color="white" href={redirection}>
                          Submit
                        </Link>
                      </Button>
                    </Stack>
                  </TabPanel>
                  <TabPanel></TabPanel>
                </TabPanels>
              </Tabs>
            </ChakraProvider>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
