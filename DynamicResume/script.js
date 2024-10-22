var formElement = document.getElementById("resumeform");
var resumeContainer = document.getElementById("generatedresume");
var formDiv = document.getElementById("formdiv");
if (formElement && resumeContainer) {
    resumeContainer.style.display = "none";
    formElement.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = document.getElementById("fullname")
            .value;
        var email = document.getElementById("email").value;
        var contact = document.getElementById("phone")
            .value;
        var education = document.getElementById("education").value;
        var workExperience = document.getElementById("workExperience").value;
        var skills = document.getElementById("skills")
            .value;
        var educationList = education
            .split("\n")
            .map(function (edu) { return "<li>".concat(edu, "</li>"); })
            .join("");
        var workExperienceList = workExperience
            .split("\n")
            .map(function (exp) { return "<li>".concat(exp, "</li>"); })
            .join("");
        var skillsList = skills
            .split("\n")
            .map(function (skill) { return "<li>".concat(skill, "</li>"); })
            .join("");
        var generatedResume = "\n      <h1>".concat(name, "'s Resume</h1>\n      \n      <h2>Personal Information</h2>\n      <p><b>Name:</b> ").concat(name, "</p>\n      <p><b>Email:</b> ").concat(email, "</p>\n      <p><b>Contact No:</b> ").concat(contact, "</p>\n\n      <h2>Education</h2>\n      <ul>").concat(educationList, "</ul>\n\n      <h2>Work Experience</h2>\n      <ul>").concat(workExperienceList, "</ul>\n\n      <h2>Skills</h2>\n      <ul>").concat(skillsList, "</ul>\n    ");
        resumeContainer.style.display = "block";
        resumeContainer.innerHTML = generatedResume;
        formDiv.style.display = "none";
    });
}
else {
    console.error("Form element or resume container not found.");
}
