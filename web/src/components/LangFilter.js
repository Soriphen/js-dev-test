import {
  LangButtonStyled,
  LangFilterContainerStyled
} from "./LangFilterStyles";
import React from "react";

const languageList = [
  "PHP",
  "TypeScript",
  "English",
  "French",
  "No Language Filter"
];

export default function LangFilter({ reposRef, repos, setRepos }) {
  let reposCopy = [...reposRef.current];

  const handleLangClick = (lang) => {
    if (lang === "No Language Filter") {
      setRepos(reposCopy);
    } else {
      const filteredRepos = reposCopy.filter((repo, index) => {
        return repo.language === lang;
      });
      setRepos(filteredRepos);
    }
  };

  return (
    <LangFilterContainerStyled>
      {languageList.map((lang, index) => (
        <LangButtonStyled key={lang} onClick={() => handleLangClick(lang)}>
          {lang}
        </LangButtonStyled>
      ))}
    </LangFilterContainerStyled>
  );
}
