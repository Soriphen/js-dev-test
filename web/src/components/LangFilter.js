import { LangFilterContainerStyled } from "./LangFilterStyles";
import { DropdownButton, Dropdown } from "react-bootstrap";
import React from "react";

const languageList = ["All", "PHP", "TypeScript", "English", "French"];

const LanguageDropDown = ({ handleLangClick }) => {
  return (
    <>
      <DropdownButton variant="secondary" id="lang-dropdown" title="Language">
        {languageList.map((lang, index) => (
          <Dropdown.Item key={index} onClick={() => handleLangClick(lang)}>
            {lang}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </>
  );
};

export default function LangFilter({ reposRef, setRepos }) {
  let reposCopy = [...reposRef.current]; // A copy of reposRef.current in order to store a snapshot of a no filtered sorted repos list

  // Filters the repos based on the language that was selected
  const handleLangClick = (lang) => {
    if (lang === "All") {
      setRepos(reposCopy);
    } else {
      const filteredRepos = reposCopy.filter((repo) => {
        return repo.language === lang;
      });
      setRepos(filteredRepos);
    }
  };

  return (
    <LangFilterContainerStyled>
      <LanguageDropDown handleLangClick={handleLangClick} />
    </LangFilterContainerStyled>
  );
}
