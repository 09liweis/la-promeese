export default class Api {
    constructor() {
        this.base = '/admin/controllers/';
        this.students = 'student.php?action=getStudents';
        this.employees = 'employee.php?action=getEmployees';
        this.employeesMaterial = 'employee.php?action=getEmployeesMaterial';
        this.upsertEmployee = 'employee.php?action=upsertEmployee';
        this.removeEmployee = 'employee.php?action=removeEmployee';
        this.upsertEmployeeMaterial = 'employee.php?action=upsertEmployeeMaterial';
        
        this.services = 'service.php?action=getServices';
        this.freeServices = 'service.php?action=getFreeServices';
        this.schoolServices = 'service.php?action=getSchoolServices';
        this.visaServices = 'service.php?action=getVisaServices';
        
        this.subServices = 'service.php?action=getSubServices';
        this.upsertSubService = 'service.php?action="upsertSubService';
        
        this.regions = 'location.php?action=getRegions';
        this.provinces = 'location.php?action=getProvinces';
        this.cities = 'location.php?action=getCities';
        
        this.offices = 'office.php?action=getOffices';
        this.agencies = 'agency.php?action=getAgencies';
        
        this.progresses = 'progress.php?action=getProgresses';
        this.visaImmigrates = 'progress.php?action=getVisaImmiProgresses';
        this.schoolProgresses = 'progress.php?action=getSchoolProgresses';
        
        this.upsertSemester = 'performance.php?action=upsertSemester';
        this.semesters = 'performance.php?action=semesters';
        this.removeSemester = 'performance.php?action=removeSemester';
    }
    getStudents() {
        return this.base + this.students;
    }
    getEmployees() {
        return this.base + this.employees;
    }
    getUpsertEmployee() {
        return this.base + this.upsertEmployee;
    }
    getRemoveEmployee() {
        return this.base + this.removeEmployee;
    }
    getEmployeesMaterial() {
        return this.base + this.employeesMaterial;
    }
    upsertEmployeeMaterial() {
        return this.base + this.upsertEmployeeMaterial;
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
    getServices() {
        return this.base + this.services;
    }
    getFreeServices() {
        return this.base + this.freeServices;
    }
    getSchoolServices() {
        return this.base + this.schoolServices;
    }
    getVisaServices() {
        return this.base + this.visaServices;
    }
    getSubServices() {
        return this.base + this.subServices;
    }
    getUpsertSubService() {
        return this.base + this.upsertSubService;
    }
    getProgresses() {
        return this.base + this.progresses;
    }
    getVisaImmiProgresses() {
        return this.base + this.visaImmigrates;
    }
    getSchoolProgresses() {
        return this.base + this.schoolProgresses;
    }
    getUpsertSemester() {
        return this.base + this.upsertSemester;
    }
    getSemesters() {
        return this.base + this.semesters;
    }
    getRemoveSemester() {
        return this.base + this.removeSemester;
    }
}