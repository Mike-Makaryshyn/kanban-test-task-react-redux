import { useState } from "react";
import { addIssues } from "../redux/slices/appSlice";
import { useDispatch } from "react-redux";

const useGetIssues = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const getIssues = async (inputLink: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(inputLink);

      const issues = await response.json();

      setIsError(false);
      dispatch(addIssues(issues));

      return issues;
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { getIssues, isLoading, isError };
};

export default useGetIssues;
