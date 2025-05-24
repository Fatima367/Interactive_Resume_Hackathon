let formElement = document.getElementById("resumeform");
let resumeContainer = document.getElementById("generatedresume");

function downloadResume() {
  let resumeElement = document.getElementById("generatedresume");
  if (!resumeElement) return;
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
  let image = resumeElement.querySelector("img");
  if (image) {
    image.style.height = "180px";
    image.style.width = "180px";
  }
  resumeElement.style.width = "780px";
  resumeElement.style.border = "none";
  html2pdf()
    .from(resumeElement)
    .set(options)
    .save()
    .then(function () {
      resumeElement.style.border = "1px solid gray";
      buttons.forEach(function (button) {
        button.style.display = "inline-block";
      });
    });
} 
let formDiv = document.getElementById("formdiv");
if (formElement && resumeContainer) {
  resumeContainer.style.display = "none";
  formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    let image = document.getElementById("profilepic");
    let name = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let contact = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let education = document.getElementById("education").value;
    let workExperience = document.getElementById("workExperience").value;
    let skills = document.getElementById("skills").value;
    let reference = document.getElementById("ref").value;
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
    function generateResumeContent(imageSrc) {
      return '\n          <div style="display: flex; align-items: flex-start;">\n            <div style="flex: 1;">\n              <h1>'
        .concat(
          name,
          '</h1>\n              <div style="display: flex; align-items: center; gap: 0.5rem; word-break: break-all;">\n                <p style="display: flex; align-items: center; color: #001478; margin: 0; margin-left:20px;">\n                  <i class="fas fa-envelope" style="font-size: 0.8em; margin-right: 5px;"></i>\n                  <b>Email: </b> <span style="color: black; padding-left: 5px">'
        )
        .concat(email, "</span>\n                </p>\n                ")
        .concat(
          contact
            ? '\n                <p style="display: flex; align-items: center; color: #001478; margin: 0; margin-left:20px;">\n                  <i class="fas fa-phone" style="font-size: 0.8em; margin-right: 5px;"></i>\n                  <b>Contact No: </b> <span style="color: black; padding-left: 5px"> '.concat(
                contact,
                "</span>\n                </p>"
              )
            : "",
          "\n              </div>\n              "
        )
        .concat(
          address
            ? '\n              <p style="display: flex; align-items: center; color: #001478; margin: 6px 0 0; margin-left:20px;">\n                <i class="fas fa-map-marker-alt" style="font-size: 0.8em; margin-right: 5px;"></i>\n                <b>Address:</b> <span style="color: black; padding-left: 5px; word-break: break-word; overflow-wrap: break-word;"> '.concat(
                address,
                "</span>\n              </p>"
              )
            : "",
          '\n      \n              <h2><i class="fas fa-graduation-cap" style="font-size: 0.9em; margin-right: 2px;"></i> Education</h2>\n              <ul style="word-break: break-word; overflow-wrap: break-word; font-size: medium;">'
        )
        .concat(educationList, "</ul>\n            </div>\n            ")
        .concat(
          imageSrc
            ? '<div style="flex-shrink: 0;"><img src="'.concat(
                imageSrc,
                '" alt="Profile Image" style="object-fit: cover;"/></div>'
              )
            : "",
          '\n          </div>\n      \n          <h2><i class="fas fa-briefcase" style="font-size: 0.9em; margin-right: 2px;"></i> Work Experience</h2>\n          <ul style="word-break: break-word; overflow-wrap: break-word;font-size: medium;">'
        )
        .concat(
          workExperienceList,
          '</ul>\n          <h2><i class="fas fa-tools" style="font-size: 0.9em; margin-right: 2px;"></i> Skills</h2>\n          <ul style="word-break: break-word; overflow-wrap: break-word; font-size: medium;">'
        )
        .concat(
          skillsList,
          '</ul>\n          <h2><i class="fas fa-address-book" style="font-size: 0.9em; margin-right: medium;"></i> References</h2>\n          <h4 style="word-break: break-word; overflow-wrap: break-word; font-size: medium;" >'
        )
        .concat(reference, "</h4>\n        ");
    }
    let displayResume = function (imageSrc) {
      resumeContainer.style.display = "block";
      resumeContainer.innerHTML = generateResumeContent(imageSrc);
      formDiv.style.display = "none";
      // Add Download PDF button
      let createPdf = document.createElement("button");
      createPdf.innerHTML = '<i class="fas fa-download"></i> Download PDF';
      resumeContainer.append(createPdf);
      createPdf.addEventListener("click", downloadResume);
      // Add Share button
      let shareButton = document.createElement("button");
      shareButton.innerHTML = '<i class="fas fa-share"></i> Share';
      shareButton.style.marginLeft = "5px";
      resumeContainer.append(shareButton);
      let shareLinks = document.createElement("div");
      shareLinks.style.display = "none";
      resumeContainer.append(shareLinks);
      shareButton.addEventListener("click", function () {
        let currentUrl = window.location.href;
        shareLinks.style.display =
          shareLinks.style.display === "none" ? "block" : "none";
        shareLinks.innerHTML = '<br>Share <a href="'.concat(
          currentUrl,
          '" target="_blank"> Resume Builder</a> to let others make and download their Resume.'
        );
        let copybtn = document.createElement("button");
        copybtn.innerHTML = '<i class="fas fa-copy"></i> Copy Link!';
        shareLinks.appendChild(copybtn);
        copybtn.addEventListener("click", function () {
          navigator.clipboard
            .writeText(currentUrl)
            .then(function () {
              alert("Link Copied to the clipboard");
            })
            .catch(function (err) {
              return console.error(
                "Copy Link by right click on underlined text!",
                err
              );
            });
        });
      });
      // Add Edit Resume button
      let editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fas fa-edit"></i> Edit Resume';
      editButton.style.marginLeft = "5px";
      resumeContainer.append(editButton);
      editButton.addEventListener("click", function () {  
        formDiv.style.display = "block";
        resumeContainer.style.display = "none";
      });
    };
    if (image.files?.[0]) {
      let file = image.files[0];
      let reader = new FileReader();
      reader.onload = function (e) {
        let imageSrc = e.target?.result;
        displayResume(imageSrc);
      };
      reader.readAsDataURL(file);
    } else {
      displayResume();
    }
  });
} else {
  console.error("Form element or resume container not found.");
}