import { Link, Menu, MenuItem, MenuList, MenuButton } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";

const FileButton = () => {
  const [hostVarFiles, setHostVarFiles] = useState([]);
  axios.get("/host-vars").then((res) => setHostVarFiles(res.data.hostVarFiles));
  return (
    <>
      <Menu>
        <MenuButton
          px={4}
          py={2}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: "gray.400" }}
          _expanded={{ bg: "blue.400" }}
          _focus={{ boxShadow: "outline" }}
        >
          Files <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          {hostVarFiles.map((file) => {
            return (
              <MenuItem>
                <Link href={window.location + "/host-vars/" + file}>
                  {file}
                </Link>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};

export default FileButton;
