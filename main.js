import inquirer from "inquirer";
class student {
    static counter = 2000;
    name;
    id;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.id = student.counter++;
        this.courses = [];
        this.balance = 200;
    }
    enroll_coures(courses) {
        this.courses.push(courses);
    }
    view_balance() {
        console.log(`the balance of ${this.name} is $${this.balance} `);
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(` $${amount} paid successfully for ${this.name}, remaining  amount $${this.balance} `);
    }
    status() {
        console.log(`name  :${this.name} `);
        console.log(`ID : ${this.id} `);
        console.log(`courses enrolled :${this.courses} `);
        console.log(`available balance : ${this.balance} `);
    }
}
//// for second class    ///semi-colon is used to separate the statement on SAME LINE// otherwise otional
class managing {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let Student = new student(name); //S is capital & small
        this.students.push(Student);
        console.log(`${name} added successfully and ID is ${Student.id}`);
    }
    enrol_student(student_id, courses) {
        let student = this.students.find(std => std.id === student_id);
        if (student) {
            student.enroll_coures(courses);
            console.log(`${student.name} enroled in ${courses} successfully`);
        }
    }
    view_std_balance(student_id) {
        let student = this.find_std_id(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Ghalat!!! Enter Sahi ID please");
        }
    }
    pay_std_fees(student_id, amount) {
        let student = this.find_std_id(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Ghalat !!!!Enter Sahi ID please");
        }
    }
    show_std_status(student_id) {
        let student = this.find_std_id(student_id);
        if (student) {
            student.status();
        }
        else {
            console.log("Ghalat !!!!Enter Sahi ID please");
        }
    }
    find_std_id(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
/// second class cmplete// to run program 
async function main() {
    console.log("-".repeat(80));
    console.log("*****  WELCOME TO STUDENT MANAGEMENT SYSTEM *****");
    console.log("-".repeat(80));
    let student_managing = new managing();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "select from below",
                choices: [
                    "add student",
                    "enroll student in course",
                    "student balance",
                    "fee Payment",
                    "student status",
                    "close",
                ]
            }
        ]);
        switch (choice.choice) {
            case "add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter your name"
                    }
                ]);
                student_managing.add_student(name_input.name);
                break;
            case "enroll student in course":
                let enroll_course = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter your ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: " Enter your course "
                    }
                ]);
                student_managing.enrol_student(enroll_course.student_id, enroll_course.course);
                break;
            case "student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter your ID",
                    }
                ]);
                student_managing.view_std_balance(balance_input.student_id);
                break;
            case "fee Payment":
                let fee_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter your ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter amount to be paid",
                    }
                ]);
                student_managing.pay_std_fees(fee_input.student_id, fee_input.amount);
                break;
            case "student status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter your ID",
                    }
                ]);
                student_managing.show_std_status(status_input.student_id);
                break;
            case "close":
                console.log("------------------thank you for using SMS-------------------------");
                process.exit();
        }
    }
}
main();
