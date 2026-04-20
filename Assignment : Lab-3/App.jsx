import React, { useState } from "react";
import Header from "./components/Header";
import StudentTable from "./components/StudentTable";
import AddStudentForm from "./components/AddStudentForm";

const App = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Surya", score: 85 },
    { id: 2, name: "Rahul", score: 32 }
  ]);

  const updateScore = (id, newScore) => {
    setStudents(students.map(student =>
      student.id === id
        ? { ...student, score: Number(newScore) }
        : student
    ));
  };

  const addStudent = (name, score) => {
    const newStudent = {
      id: Date.now(),
      name,
      score: Number(score)
    };
    setStudents([...students, newStudent]);
  };

  return (
    <div className="container">
      <Header />
      <AddStudentForm addStudent={addStudent} />
      <StudentTable students={students} updateScore={updateScore} />
    </div>
  );
};

export default App;

