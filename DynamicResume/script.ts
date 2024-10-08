const form = document.getElementById("resumeform") as HTMLFormElement;

let newResume = document.getElementById("generatedresume");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = (document.getElementById("fullname") as HTMLInputElement).value;

  const email = (document.getElementById("email") as HTMLInputElement).value;

  const contact = (document.getElementById("phone") as HTMLInputElement).value;

  const education = (
    document.getElementById("education") as HTMLTextAreaElement
  ).value;

  const workExperience = (
    document.getElementById("workExperience") as HTMLTextAreaElement
  ).value;

  const skills = (document.getElementById("skills") as HTMLTextAreaElement)
    .value;

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

  const newResume = document.getElementById("generatedresume");
  newResume.innerHTML = generateResume;
});
