import { useEffect } from "react";
import { useState } from "react";
import JobInfo from "./JobInfo";
import ButtonContainer from "./ButtonContainer";

const url = "https://course-api.com/react-tabs-project";

const App = () => {
  // State to store the data fetched from the API
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);

  // Fetch the data from the API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const newJobs = await response.json();
      setJobs(newJobs);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // Call the function when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="jobs-center">
        <div className="loading"></div>
      </section>
    );
  }
  console.log(jobs);
  return (
    <section className="jobs-center">
      <ButtonContainer
        jobs={jobs}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      />
      <JobInfo jobs={jobs} currentItem={currentItem} />
    </section>
  );
};
export default App;
