import React from "react";
import "./App.css";

export function App() {
  const reposRef = React.useRef(null);
  const [repos, setRepos] = React.useState(null);
  const [seeArchive, setSeeArchive] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchRepos = () => {
      fetch("/repos")
        .then((res) => res.json())
        .then((data) => {
          if (data.status !== 400) {
            reposRef.current = data;
            setRepos(data);
          } else {
            setError(data);
          }
        });
    };

    fetchRepos();
    setIsLoaded(true);
  }, []);

  console.log(repos, error);

  if (error) {
    return <div>{error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <header className="App-header">hello</header>
      </div>
    );
  }
}
