const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll(".site-search").forEach((searchForm) => {
  const searchInput = searchForm.querySelector('input[type="search"]');
  if (!searchInput || prefersReducedMotion) return;

  const suggestions = ["MI Camps", "Student feedback"];
  let suggestionIndex = 0;
  let characterIndex = 0;
  let typing = true;
  let animationId;

  function animateSuggestion() {
    const suggestion = suggestions[suggestionIndex];

    if (typing) {
      characterIndex += 1;
      if (characterIndex === suggestion.length) {
        typing = false;
        animationId = window.setTimeout(animateSuggestion, 900);
        searchInput.placeholder = suggestion;
        return;
      }
    } else if (characterIndex > 0) {
      characterIndex -= 1;
    } else {
      suggestionIndex = (suggestionIndex + 1) % suggestions.length;
      typing = true;
    }

    searchInput.placeholder = suggestion.slice(0, characterIndex);
    animationId = window.setTimeout(animateSuggestion, typing ? 120 : 65);
  }

  searchForm.addEventListener("mouseenter", () => {
    if (searchInput.value || document.activeElement === searchInput) return;
    suggestionIndex = 0;
    characterIndex = 0;
    typing = true;
    searchInput.placeholder = "";
    animateSuggestion();
  });

  searchForm.addEventListener("mouseleave", () => {
    window.clearTimeout(animationId);
    searchInput.placeholder = "Search...";
  });

  searchInput.addEventListener("focus", () => {
    window.clearTimeout(animationId);
    searchInput.placeholder = "Search...";
  });
});
