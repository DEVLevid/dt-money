import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Transactions } from "./Pages/Transactions";

export function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <GlobalStyle />
      <Transactions />
    </ThemeProvider>
  );
}
