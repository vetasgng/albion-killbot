import Paper from "components/Paper";
import "react-cookienotice/dist/style.css";
import styled from "styled-components";

export const HomePaper = styled(Paper)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: transparent !important;
  background-image: none !important;
  box-shadow: none !important;
`;

export const ServerDashboardOutlet = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0;

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.lg}) {
    padding-top: ${({ theme }) => theme.layout.padding.pageY.lg};
    padding-bottom: ${({ theme }) => theme.layout.padding.pageY.lg};
    padding-left: ${({ theme }) => theme.layout.padding.pageX.lg};
    padding-right: ${({ theme }) => theme.layout.padding.pageX.lg};
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.xl}) {
    padding-top: ${({ theme }) => theme.layout.padding.pageY.xl};
    padding-bottom: ${({ theme }) => theme.layout.padding.pageY.xl};
    padding-left: ${({ theme }) => theme.layout.padding.pageX.xl};
    padding-right: ${({ theme }) => theme.layout.padding.pageX.xl};
    margin-left: auto;
    margin-right: auto;
    max-width: calc(100% - 1200px * 0.35);
  }

  @media (min-width: ${({ theme }) => theme.layout.breakpoints.xxl}) {
    padding-top: ${({ theme }) => theme.layout.padding.pageY.xxl};
    padding-bottom: ${({ theme }) => theme.layout.padding.pageY.xxl};
    padding-left: ${({ theme }) => theme.layout.padding.pageX.xxl};
    padding-right: ${({ theme }) => theme.layout.padding.pageX.xxl};
    max-width: calc(100% - 1904px * 0.4);
  }
`;

export default styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .content {
    flex-grow: 1;

    display: flex;

    .container {
      width: 100%;
      margin-left: auto;
      margin-right: auto;

      @media (min-width: 576px) {
        max-width: calc(100% - (576px * 0.1));
      }

      @media (min-width: 768px) {
        max-width: calc(100% - (768px * 0.2));
      }

      @media (min-width: 992px) {
        max-width: calc(100% - 992px * 0.25);
      }

      @media (min-width: 1200px) {
        max-width: calc(100% - 1200px * 0.35);
      }

      @media (min-width: 1904px) {
        max-width: calc(100% - 1904px * 0.4);
      }
    }
  }

  .box {
    *::-webkit-scrollbar-track {
      background: transparent;
    }
  }

  .card.hover {
    transition: 0.25s ease-in-out;

    &:hover {
      background-color: #303030;
    }
  }
`;
