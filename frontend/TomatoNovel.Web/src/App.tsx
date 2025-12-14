import { ConfigProvider } from "antd";
import Router from "./router/router";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff5f00",   // 对应 element-plus primary.base
          colorSuccess: "#24cc43",   // success.base
          colorWarning: "#fcab0b",   // warning.base
          colorError:   "#ee1a25",   // error.base
        }
      }}
    >
      <Router />
    </ConfigProvider>
  );
}

export default App;
