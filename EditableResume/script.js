let formElement = document.getElementById("resumeform");
let resumeContainer = document.getElementById("generatedresume");
if (formElement && resumeContainer) {
  resumeContainer.style.display = "none";
  formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let contact = document.getElementById("phone").value;
    let education = document.getElementById("education").value;
    let workExperience = document.getElementById("workExperience").value;
    let skills = document.getElementById("skills").value;
    let educationList = education
      .split("\n")
      .map(function (edu) {
        return "<li>".concat(edu, "</li>");
      })
      .join("");
    let workExperienceList = workExperience
      .split("\n")
      .map(function (exp) {
        return "<li>".concat(exp, "</li>");
      })
      .join("");
    let skillsList = skills
      .split("\n")
      .map(function (skill) {
        return "<li>".concat(skill, "</li>");
      })
      .join("");
    let generatedResume = "\n      <h1>"
      .concat(
        name,
        "'s Resume</h1>\n      \n      <h2>Personal Information</h2>\n      <p><b>Name:</b> "
      )
      .concat(name, "</p>\n      <p><b>Email:</b> ")
      .concat(email, "</p>\n      <p><b>Contact No:</b> ")
      .concat(contact, "</p>\n\n      <h2>Education</h2>\n      <ul>")
      .concat(
        educationList,
        "</ul>\n\n      <h2>Work Experience</h2>\n      <ul>"
      )
      .concat(workExperienceList, "</ul>\n\n      <h2>Skills</h2>\n      <ul>")
      .concat(skillsList, "</ul>\n    ");
    resumeContainer.style.display = "block";
    resumeContainer.innerHTML = generatedResume;
    let generatebtn = document.querySelector("button");
    generatebtn.addEventListener("click", function () {
      formElement.style.display = "none";
    });
    let editbtn = document.createElement("button");
    editbtn.textContent = "Edit Resume";
    resumeContainer.appendChild(editbtn);
    editbtn.addEventListener("click", function () {
      generatebtn.style.display = "none";
      resumeContainer.style.display = "none";
      formElement.style.display = "block";
      let updatebtn = document.createElement("button");
      updatebtn.textContent = "Update Resume ";
      formElement.appendChild(updatebtn);
      updatebtn.addEventListener("Update Resume", function (event) {
        generatebtn.style.display = "none";
        event.preventDefault();
        let updateResume = "\n            <h1>"
          .concat(
            name,
            "'s Resume</h1>\n            \n            <h2>Personal Information</h2>\n            <p><b>Name:</b> "
          )
          .concat(name, "</p>\n            <p><b>Email:</b> ")
          .concat(email, "</p>\n            <p><b>Contact No:</b> ")
          .concat(
            contact,
            "</p>\n          \n            <h2>Education</h2>\n            <p>"
          )
          .concat(
            educationList,
            "</p>\n       \n\n            <h2>Work Experience</h2>\n            <p>"
          )
          .concat(
            workExperienceList,
            "</p>\n       \n\n            <h2>Skills</h2>\n            <p>"
          )
          .concat(skillsList, "</p>\n        ");
        resumeContainer.innerHTML = updateResume;
        resumeContainer.style.display = "visible";
        formElement.style.display = "none";
      });
    });
  });
} else {
  console.error("Form element or resume container not found.");
}
