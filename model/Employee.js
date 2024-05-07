export class Employee   {
    constructor(employeeCode,
                employeeName,
                employeeProfilePic,
                gender,
                status,
                designation,
                role,
                dob,
                dateOfJoin,
                branch,
                addressLine1,
                addressLine2,
                addressLine3,
                addressLine4,
                addressLine5,
                contactNumber,
                email,
                informInCaseOfEmergency,
                emergencyContactNumber) {
        this.employeeCode = employeeCode;
        this.employeeName = employeeName;
        this.employeeProfilePic = employeeProfilePic;
        this.gender = gender;
        this.status = status;
        this.designation = designation;
        this.role = role;
        this.dob = dob;
        this.dateOfJoin = dateOfJoin;
        this.branch = branch;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.addressLine4 = addressLine4;
        this.addressLine5 = addressLine5;
        this.contactNumber = contactNumber;
        this.email = email;
        this.informInCaseOfEmergency = informInCaseOfEmergency;
        this.emergencyContactNumber = emergencyContactNumber;
    }
}