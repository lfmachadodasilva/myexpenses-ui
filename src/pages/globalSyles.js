import { createGlobalStyle } from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  };

  .table {
    color: ${({ theme }) => theme.text};
  };
  
  .card {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border-color:${({ theme }) => theme.toggleBorder};
  };
  .card-header {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border-color:${({ theme }) => theme.toggleBorder};
  };

  .form-control {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  };

  .modal-content {
    background-color: ${({ theme }) => theme.body};
    border-color:${({ theme }) => theme.toggleBorder};
  };
  .modal-header {
    background-color: ${({ theme }) => theme.body};
    border-color:${({ theme }) => theme.toggleBorder};
  };
  .modal-body {
    background-color: ${({ theme }) => theme.body};
    border-color:${({ theme }) => theme.toggleBorder};
  };
  .modal-footer {
    background-color: ${({ theme }) => theme.body};
    border-color:${({ theme }) => theme.toggleBorder};
  };
  .close {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    border-color:${({ theme }) => theme.toggleBorder};
    text-shadow: none;
  };

  .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link  {
      background-color: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.text};
      border-color: ${({ theme }) => theme.toggleBorder};
  };
  `