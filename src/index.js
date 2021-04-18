import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>,
  rootElement
);
