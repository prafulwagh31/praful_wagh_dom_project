document.addEventListener('DOMContentLoaded', function() {
    const studentForm = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

    let students = JSON.parse(localStorage.getItem('students')) || [];
    let editIndex = -1;

    // student table code
    function renderStudents() {
        studentTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = studentTable.insertRow();
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
        });
    }

    // add student function
    function addStudent(student) {
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }

    // edit student function
    function editStudent(index) {
        const student = students[index];
        document.getElementById('name').value = student.name;
        document.getElementById('studentId').value = student.studentId;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;
        editIndex = index;
    }

    //update student function
    function updateStudent(student, index) {
        students[index] = student;
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }

    // delete student function
    function deleteStudent(index) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }

    studentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const student = {
            name: document.getElementById('name').value,
            studentId: document.getElementById('studentId').value,
            email: document.getElementById('email').value,
            contact: document.getElementById('contact').value
        };

        if (validateStudent(student)) {
            if (editIndex === -1) {
                addStudent(student);
            } else {
                updateStudent(student, editIndex);
                editIndex = -1;
            }
            studentForm.reset();
        }
    });

    function validateStudent(student) {
        const nameRegex = /^[A-Za-z ]+$/;
        const idRegex = /^[0-9]+$/;
        const contactRegex = /^[0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(student.name)) {
            alert('Name should only contain letters.');
            return false;
        }
        if (!idRegex.test(student.studentId)) {
            alert('Student ID should only contain numbers.');
            return false;
        }
        if (!contactRegex.test(student.contact)) {
            alert('Contact number should only contain numbers.');
            return false;
        }
        if (!emailRegex.test(student.email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        return true;
    }

    renderStudents();

    // Expose functions to the global scope
    window.editStudent = editStudent;
    window.deleteStudent = deleteStudent;
});
