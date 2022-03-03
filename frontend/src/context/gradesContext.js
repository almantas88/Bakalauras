import { createContext, useState } from "react";
import {
  getGrades
} from "../services/gradesServices";
export const GradesContext = createContext([]);


export const GradesProvider = (props) => {
  const [gradesList, setGradesList] = useState([]);

  const filterGrades = (id) => {
    const gradeListAfterDeletion = gradesList.filter(
      (element) => element._id !== id
    );
    setGradesList(gradeListAfterDeletion);
  };

  const addGradeToFrontEnd = (newGrade) => {
    setGradesList([newGrade, ...gradesList]);
  };

  async function getAllGrades() {
    try {
      const { data } = await getGrades();
      console.log(data.grades);
      setGradesList(data.grades);
      console.log(gradesList);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GradesContext.Provider
      value={{ gradesList, setGradesList, filterGrades, addGradeToFrontEnd, getAllGrades }}
    >
      {props.children}
    </GradesContext.Provider>
  );
};
