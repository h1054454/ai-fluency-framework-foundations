const form = document.getElementById("signup-form");
const submitBtn = document.getElementById("submit-btn");
const errorBox = document.getElementById("form-error");
const formContainer = document.getElementById("form-container");
const successContainer = document.getElementById("success-container");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorBox.classList.add("hidden");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const body = {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
  };

  try {
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      formContainer.classList.add("hidden");
      successContainer.classList.remove("hidden");
      successContainer.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      errorBox.textContent = data.error ?? "Something went wrong. Please try again.";
      errorBox.classList.remove("hidden");
      submitBtn.disabled = false;
      submitBtn.textContent = "Count me in";
    }
  } catch {
    errorBox.textContent = "Network error. Please check your connection and try again.";
    errorBox.classList.remove("hidden");
    submitBtn.disabled = false;
    submitBtn.textContent = "Count me in";
  }
});
