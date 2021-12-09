import React from "react";
import { RepoStyled } from "./ReposListStyles.js";

const Repo = ({ name, created_at, language, forks, description }) => {
  return (
    <RepoStyled>
      {name} {description} {language} {forks}
    </RepoStyled>
  );
};

export default function ReposList({ reposRef, repos, setRepos }) {
  return (
    <>
      {repos.length !== 0 &&
        repos.map((repo, index) => (
          <Repo
            key={repo.name}
            name={repo.name}
            created_at={repo.created_at}
            language={repo.language}
            forks={repo.forks}
            description={repo.description}
          />
        ))}
    </>
  );
}
