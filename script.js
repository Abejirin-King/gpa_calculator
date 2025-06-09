const form = document.getElementById('assignmentForm');
const nameInput = document.getElementById('assignmentName');
const gradeInput = document.getElementById('assignmentGrade');
const assignmentList = document.getElementById('assignmentList');
const gpaDisplay = document.getElementById('gpa');

let assignments = JSON.parse(localStorage.getItem('assignments')) || [];

function updateGPA() {
  const total = assignments.reduce((sum, a) => sum + a.grade, 0);
  const gpa = assignments.length ? (total / assignments.length).toFixed(2) : '0.00';
  gpaDisplay.textContent = gpa;
}

function saveToLocalStorage() {
  localStorage.setItem('assignments', JSON.stringify(assignments));
}

function renderAssignments() {
  assignmentList.innerHTML = '';
  assignments.forEach(a => {
    const li = document.createElement('li');
    li.textContent = ⁠ ${a.name} - ${a.grade} ⁠;
    assignmentList.appendChild(li);
  });
  updateGPA();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const grade = parseFloat(gradeInput.value);
  if (!name || isNaN(grade) || grade < 0 || grade > 5) return;

  const assignment = { name, grade };
  assignments.push(assignment);
  saveToLocalStorage();
  renderAssignments();
  form.reset();
});

document.addEventListener('keydown', function (e) {
  if (e.key.toLowerCase() === 's') {
    console.log('All Assignments:', assignments);
  }
});

// Initial load
renderAssignments();
