import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  };
  .card {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  };
  .form-control {
    background-color: ${({ theme }) => theme.body};
  };
  `