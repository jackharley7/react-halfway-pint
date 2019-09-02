import React from "react";
import Search from "./pages/Search";
import Halfway from "./pages/Halfway";

const routes = {
  "/": () => <Search />,
  "/halfway": () => <Halfway />,
};
export default routes;