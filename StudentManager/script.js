 
class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = Number(marks);
  }
}


class StudentManager {
  constructor() {
    this.students = [];
  }

  add(student) {
    this.students.push(student);
  }

  remove(name) {
    this.students = this.students.filter(
      student => student.name !== name
    );
  }

  average() {
    if (this.students.length === 0) return "-";

    const total = this.students.reduce(
      (sum, student) => sum + student.marks,
      0
    );

    return (total / this.students.length).toFixed(2);
  }

  topper() {
    if (this.students.length === 0) return "-";

    return this.students.reduce((top, curr) =>
      curr.marks > top.marks ? curr : top
    ).name;
  }
}


const nameInput = document.getElementById("name");
const marksInput = document.getElementById("marks");
const addBtn = document.getElementById("addbtn");
const studentList = document.getElementById("studentList");
const avgEl = document.getElementById("average");
const topperEl = document.getElementById("topper");

const manager = new StudentManager();


function render() {
  studentList.innerHTML = "";

  manager.students.forEach(student => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${student.name} - ${student.marks}</span>
      <button class="delete">❌</button>
    `;

    li.querySelector(".delete").addEventListener("click", () => {
      manager.remove(student.name);
      render();
    });

    studentList.appendChild(li);
  });

  avgEl.textContent = manager.average();
  topperEl.textContent = manager.topper();
}


addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const marks = marksInput.value.trim();

  if (!name || !marks) {
    alert("Please enter name and marks");
    return;
  }

  manager.add(new Student(name, marks));
  render();

  nameInput.value = "";
  marksInput.value = "";
});
