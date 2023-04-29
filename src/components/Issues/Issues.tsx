interface Issue {
  id: number;
  node_id: string;
  title: string;
  assignee: null;
  assignees: [];
  created_at: Date;
  closed_at: null;
  // Add other properties here as needed
}

interface IssuesProps {
  issues?: Issue[];
}

const Issues = ({ issues }: IssuesProps) => {
  if (!issues || issues.length === 0) {
    return <div>No issues found.</div>;
  }

  const formatDate = (created_at: Date) => {
    const createdAt = new Date(created_at);

    const day =
      createdAt.getDate() < 10
        ? "0" + createdAt.getDate()
        : createdAt.getDate();
    const month =
      createdAt.getMonth() + 1 < 10
        ? "0" + (createdAt.getMonth() + 1)
        : createdAt.getMonth() + 1;
    const year = createdAt.getFullYear();

    const date = `${day}.${month}.${year}`;
    return date;
  };

  const renderIssues = () => {
    return issues.map((issue) => {
      const date = formatDate(issue.created_at);

      return (
        <div key={issue.id}>
          <h4>{issue.title}</h4>
          <p>{date}</p>
        </div>
      );
    });
  };

  const renderedIssues = renderIssues();

  return <div>{renderedIssues}</div>;
};

export default Issues;
