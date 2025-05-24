let formElement = document.getElementById("resumeform");
let resumeContainer = document.getElementById("generatedresume");
function downloadResume() {
    let resumeElement = document.getElementById("generatedresume");
    if (!resumeElement)
        return;
    let options = {
        margin: [0, 0, 0, 0.2],
        filename: "Resume.pdf",
        image: { type: "png", quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    let buttons = resumeElement.querySelectorAll("button");
    buttons.forEach(function (button) {
        button.style.display = "none";
    });
    resumeElement.style.width = "780px";
    resumeElement.style.border = "none";
    html2pdf()
        .from(resumeElement)
        .set(options)
        .save()
        .then(() => {
            // After the PDF is saved, restore the buttons
            buttons.forEach((button) => {
              button.style.display = "inline-block";
            });
          });
}
let formDiv = document.getElementById("formdiv");
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
        let educationList = education.split("\n").map(function (edu) { return "<li>".concat(edu, "</li>"); }).join("");
        let workExperienceList = workExperience.split("\n").map(function (exp) { return "<li>".concat(exp, "</li>"); }).join("");
        let skillsList = skills.split("\n").map(function (skill) { return "<li>".concat(skill, "</li>"); }).join("");
        let generatedResume = "\n      <h1>".concat(name, "'s Resume</h1>\n      <h2>Personal Information</h2>\n      <p><b>Name:</b> ").concat(name, "</p>\n      <p><b>Email:</b> ").concat(email, "</p>\n      <p><b>Contact No:</b> ").concat(contact, "</p>\n      <h2>Education</h2>\n      <ul>").concat(educationList, "</ul>\n      <h2>Work Experience</h2>\n      <ul>").concat(workExperienceList, "</ul>\n      <h2>Skills</h2>\n      <ul>").concat(skillsList, "</ul>\n    ");
        resumeContainer.style.display = "block";
        resumeContainer.innerHTML = generatedResume;
        formDiv.style.display = "none";
        // Create and append "Download PDF" button
        let createPdf = document.createElement("button");
        createPdf.textContent = "Download PDF";
        resumeContainer.append(createPdf);
        createPdf.addEventListener("click", downloadResume);
        // Create and append "Share" button
        let shareButton = document.createElement("button");
        shareButton.textContent = "Share";
        shareButton.style.marginLeft = '5px';
        resumeContainer.append(shareButton);
        // Create and append share links div
        let shareLinks = document.createElement("div");
        shareLinks.style.display = "none";
        resumeContainer.append(shareLinks);
        shareButton.addEventListener("click", function () {
            let currentUrl = window.location.href;
            shareLinks.style.display = shareLinks.style.display === "none" ? "block" : "none";
            shareLinks.innerHTML = "<br>Share <a href=\"".concat(currentUrl, "\" target=\"_blank\"> Resume Builder</a> to let others make and download their Resume.");
            let copybtn = document.createElement("button");
            copybtn.textContent = "Copy Link!";
            shareLinks.appendChild(copybtn);
            copybtn.addEventListener("click", function () {
                navigator.clipboard.writeText(currentUrl)
                    .then(function () {
                    alert("Link Copied to the clipboard");
                })
                    .catch(function (err) { return console.error("Copy Link by right click on underlined text!", err); });
            });
        });
    });
}
else {
    console.error("Form element or resume container not found.");
}
