import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function () {
//     navigator.serviceWorker.register("/service-worker.js").then(
//       function (registration) {
//         console.log(
//           "ServiceWorker registration successful with scope: ",
//           registration.scope,
//         );
//       },
//       function (err) {
//         console.log("ServiceWorker registration failed: ", err);
//       },
//     );
//   });
// }
