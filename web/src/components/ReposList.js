import React from "react";
import {
  RepoStyled,
  RepoNameStyled,
  ReposContainerStyled
} from "./ReposListStyles.js";
import { Modal } from "react-bootstrap";
import DOMPurify from "dompurify";
import "highlight.js/styles/monokai.css";

const marked = require("marked");
const hljs = require("highlight.js");

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    // For proper highlighting of code
    return hljs.highlightAuto(code).value;
  }
});

const renderer = new marked.Renderer();

const Repo = ({
  name,
  fullName,
  language,
  forks,
  description,
  setModalShow,
  repoIndex,
  setActiveRepo,
  setCommitName,
  setCommitMessage,
  setCommitDate,
  setReadMe
}) => {
  const fetchRepoCommit = async () => {
    try {
      const commitRes = await fetch(
        `https://api.github.com/repos/${fullName}/commits`
      );

      if (!commitRes.ok) {
        setCommitName("");
        setCommitMessage("");
        setCommitDate("");
        const message = `An error has occured: ${commitRes.status}`;
        throw new Error(message);
      }

      const commitData = await commitRes.json();

      const sortedCommitData = commitData.sort((a, b) => {
        // Sort the commits by their most recent date to be at the top
        return a.commit.author.date > b.commit.author.date
          ? -1
          : a.commit.author.date < b.commit.author.date
          ? 1
          : 0;
      });

      /* We choose the first index because that is the most recent commit due to how we sorted.
        Also, the commit information had to be seperated into their own states because putting them
        into one state and then deriving the info from there, for example, making a commitInfo state
        and then getting the appropriate date with commitInfo.message etc., with this method the value would
        become undefined when calling for the author name even though it clearly exists.
        Therefore it was easier to consolidate the information during the fetch phase instead, however,
        this is a crude approach.
      */
      setCommitName(sortedCommitData[0].commit.author.name);
      setCommitMessage(sortedCommitData[0].commit.message);
      setCommitDate(sortedCommitData[0].commit.author.date);

      const readMeRes = await fetch(
        `https://raw.githubusercontent.com/${fullName}/master/README.md`
      );

      if (!readMeRes.ok) {
        setReadMe("");
        const message = `An error has occured: ${readMeRes.status}`;
        throw new Error(message);
      }

      const readMeData = await readMeRes.text();
      setReadMe(readMeData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RepoStyled
      onClick={() => {
        setModalShow(true);
        setActiveRepo(repoIndex);
        fetchRepoCommit();
      }}
    >
      <RepoNameStyled>{name}</RepoNameStyled>
      <div>{description}</div>
      <div>{language}</div>
      <div>{forks}</div>
    </RepoStyled>
  );
};

const RepoDetail = ({
  repos,
  activeRepo,
  commitName,
  commitMessage,
  commitDate,
  readMe,
  ...props
}) => {
  const [showModalBody, setShowModalBody] = React.useState(false);

  /* The marked library is used because of the ability to use setOptions 
  to set a custom highlighter for rendering code, however the downside is having to use
  dangerouslySetInnerHTML. So, sanitization is needed for that possible security risk.
  */

  const markup = {
    __html: DOMPurify.sanitize(marked(readMe, { renderer: renderer }))
  };

  // A timer used to hide the state change of commitMessage, commitName, commitDate, and readMe
  React.useEffect(() => {
    if (props.show) {
      setShowModalBody(false);
    }
    const timer = setTimeout(() => setShowModalBody(true), 500);
    return () => clearTimeout(timer);
  }, [props.show]);

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        {/* repos[activeRepo] needs to be checked because if Language were to be switched while the activeRepo has a number
        from previously clicking another repo, and if the previously clicked repo were to disappear etc., due to the 
        repos list change repos[activeRepo] would come up undefined on render since Modal renders even if the repo hasn't been clicked yet.
        */}
        <Modal.Title>
          {repos[activeRepo] ? repos[activeRepo].name : activeRepo}
        </Modal.Title>
      </Modal.Header>
      {showModalBody && (
        <Modal.Body>
          {/* If the commitInfo state is falsy, add a placeholder text signifying that it doesn't exist */}
          {!commitMessage ? (
            "no commit exists"
          ) : (
            <>
              <div>{commitMessage}</div>
              <div>
                {commitName} {commitDate}
              </div>
              <br />
              <div dangerouslySetInnerHTML={markup}></div>
            </>
          )}
        </Modal.Body>
      )}
    </Modal>
  );
};

export default function ReposList({ repos }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [activeRepo, setActiveRepo] = React.useState(0); // This is for delivering the correct repo commit data to the modal when the repo is clicked
  const [commitName, setCommitName] = React.useState("");
  const [commitMessage, setCommitMessage] = React.useState("");
  const [commitDate, setCommitDate] = React.useState("");
  const [readMe, setReadMe] = React.useState("");

  return (
    <ReposContainerStyled>
      {repos.length !== 0 &&
        repos.map((repo, index) => (
          <Repo
            key={repo.name}
            name={repo.name}
            fullName={repo.full_name}
            createdAt={repo.created_at}
            language={repo.language}
            forks={repo.forks}
            description={repo.description}
            modalShow={modalShow}
            setModalShow={setModalShow}
            setActiveRepo={setActiveRepo}
            repoIndex={index}
            setCommitName={setCommitName}
            setCommitMessage={setCommitMessage}
            setCommitDate={setCommitDate}
            setReadMe={setReadMe}
          />
        ))}
      <RepoDetail
        show={modalShow}
        onHide={() => setModalShow(false)}
        repos={repos}
        activeRepo={activeRepo}
        commitName={commitName}
        commitMessage={commitMessage}
        commitDate={commitDate}
        readMe={readMe}
      />
    </ReposContainerStyled>
  );
}
