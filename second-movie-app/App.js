import store from "./store/store";
import { Provider } from "react-redux";
import Navigations from "./navigation/Navigations";

export default function App() {
  return (
    <Provider store={store}>
      <Navigations />
    </Provider>
  );
}
