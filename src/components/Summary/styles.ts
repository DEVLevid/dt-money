import { css, styled } from "styled-components";

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.25rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -5rem;
`;

interface SummaryCadProps {
  Variant?: "green";
}

export const SummaryCard = styled.div<SummaryCadProps>`
  background: ${(props) => props.theme["gray-600"]};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme["gray-300"]};
  }

  strong {
    display: block;
    font-size: 2rem;
    margin-top: 1rem;
  }

  ${(props) =>
    props.Variant === "green" &&
    css`
      background: ${props.theme["green-700"]};
    `}
`;
