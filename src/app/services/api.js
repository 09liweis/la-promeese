export default class Api {
    constructor() {
        this.base = '/admin/controllers/';
        this.students = 'student.php?action=getStudents';
        this.employees = 'employee.php?action=getEmployees';
        this.employeesMaterial = 'employee.php?action=getEmployeesMaterial';
    }
    getStudents() {
        return this.base + this.students;
    }
    getEmployees() {
        return this.base + this.employees;
    }
    getEmployeesMaterial() {
        return this.base + this.employeesMaterial;
    }
}