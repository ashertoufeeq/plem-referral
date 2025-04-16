import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import AppRouter from "components/router";
import "antd/dist/reset.css";
import "./App.css"
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Inter, sans-serif',
          colorText: '#1f2937',
          colorBgLayout: '#f9fafb', // light gray background
          colorBgContainer: '#ffffff', // white cards
          fontSize: 14,
        },
        components: {
          Table: {
            headerBg: '#f9fafb',
            headerColor: '#4b5563',
            rowHoverBg: '#f5faff',
            borderColor: '#f1f1f1',
            headerSplitColor: '#e5e7eb',
            borderRadius: 0,
          },
          Input: {
            colorBgContainer: '#ffffff',
            colorBorder: '#e5e7eb',
            colorTextPlaceholder: '#9ca3af',
            borderRadius: 8,
          },
        },
      }}
    >
    <AppRouter />
    </ConfigProvider>
  </Provider>
);
