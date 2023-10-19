"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntdRegistry";
import HeaderPage from "@/app/HeaderPage/page";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
