import styled from "styled-components";

const RepoStyled = styled.div`
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  cursor: pointer;
  border: 1px solid lightgray;

  transition: box-shadow 0.2s ease, transform 0.07s ease,
    background-color 0.07s ease;

  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

  &:hover {
    box-shadow: 1px 2px 5px #d5d5d5, -1px -2px 5px #ffffff;
  }

  &:active {
    background-color: rgb(245, 245, 245);
    transform: translateY(2px);
    box-shadow: none;
  }
`;

const RepoNameStyled = styled.div`
  font-size: 1.5rem;
  text-align: left;
`;

const ReposContainerStyled = styled.div`
  max-width: 800px;
  /* border: 1px solid lightgray; */
  border-radius: 5px;
  margin: 20px auto;
`;

export { RepoStyled, RepoNameStyled, ReposContainerStyled };
