import React from "react";
import ReposList from "./components/ReposList";
import LangFilter from "./components/LangFilter";
import "./App.css";

export function App() {
  const reposRef = React.useRef(null);
  const [repos, setRepos] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchRepos = () => {
      fetch("/repos") // Fetch the repos from the API endpoint created with the express app
        .then((res) => res.json())
        .then((data) => {
          if (data.status !== 400) {
            reposRef.current = data.sort((a, b) => {
              // Sorting the repos creation date by reverse chronological order
              return a.created_at > b.created_at
                ? -1
                : a.created_at < b.created_at
                ? 1
                : 0;
            });
            setRepos(reposRef.current);
          } else {
            setError(data);
          }
        });
    };

    fetchRepos();
    setIsLoaded(true);
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        {repos && (
          <>
            <LangFilter reposRef={reposRef} repos={repos} setRepos={setRepos} />
            <ReposList reposRef={reposRef} repos={repos} setRepos={setRepos} />
          </>
        )}
      </div>
    );
  }
}
