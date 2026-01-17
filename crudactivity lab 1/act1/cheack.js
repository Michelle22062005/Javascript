// Age Validation
function isAdult(age) {
    return age >= 18;
}

// Role Validation
function isValidRole(role) {
    return role === "coder" || role === "tutor" || role === "visitor";
}

// Risk Score Calculation
function calculateRiskScore(user) {
    let riskScore = 0;

    if (user.hourDisponibility < 2) riskScore++;
    if (user.role === "visitor") riskScore++;
    if (user.age >= 18 && user.age <= 20) riskScore++;

    if (user.role === "coder" && user.hourDisponibility >= 4) riskScore--;

    return Math.max(riskScore, 0);
}

// Input
const user = {
    name: prompt("Enter your name: "),
    age: Number(prompt("Enter your age: ")),
    role: prompt("Enter your role (coder/tutor/visitor): ").toLowerCase(),
    acceptedLabRules: prompt("Do you accept lab rules (yes/no)?").toLowerCase() === "yes",
    hourDisponibility: Number(prompt("Enter your hour disponibility (1–12): "))
};
alert("Processing check-in... Please wait.");

// Validation
if (isNaN(user.age) || isNaN(user.hourDisponibility)) {
    alert("Error: Age and hour disponibility must be numbers.");
    return;
}

if (user.hourDisponibility < 1 || user.hourDisponibility > 12) {
    alert("Error: Hour disponibility must be between 1 and 12.");
    
}

if (!isValidRole(user.role)) {
    alert("Error: Invalid role.");

}

if (!user.acceptedLabRules) {
    alert("Error: You must accept lab rules.");

}

// Processing
console.log(isAdult(user.age) ? "User is an adult." : "User is a minor.");

const processFlow = [
    "Data validation",
    "Risk score calculation",
    "Decision generation"
];

for (let i = 0; i < processFlow.length; i++) {
    console.log(`Step ${i + 1}: ${processFlow[i]}`);
}


const riskScore = calculateRiskScore(user);
console.log("User:", user);
console.log("Risk Score:", riskScore);

// Final Decision
let finalDecision = "";

if (!isAdult(user.age)) {
    finalDecision = "DENY";
    alert("ACCESS DENIED: User must be adult.");
} else if (riskScore >= 3) {
    finalDecision = "REVIEW";
    alert("ACCESS UNDER REVIEW");
} else {
    finalDecision = "GRANTED";
    Swal.fire({
        title: "ACCESS GRANTED",
        text: `Welcome ${user.name} (${user.role})`,
        icon: "success"
    });
}

console.log("Final Decision:", finalDecision);
