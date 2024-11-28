import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ThemeWrapper from "./theme/ThemeWrapper";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { SnackbarProvider } from "notistack";
import FileUploadProvider from "./context/FileUploadContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <SnackbarProvider>
                    <ThemeWrapper>
                        <FileUploadProvider>
                            <App />
                        </FileUploadProvider>
                    </ThemeWrapper>
                </SnackbarProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
