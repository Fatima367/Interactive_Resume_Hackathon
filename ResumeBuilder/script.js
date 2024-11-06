var formElement = document.getElementById("resumeform");
var resumeContainer = document.getElementById("generatedresume");
function downloadResume() {
    var resumeElement = document.getElementById("generatedresume");
    if (!resumeElement)
        return;
    var options = {
        margin: [0, 0, 0, 0.2],
        filename: "Resume.pdf",
        image: { type: "png", quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    var buttons = resumeElement.querySelectorAll("button");
    buttons.forEach(function (button) {
        button.style.display = "none";
    });
    resumeElement.style.width = '780px';
    resumeElement.style.border = "none";
    html2pdf()
        .from(resumeElement)
        .set(options)
        .save()
        .then(function () {
        // After the PDF is saved, restore the buttons
        buttons.forEach(function (button) {
            button.style.display = "block";
        });
    });
}
var formDiv = document.getElementById("formdiv");
if (formElement && resumeContainer) {
    resumeContainer.style.display = "none";
    formElement.addEventListener("submit", function (event) {
        event.preventDefault();
        var image = document.getElementById("profilepic").src;
        var name = document.getElementById("fullname").value;
        var email = document.getElementById("email").value;
        var contact = document.getElementById("phone").value;
        var education = document.getElementById("education").value;
        var workExperience = document.getElementById("workExperience").value;
        var skills = document.getElementById("skills").value;
        var educationList = education.split("\n").map(function (edu) { return "<li>".concat(edu, "</li>"); }).join("");
        var workExperienceList = workExperience.split("\n").map(function (exp) { return "<li>".concat(exp, "</li>"); }).join("");
        var skillsList = skills.split("\n").map(function (skill) { return "<li>".concat(skill, "</li>"); }).join("");
        var generatedResume = "\n      <h1>".concat(name, "'s Resume</h1>\n      <h2>Personal Information</h2>\n      <img>").concat(image, " </img>\n      <p><b>Name:</b> ").concat(name, "</p>\n      <p><b>Email:</b> ").concat(email, "</p>\n      <p><b>Contact No:</b> ").concat(contact, "</p>\n      <h2>Education</h2>\n      <ul>").concat(educationList, "</ul>\n      <h2>Work Experience</h2>\n      <ul>").concat(workExperienceList, "</ul>\n      <h2>Skills</h2>\n      <ul>").concat(skillsList, "</ul>\n    ");
        resumeContainer.style.display = "block";
        resumeContainer.innerHTML = generatedResume;
        formDiv.style.display = "none";
        // Create and append "Download PDF" button
        var createPdf = document.createElement("button");
        createPdf.textContent = "Download PDF";
        resumeContainer.append(createPdf);
        createPdf.addEventListener("click", downloadResume);
        // Create and append "Share" button
        var shareButton = document.createElement("button");
        shareButton.textContent = "Share";
        shareButton.style.marginLeft = '5px';
        resumeContainer.append(shareButton);
        // Create and append share links div
        var shareLinks = document.createElement("div");
        shareLinks.style.display = "none";
        resumeContainer.append(shareLinks);
        shareButton.addEventListener("click", function () {
            var currentUrl = window.location.href;
            shareLinks.style.display = shareLinks.style.display === "none" ? "block" : "none";
            shareLinks.innerHTML = "<br>Share <a href=\"".concat(currentUrl, "\" target=\"_blank\"> Resume Builder</a> to let others make and download their Resume.");
            var copybtn = document.createElement("button");
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
