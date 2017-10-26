export default class Api {
    constructor() {
        this.base = '/admin/controllers/';
        this.students = 'student.php?action=getStudents';
        this.employees = 'employee.php?action=getEmployees';
        this.employeesMaterial = 'employee.php?action=getEmployeesMaterial';
        
        this.regions = 'location.php?action=getRegions';
        this.provinces = 'location.php?action=getProvinces';
        this.cities = 'location.php?action=getCities';
        
        this.offices = 'office.php?action=getOffices';
        this.agencies = 'agency.php?action=getAgencies';
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
    getRegions() {
        return this.base + this.regions;
    }
    getProvinces() {
        return this.base + this.provinces;
    }
    getCities() {
        return this.base + this.cities;
    }
    getOffices() {
        return this.base + this.offices;
    }
    getAgencies() {
        return this.base + this.agencies;
    }
    
}