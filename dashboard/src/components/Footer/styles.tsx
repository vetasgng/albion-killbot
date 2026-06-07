import styled from "styled-components";

export const FooterRoot = styled.footer`
  background-color: ${({ theme }) => theme.surface};
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0.04)
  );
  border-top: 1px solid ${({ theme }) => theme.borderSubtle};
`;

export const StyledFooter = styled.div`
  padding: 0.75rem 0.5rem;
  width: 100%;
  display: flex;
  justify-content: center;

  .footer-spacing {
    flex-basis: 30%;
  }

  .footer-icons {
    flex-basis: 30%;
    display: flex;
    align-items: center;
    justify-content: start;

    * {
      padding: 0 0.5rem;
    }
  }
`;

export const FooterCopyright = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.subtleText};
  font-size: 0.85rem;
  line-height: 1.45;
`;

export const FooterIconLink = styled.a`
  color: ${({ theme }) => theme.subtleText};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export default StyledFooter;
