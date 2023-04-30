import { useState } from "react";
import {
  addIssues,
  addLocalStorageIssues,
  saveRepoLink,
} from "../redux/slices/appSlice";
import { useDispatch } from "react-redux";
import { getStorageData } from "../utils/localStorageActions";

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
      dispatch(saveRepoLink(inputLink));
      
      dispatch(addLocalStorageIssues(getStorageData(inputLink)));

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
