"use strict";
let formElement = document.getElementById("resumeform");
let resumeContainer = document.getElementById("generatedresume");
if (formElement && resumeContainer) {
    resumeContainer.style.display = "none";
    formElement.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("fullname")
            .value;
        const email = document.getElementById("email").value;
        const contact = document.getElementById("phone")
            .value;
        const education = document.getElementById("education").value;
        const workExperience = document.getElementById("workExperience").value;
        const skills = document.getElementById("skills")
            .value;
        const educationList = education
            .split("\n")
            .map((edu) => `<li>${edu}</li>`)
            .join("");
        const workExperienceList = workExperience
            .split("\n")
            .map((exp) => `<li>${exp}</li>`)
            .join("");
        const skillsList = skills
            .split("\n")
            .map((skill) => `<li>${skill}</li>`)
            .join("");
        const generatedResume = `
      <h1>${name}'s Resume</h1>
      
      <h2>Personal Information</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Contact No:</b> ${contact}</p>

      <h2>Education</h2>
      <ul>${educationList}</ul>

      <h2>Work Experience</h2>
      <ul>${workExperienceList}</ul>

      <h2>Skills</h2>
      <ul>${skillsList}</ul>
    `;
        resumeContainer.style.display = "block";
        resumeContainer.innerHTML = generatedResume;
        let generatebtn = document.querySelector("button");
        generatebtn.addEventListener("click", () => {
            formElement.style.display = "none";
        });
        const editbtn = document.createElement("button");
        editbtn.textContent = "Edit Resume";
        resumeContainer.appendChild(editbtn);
        editbtn.addEventListener("click", () => {
            generatebtn.style.display = "none";
            resumeContainer.style.display = "none";
            formElement.style.display = "block";
            let updatebtn = document.createElement("button");
            updatebtn.textContent = "Update Resume ";
            formElement.appendChild(updatebtn);
            updatebtn.addEventListener("Update Resume", (event) => {
                generatebtn.style.display = "none";
                event.preventDefault();
                let updateResume = `
            <h1>${name}'s Resume</h1>
            
            <h2>Personal Information</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Contact No:</b> ${contact}</p>
          
            <h2>Education</h2>
            <p>${educationList}</p>
       

            <h2>Work Experience</h2>
            <p>${workExperienceList}</p>
       

            <h2>Skills</h2>
            <p>${skillsList}</p>
        `;
                resumeContainer.innerHTML = updateResume;
                resumeContainer.style.display = "visible";
                formElement.style.display = "none";
            });
        });
    });
}
else {
    console.error("Form element or resume container not found.");
}
