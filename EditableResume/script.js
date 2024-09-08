"use strict";
const form = document.getElementById("resumeform");
let newResume = document.getElementById("generatedresume");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("phone").value;
  const education = document.getElementById("education").value;
  const workExperience = document.getElementById("workExperience").value;
  const skills = document.getElementById("skills").value;
  const generateResume = `
            <h1>${name}'s Resume</h1>
            
            <h2>Personal Information</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Contact No:</b> ${contact}</p>
          
            <h2>Education</h2>
            <p>${education}</p>
       

            <h2>Work Experience</h2>
            <p>${workExperience}</p>
       

            <h2>Skills</h2>
            <p>${skills}</p>
        `;

  let newResume = document.getElementById("generatedresume");
  newResume.innerHTML = generateResume;

  let generatebtn = document.querySelector("button");
  generatebtn.addEventListener("click", () => {
    form.style.display = "none";
  });

  const editbtn = document.createElement("button");
  editbtn.textContent = "Edit Resume";
  newResume.appendChild(editbtn);

  editbtn.addEventListener("click", () => {
    generatebtn.style.display = "none";
    newResume.style.display = "none";
    form.style.display = "block";

    let updatebtn = document.createElement("button");
    updatebtn.textContent = "Update Resume ";
    form.appendChild(updatebtn);

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
            <p>${education}</p>
       

            <h2>Work Experience</h2>
            <p>${workExperience}</p>
       

            <h2>Skills</h2>
            <p>${skills}</p>
        `;

      newResume.innerHTML = updateResume;
      newResume.style.display = "visible";
      form.style.display = "none";
    });
  });
});
