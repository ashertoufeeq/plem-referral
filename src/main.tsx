import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import AppRouter from "components/router";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
