function submitForm() {
  const data = {
    q1: document.querySelector("[data-question='q1']").dataset.selected || "",
    q2: document.querySelector("[data-question='q2']").dataset.selected || "",
    q3: document.querySelector("[data-question='q3']").dataset.selected || "",
    q4: document.querySelector("[data-question='q4']").dataset.selected || "",
    q5: document.getElementById("q5").value
  };

  if (!data.q1 || !data.q2 || !data.q3 || !data.q4) {
    alert("Please rate all questions.");
    return;
  }

  fetch("https://script.google.com/macros/s/AKfycbxahF7rCskO2_6zSBp4JfySnrYEwxSLNqPf3GJuTT98TXWkTd8ZvrbnepSdwY-o1S7Yig/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      if (res.status === "success") {
        alert("Feedback submitted successfully!");
      } else {
        alert("Failed to submit feedback.");
      }
    })
    .catch(() => alert("Error submitting form."));
}

// === Star creation & interaction ===
document.querySelectorAll(".stars").forEach(group => {
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.classList.add("star");
    star.innerHTML = "★";
    star.dataset.value = i;
    star.title = ["Bad 😞", "Okay 😐", "Average 🙂", "Good 😃", "Excellent 🤩"][i - 1];

    star.addEventListener("click", () => {
      group.dataset.selected = i;
      group.querySelectorAll(".star").forEach((s, idx) => {
        s.classList.toggle("selected", idx < i);
      });
    });

    group.appendChild(star);
  }
});

// Stagger animation for fade-in
document.querySelectorAll(".stars").forEach((group, index) => {
  group.style.animationDelay = `${index * 0.2}s`;
});
