// 🎓 Student Grading System
// 🏫 Create a system that manages student records and calculates their average grade.
//
// 1. Implement a class `Gradebook<T>` to store student records.
// 2. Implement a method `addStudent` that adds a new student with an empty grade list.
// 3. Implement a method `addGrade` that records a new grade for a student.
// 4. Implement a method `getAverageGrade` that returns a student’s average grade.
// 5. Implement a method `getStudentGrades` that returns all recorded grades for a student. Formula to get average: sumOfAllGrades / numberOfSubjects.
// 6. Implement a method `updateSubjectGrade` that updates a subject grade for a student.

interface Grade {
  subject: string;
  grade: number;
}

interface Student {
  id: number;
  name: string;
  grades: Grade[];
}

class Gradebook<T extends Student> {
  private students: T[] = [];

  addStudent(student: T): string {
    this.students.push(student);
    return `${student.name} added to the grade book`;
  }

  addGrade(id: number, grade: Grade): string {
    const student = this.students.find((s) => s.id === id);

    if (student) {
      student.grades.push(grade);
      return `subject registered for ${grade.subject}`;
    } else {
      return `Student with ID ${id} not found it.`
    }

  }

  getAverageGrade(id: number): number | string {
    const student = this.students.find((s) => s.id === id);
    if (student) {
      const totalGrades = student.grades.reduce ((sum,grade) => sum + grade.grade,0);
      const numberOfSubjects = student.grades.length;
      return numberOfSubjects > 0 ? totalGrades / numberOfSubjects : 0;
    } else{
      return `Student with ID ${id} not found it`
    }

  }

  getStudentGrades(id: number): Grade[] | string {
    const student =this.students.find((s) => s.id === id);

    if (student) {
      return student.grades;
    } else {
      return `Student with ID ${id} not found it.`;
    }
  }

  updateSubjectGrade(id: number, subject: string, newGrade: number): string {
    const student = this.students.find((s) => s.id === id);
    if (student) {
      const grade = student.grades.find((g) => g.subject === subject);
      if (grade) {
        grade.grade = newGrade;
        return `Grade of ${subject} updated to ${newGrade}.`;
      } else {
        return `Subject ${subject} not found it for the student with the id ${id}.`;
      }
    } else {
      return `Student with ID ${id} not found it.`;
    }
  }
}

// Test cases
const gradebook = new Gradebook();

console.log(gradebook.addStudent({ id: 1, name: "Alice", grades: [] })); // "Alice added to the gradebook."
console.log(gradebook.addGrade(1, { subject: "Math", grade: 90 })); // "Grade recorded for Math."
console.log(gradebook.addGrade(1, { subject: "English", grade: 80 })); // "Grade recorded for English."
console.log(gradebook.addGrade(1, { subject: "Science", grade: 85 })); // "Grade recorded for Science."
console.log(gradebook.getStudentGrades(1)); // Should return all grades for Alice
console.log(gradebook.getAverageGrade(1)); // Should return Alice's average grade
console.log(gradebook.updateSubjectGrade(1, "English", 95)); // Should update Alice's English grade to 95