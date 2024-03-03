import { TreeItem } from "@mui/x-tree-view";
import { TreeView } from "@mui/x-tree-view";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

// Function component for the TreeView

const MyTreeView = () => {
  const [obj, setObj] = useState({});
  const k = window.location.href.split("/");
  axios.post("/", { ref: k[3] }).then((res) => {
    setObj(res.data.response);
  });
  const [disabled, setDisabled] = useState(true);
  function f() {
    setDisabled(false);
  }

  const RenderTree = (nodes, dis) => {
    return (
      <>
        <TreeItem
          sx={{ bgcolor: "primary.main" }}
          key={nodes + ""}
          nodeId={nodes + ""}
          label={
            <>
              <div class="container justify-content-start">
                <div class="row">
                  <div class="col-sm justify-content-start">
                    <a href={"/" + nodes[0]}>{nodes[0] + ""}</a>
                  </div>
                </div>
              </div>
            </>
          }
        >
          {typeof nodes[1] === "object"
            ? Array.isArray(nodes[1])
              ? nodes[1].map((node) =>
                  typeof node == "object"
                    ? Object.entries(node).map((item) => RenderTree(item, true))
                    : null
                )
              : Object.entries(nodes[1]).map((node) => RenderTree(node, true))
            : null}
        </TreeItem>
      </>
    );
  };

  return (
    <>
      {Array(1)
        .fill()
        .map(() => {
          return (
            <>
              <TreeView sx={{}}>
                {Object.entries(obj).map((node) => RenderTree(node, true))}
              </TreeView>
            </>
          );
        })}
    </>
  );
};

export default MyTreeView;

/* 


app.post("/", (req, res) => {
  const path = "./" + req.body.ref + ".yaml";
  if (req.body.ref == "") res.send({ response: {} });
  else {
    const respond = yaml.load(fs.readFileSync(path, "utf-8"));

    res.send({ response: respond });
  }
});
*/
