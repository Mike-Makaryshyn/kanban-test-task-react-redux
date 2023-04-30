import { dateTransform } from "../../utils/dateTransform";
import { Draggable } from "react-beautiful-dnd";

interface Issue {
  id: number;
  node_id: string;
  title: string;
  assignee: null;
  assignees: [];
  created_at: Date;
  closed_at: null;
}

interface ColumnProps {
  issues?: Issue[];
  column: string;
}

const Column = ({ issues, column }: ColumnProps) => {
  if (!issues || issues.length === 0) {
    return <div>No issues found.</div>;
  }

  const renderIssues = () => {
    return issues.map((issue, idx) => {
      const date = dateTransform(issue.created_at);

      return (
        <Draggable draggableId={issue.node_id} key={issue.id} index={idx}>
          {(provided) => (
            <div
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
              key={issue.id}
              className="bg-white rounded p-3 mb-3 shadow-md issue"
            >
              <h4>{issue.title}</h4>
              <p>{date}</p>
            </div>
          )}
        </Draggable>
      );
    });
  };

  const renderedIssues = renderIssues();

  return <div>{renderedIssues}</div>;
};

export default Column;
