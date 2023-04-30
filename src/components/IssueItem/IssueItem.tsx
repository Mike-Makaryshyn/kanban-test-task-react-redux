import { dateTransform } from "../../utils/dateTransform";

export interface IssueType {
  id: number;
  node_id: string;
  title: string;
  assignee: null;
  assignees: [];
  created_at: Date;
  closed_at: null;
  comments: number;
}

interface ColumnProps {
  issue: IssueType;
}

const Issue = ({ issue }: ColumnProps) => {
  const date = dateTransform(issue.created_at);

  return (
    <div>
      <h5 className="fw-bold">{issue.title}</h5>
      <p>{date}</p>
      <p>Comments: {issue.comments}</p>
    </div>
  );
};

export default Issue;
