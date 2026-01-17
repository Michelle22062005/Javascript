
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

    // Increase risk
    if (user.hoursAvailable< 2) {
        riskScore++;
    }
    if (user.role === "visitor") {
        riskScore++;
    }
    if (user.age >= 18 && user.age <= 20) {
        riskScore++;
    }
    // Decrease risk
    if (user.role === "coder" && user.hoursAvailable >= 4) {
        riskScore--;
    }
    // Risk score must not be negative
    if (riskScore < 0) {
        riskScore = 0;
    }
    return Math.max(riskScore, 0);
}
const savedHistory = JSON.parse(localStorage.getItem("accessHistory"));

if (savedHistory) {
    console.log("Access history:", savedHistory);
}


// FORM SUBMIT
document.getElementById("check-in-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // 1️⃣ Create user object
    const user = {
        name: document.querySelector("#name").value,
        age: Number(document.querySelector("#age").value),
        role: document.querySelector("#role").value.toLowerCase(),
        acceptRules: document.querySelector("#acceptRules").checked,
        hoursAvailable: Number(document.querySelector("#hoursAvailable").value)
    };

 // 2️ Data validation
    if (isNaN(user.age) || isNaN(user.hoursAvailable)) {
        Swal.fire("Error", "Age and hours must be numbers", "error");
        return;
    }

    if (user.hoursAvailable < 1 || user.hoursAvailable > 12) {
        Swal.fire("Error", "Hours must be between 1 and 12", "error");
        return;
    }

    if (!isValidRole(user.role)) {
        Swal.fire("Error", "Invalid role", "error");
        return;
    }

    if (!user.acceptRules) {
        Swal.fire("Error", "You must accept the lab rules", "error");
        return;
    }

    const processFlow = [
        "Data validation",
        "Risk score calculation",
        "Generative decision"
    ];

    processFlow.forEach((step, index) => {
        console.log(`Paso ${index + 1}: ${step}`);
    });

    console.log("Check-in completed successfully!");
  

    //Age Validation
    console.log(isAdult(user.age) ? "User is an adult." : "User is a minor");

    const riskScore = calculateRiskScore(user);

    console.log("User Information:", user)
    console.log("Risk Score:", riskScore);

    //Final Decision
    
    let finalDecision = "";
    //Deny
    if (!isAdult(user.age) || !user.acceptRules || !isValidRole(user.role)) {
        finalDecision = "DENY";
        Swal.fire({
            icon:"error",
            title:  "ACCESS DENIED\n" +
                    "Reason: User must be an adult, accept the lab rules, and have a valid role.\n" +
                    "Risk Score: " +riskScore +"\n"+
                    "Role: " + user.role,
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
                `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
                `
            }
            });
            //Review
    }else if (riskScore >= 3) {
        finalDecision = "REVIEW";
        Swal.fire({
            icon: "warning",
            title: "ACCESS UNDER REVIEW\n" +
                    "Reason: High risk score (" + riskScore + ").\n" +
                "Risk Score: " +riskScore +"\n"+
                    "Role: " + user.role,
            showClass: {
                popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
                `
            },
            hideClass: {
                popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
                `
            }
            });
    }else {
        finalDecision = "GRANTED";
        Swal.fire({
    icon: "success",
    draggable: true,
    title: "ACCESS GRANTED\n" +
            "Welcome to the lab!\n" +
            "Risk Score: " +riskScore +"\n"+
            "Role: " + user.role,
    showClass: {
        popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
        `
    },
    hideClass: {
        popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
        `
    }
    });
    }
    // Save result to localStorage
const accessData = {
    name: user.name,
    age: user.age,
    role: user.role,
    decision: finalDecision,
    riskScore: riskScore,
    date: new Date().toLocaleString()
};

// Get existing history or create empty array
const history = JSON.parse(localStorage.getItem("accessHistory")) || [];

// Add new record
history.push(accessData);

// Save back to localStorage
localStorage.setItem("accessHistory", JSON.stringify(history));


    console.log("Final Decision:", finalDecision);

/*const cardSection=document.createElement("section");
    cardSection.className = "d-flex justify-content-center mb-2";
    cardSection.innerHTML+= `
    <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Decision: ${finalDecision}</h5>
                        <p class="card-text">Risk Score: ${riskScore}</p>
                        <p class="card-text">Explanation message: ${messageTitle}</p>
            </div>
        </div>
    `;
    document.body.appendChild(cardSection);*/
});





 