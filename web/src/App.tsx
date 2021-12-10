import React from "react";
import ReposList from "./components/ReposList";
import LangFilter from "./components/LangFilter";
import "./App.css";

export function App() {
  const reposRef = React.useRef(null); // Used to keep the original state of the sorted repos data before language filtering
  const [repos, setRepos] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchRepos = () => {
      fetch("/repos") // Fetch the repos from the API endpoint created with the express app
        .then((res) => res.json())
        .then(
          (data) => {
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
          },
          (err) => {
            console.log(err);
          }
        );
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
            <LangFilter reposRef={reposRef} setRepos={setRepos} />
            <ReposList repos={repos} />
          </>
        )}
      </div>
    );
  }
}
