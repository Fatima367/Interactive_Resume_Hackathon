var formElement = document.getElementById("resumeform");
var resumeContainer = document.getElementById("generatedresume");
function downloadResume() {
  var resumeElement = document.getElementById("generatedresume");
  if (!resumeElement) return;
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
  var image = resumeElement.querySelector("img");
  image === null || image === void 0 ? void 0 : (image.style.height = "180px");
  image === null || image === void 0 ? void 0 : (image.style.width = "180px");
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
var formDiv = document.getElementById("formdiv");
if (formElement && resumeContainer) {
  resumeContainer.style.display = "none";
  formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    var image = document.getElementById("profilepic");
    var name = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var contact = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var education = document.getElementById("education").value;
    var workExperience = document.getElementById("workExperience").value;
    var skills = document.getElementById("skills").value;
    var reference = document.getElementById("ref").value;
    var educationList = education
      .split("\n")
      .map(function (edu) {
        return "<li>".concat(edu, "</li>");
      })
      .join("");
    var workExperienceList = workExperience
      .split("\n")
      .map(function (exp) {
        return "<li>".concat(exp, "</li>");
      })
      .join("");
    var skillsList = skills
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
    var displayResume = function (imageSrc) {
      resumeContainer.style.display = "block";
      resumeContainer.innerHTML = generateResumeContent(imageSrc);
      formDiv.style.display = "none";
      // Add Download PDF button
      var createPdf = document.createElement("button");
      createPdf.innerHTML = '<i class="fas fa-download"></i> Download PDF';
      resumeContainer.append(createPdf);
      createPdf.addEventListener("click", downloadResume);
      // Add Share button
      var shareButton = document.createElement("button");
      shareButton.innerHTML = '<i class="fas fa-share"></i> Share';
      shareButton.style.marginLeft = "5px";
      resumeContainer.append(shareButton);
      var shareLinks = document.createElement("div");
      shareLinks.style.display = "none";
      resumeContainer.append(shareLinks);
      shareButton.addEventListener("click", function () {
        var currentUrl = window.location.href;
        shareLinks.style.display =
          shareLinks.style.display === "none" ? "block" : "none";
        shareLinks.innerHTML = '<br>Share <a href="'.concat(
          currentUrl,
          '" target="_blank"> Resume Builder</a> to let others make and download their Resume.'
        );
        var copybtn = document.createElement("button");
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
      var editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fas fa-edit"></i> Edit Resume';
      editButton.style.marginLeft = "5px";
      resumeContainer.append(editButton);
      editButton.addEventListener("click", function () {
        formDiv.style.display = "block";
        resumeContainer.style.display = "none";
      });
    };
    if (image.files && image.files[0]) {
      var file = image.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var _a;
        var imageSrc =
          (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
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
