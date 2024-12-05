import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./global.css";
import RoutesComponent from "./src/routes/routes";

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <RoutesComponent />
    </Provider>
  );
}
