"use strict";
const form = document.getElementById("resumeform");
let newResume = document.getElementById("generatedresume");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  let formdiv = document.querySelector(".formdiv");
  formdiv.style.display = "none";
  let mainheading = document.getElementById("mainheading");
  mainheading.style.display = "none";
  form.style.display = "none";

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

  const newResume = document.getElementById("generatedresume");
  newResume.innerHTML = generateResume;

  const createPdf = document.createElement("button");
  createPdf.textContent = "Download PDF";
  newResume.append(createPdf);

  createPdf.addEventListener("click", function () {
    window.print();
  });

  const shareButton = document.createElement("button");
  shareButton.textContent = "Share";
  newResume.append(shareButton);

  const shareLinks = document.createElement("div");
  shareLinks.style.display = "none";
  newResume.append(shareLinks);

  shareButton.addEventListener("click", function () {
    const currentUrl = window.location.href;
    shareLinks.style.display =
      shareLinks.style.display === "none" ? "block" : "none";

    shareLinks.innerHTML = `<br>Share <a href="${currentUrl}" target="_blank"> Resume Builder</a> to let 
    others make and download their Resume.`;

    let copybtn = document.createElement("button");
    copybtn.textContent = "Copy Link!";
    shareLinks.appendChild(copybtn);
    copybtn.addEventListener("click", () => {
      navigator.clipboard.writeText(currentUrl)
        .then(() => {
          alert(`Link Copied to the clipboard`);
        })
        .catch((err) =>
          console.error("Copy Link by by right click on underlined text!", err)
        );
    });
  });
});
