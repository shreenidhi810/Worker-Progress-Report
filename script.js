const calmReport = {
  appId: "712041",
  submittedAt: "March 19, 2024 19:21",
  claimNo: "20042047",
  worker: "Madeleine Willson",

  returnChoice: "returned",
  returnDate: "March 15, 2024",
  dutyChoice: "modified-reduced",

  workUpdate:
    "I am building my regular work schedule slowly and completing the duties approved by my doctor.",

  expectedReturn: "",
  concern: "",
  employerContact: "",
  employerContactDate: "",

  recoveryChoice: "fully-recovered",

  recoveryComment:
    "I am following the treatment plan and my daily activities are becoming easier.",

  painLevel: 4,

  treatmentChoice: "continuing",
  providerType: "Physiotherapist",

  lastTreatmentDate: "March 18, 2024",
  lastProvider: "Dr. Best",

  nextTreatmentDate: "March 25, 2024",
  nextProvider: "Dr. Best",

  therapyFrequency: "Twice each week",

  medicineChoice: "taking",
  medicineName: "Naproxen",

  exerciseChoice: "doing",

  exercises: [
    "Gentle stretching",
    "Ten-minute walks",
    "Shoulder mobility exercise"
  ],

  otherInfo: "No additional information at this time."
};

const detailReport = JSON.parse(JSON.stringify(calmReport));

detailReport.worker = "Nina Patel";

detailReport.returnDate = "April 08, 2024";
detailReport.lastTreatmentDate = "April 05, 2024";
detailReport.nextTreatmentDate = "April 15, 2024";

detailReport.employerContact = "Anita Thomas";
detailReport.employerContactDate = "April 06, 2024";

detailReport.workUpdate =
  "My work hours have increased. I am able to complete most modified tasks, but I still take short breaks after lifting or standing for a long time.";

detailReport.concern =
  "I need a gradual increase in lifting work for the next two weeks.";

detailReport.recoveryChoice = "not-recovered";

detailReport.recoveryComment =
  "Pain is less frequent, but I still feel discomfort after long shifts.";

detailReport.painLevel = 6;

detailReport.exercises.push(
  "Wall push-ups",
  "Light resistance band exercise"
);

detailReport.otherInfo =
  "I will provide another update after my next medical appointment.";

function markChoice(isSelected, groupName = "", choiceName = "") {
  return `
    <span
      class="tick ${isSelected ? "active" : ""}"
      data-group="${groupName}"
      data-choice="${choiceName}"
    ></span>
  `;
}

function makeChoice(text, selected, groupName, choiceName) {
  return `
    <div class="choice-item">
      ${markChoice(selected, groupName, choiceName)}
      <span>${text}</span>
    </div>
  `;
}

function writeFooter(data, current, total) {
  return `
    <footer class="report-footer">
      <span>Worker App ID: ${data.appId}</span>
      <span class="submitted-at">Submitted: ${data.submittedAt}</span>
      <span class="page-count">Page ${current} of ${total}</span>
    </footer>
  `;
}

function drawPainScale(level) {
  const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

  const numberHtml = numbers.map((number) => {
    return `
      <div class="pain-number">
        ${markChoice(number === level, "pain-level", number)}
        ${number}
      </div>
    `;
  }).join("");

  return `
    <div class="pain-scroll">
      <div class="pain-band">
        <div class="pain-intro">
          I rate my current pain/discomfort on a scale of 1-10,
          where 1 is no pain and 10 is severe pain out of 10.
        </div>

        ${numberHtml}
      </div>
    </div>
  `;
}

function createPageOne(data) {
  return `
    <article class="page-card">
      <header class="report-head">
        <img
          class="report-logo"
          src="logo.jpeg"
          alt="Workers Compensation Board of Manitoba logo"
        >

        <div class="contact-lines">
          333 Broadway<br>
          Winnipeg, MB R3C 4W3<br>
          Phone: (204) 954-4321<br>
          Toll Free: 1-855-954-4321<br>
          wcb.mb.ca
        </div>

        <div class="report-name">
          <h1>Worker Progress Report</h1>
          <span class="claim-tag">Claim No. ${data.claimNo}</span>
          <span class="mini-tag">WP</span>
        </div>
      </header>

      <p class="opening-line">
        <span class="ink-value">${data.worker}</span>
        provided the following updates in relation to their claim:
      </p>

      <h2 class="section-title">Return to Work</h2>

      <section class="form-box">
        <span class="label">Select one:</span>

        <div class="choice-row">
          ${makeChoice(
            "I have not missed time from work",
            data.returnChoice === "not-missed",
            "return-work",
            "not-missed"
          )}

          ${makeChoice(
            "I have not returned to work",
            data.returnChoice === "not-returned",
            "return-work",
            "not-returned"
          )}

          ${makeChoice(
            `I returned to work on:
            <span class="line-answer">${data.returnDate}</span>`,
            data.returnChoice === "returned",
            "return-work",
            "returned"
          )}
        </div>
      </section>

      <section class="form-box">
        <span class="label">I am working:</span>

        <div class="choice-row">
          ${makeChoice(
            "Full duties, regular hours",
            data.dutyChoice === "full-regular",
            "duty-type",
            "full-regular"
          )}

          ${makeChoice(
            "Full duties, reduced hours",
            data.dutyChoice === "full-reduced",
            "duty-type",
            "full-reduced"
          )}

          ${makeChoice(
            "Modified duties, regular hours",
            data.dutyChoice === "modified-regular",
            "duty-type",
            "modified-regular"
          )}

          ${makeChoice(
            "Modified duties, reduced hours",
            data.dutyChoice === "modified-reduced",
            "duty-type",
            "modified-reduced"
          )}
        </div>
      </section>

      <div class="note-area short">
        My return to work is going:
        <div class="plain-value">${data.workUpdate}</div>
      </div>

      <p class="question-line">
        I expect to return to work on:
        <span class="line-answer">${data.expectedReturn}</span>
      </p>

      <div class="note-area">
        I have the following concerns about returning to work:
        <div class="plain-value">${data.concern}</div>
      </div>

      <p class="question-line">
        I was most recently in contact with:
        <span class="line-answer">${data.employerContact}</span>
        on
        <span class="line-answer">${data.employerContactDate}</span>
      </p>

      <h2 class="section-title">Recovery</h2>

      <section class="form-box">
        <span class="label">Select one:</span>

        <div class="choice-row">
          ${makeChoice(
            "I have not fully recovered from my workplace injury.",
            data.recoveryChoice === "not-recovered",
            "recovery",
            "not-recovered"
          )}

          ${makeChoice(
            "I have fully recovered from my workplace injury.",
            data.recoveryChoice === "fully-recovered",
            "recovery",
            "fully-recovered"
          )}
        </div>
      </section>

      <div class="note-area short">
        I have provided the following comments about my recovery:
        <div class="plain-value">${data.recoveryComment}</div>
      </div>

      ${writeFooter(data, 1, 3)}
    </article>
  `;
}

function createPageTwo(data) {
  const exerciseHtml = data.exercises.map((exercise) => {
    return `<li>${exercise}</li>`;
  }).join("");

  return `
    <article class="page-card">
      ${drawPainScale(data.painLevel)}

      <section class="form-box">
        <span class="label">Select one:</span>

        <div class="choice-row">
          ${makeChoice(
            "I am not continuing to receive medical treatment for my workplace injury.",
            data.treatmentChoice === "not-continuing",
            "treatment",
            "not-continuing"
          )}

          ${makeChoice(
            `I am continuing to receive medical treatment for my workplace injury from:
            <span class="line-answer">${data.providerType}</span>`,
            data.treatmentChoice === "continuing",
            "treatment",
            "continuing"
          )}
        </div>
      </section>

      <p class="question-line">
        My last medical treatment was
        <span class="line-answer">${data.lastTreatmentDate}</span>
        from
        <span class="line-answer">${data.lastProvider}</span>
      </p>

      <p class="question-line">
        My next medical treatment is
        <span class="line-answer">${data.nextTreatmentDate}</span>
        from
        <span class="line-answer">${data.nextProvider}</span>
      </p>

      <p class="question-line">
        I am attending a Chiropractor or Physiotherapist
        <span class="line-answer">${data.therapyFrequency}</span>
      </p>

      <section class="form-box">
        <span class="label">Select one:</span>

        <div class="choice-row">
          ${makeChoice(
            "I am not taking medication for my workplace injury.",
            data.medicineChoice === "not-taking",
            "medicine",
            "not-taking"
          )}

          ${makeChoice(
            `I am taking medication for my workplace injury:
            <span class="line-answer">${data.medicineName}</span>`,
            data.medicineChoice === "taking",
            "medicine",
            "taking"
          )}
        </div>
      </section>

      <section class="form-box">
        <span class="label">Select one:</span>

        <div class="choice-row">
          ${makeChoice(
            "I am not doing home exercises for my workplace injury.",
            data.exerciseChoice === "not-doing",
            "exercise",
            "not-doing"
          )}

          ${makeChoice(
            "I am doing home exercises for my workplace injury.",
            data.exerciseChoice === "doing",
            "exercise",
            "doing"
          )}
        </div>
      </section>

      <div class="list-area">
        List the exercises you are doing:
        <ul>${exerciseHtml}</ul>
      </div>

      <h2 class="section-title">Other Information</h2>

      <div class="note-area short">
        I would like to provide the following additional information about my claim/injury:
        <div class="plain-value">${data.otherInfo}</div>
      </div>

      ${writeFooter(data, 2, 3)}
    </article>
  `;
}

function createPageThree(data) {
  return `
    <article class="page-card">
      <div class="declaration">
        ${markChoice(true)}

        <div>
          I certify that the information given on this form is true, correct and complete
          to the best of my knowledge. I agree to notify the Workers Compensation Board
          of Manitoba immediately once I return to any form of work and/or employment.
          I understand that it is an offence to knowingly make a false statement to the
          WCB. I also understand that it is an offence to withhold information from WCB
          which affects my entitlement to compensation, including recovery from injury
          or ability to return to work.
        </div>
      </div>

      <div class="privacy-note">
        ${markChoice(true)}
        I understand that the
        <a href="#privacy">Privacy Notice</a>
        applies to the personal information collected in this document.
      </div>

      ${writeFooter(data, 3, 3)}
    </article>
  `;
}

function openProgressPacket(data) {
  document.getElementById("reportDesk").innerHTML =
    createPageOne(data) +
    createPageTwo(data) +
    createPageThree(data);

  const boxes = document.querySelectorAll(".tick");

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      const groupName = box.dataset.group;

      if (groupName) {
        const groupBoxes = document.querySelectorAll(
          `[data-group="${groupName}"]`
        );

        groupBoxes.forEach((groupBox) => {
          groupBox.classList.remove("active");
        });

        box.classList.add("active");
      } else {
        box.classList.toggle("active");
      }
    });
  });
}

openProgressPacket(calmReport);

document.getElementById("compactView").addEventListener("click", () => {
  openProgressPacket(calmReport);
});

document.getElementById("fullView").addEventListener("click", () => {
  openProgressPacket(detailReport);
});