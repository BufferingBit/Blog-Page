document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;
  const themeIcon = document.getElementById("theme-icon");

  // ✅ Ensure the theme is applied on page load
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
      html.classList.add("dark");
      themeIcon.textContent = "☀️"; // Sun emoji for light mode
  } else {
      html.classList.remove("dark");
      themeIcon.textContent = "🌑"; // Moon emoji for dark mode
  }

  // ✅ Toggle theme on button click
  themeToggle.addEventListener("click", () => {
      const isDark = html.classList.toggle("dark"); // Toggle the dark class
      localStorage.setItem("theme", isDark ? "dark" : "light");
      themeIcon.textContent = isDark ? "☀️" : "🌑"; // Change emoji
  });
});
