const formElement = document.getElementById("resumeform") ;
const resumeContainer = document.getElementById("generatedresume") ;


if (formElement && resumeContainer) {
  resumeContainer.style.display= "none";
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = (document.getElementById("fullname") ).value;
    const email = (document.getElementById("email") ).value;
    const contact = (document.getElementById("phone") ).value;
    const education = (document.getElementById("education") ).value;
    const workExperience = (document.getElementById("workExperience") ).value;
    const skills = (document.getElementById("skills") ).value;

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
    resumeContainer.style.display = "block"
    resumeContainer.innerHTML = generatedResume;
  });
} else {
  console.error("Form element or resume container not found.");
}
