import { Draggable } from "react-beautiful-dnd";
import IssueItem from "../IssueItem";
import { IssueType } from "../IssueItem/IssueItem";

interface ColumnProps {
  issues?: Issue[];
}

const Column = ({ issues }: ColumnProps) => {
  if (!issues || issues.length === 0 || issues.length === undefined) {
    return <div>No issues found.</div>;
  }

  const renderIssues = () => {
    return issues.map((issue, idx) => {
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
              <IssueItem issue={issue} />
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
