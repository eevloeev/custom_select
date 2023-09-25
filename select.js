(function () {
  const nativeSelect = document.querySelector(".jsLanguageSwitcher");
  nativeSelect.addEventListener("change", handleChangeLanguage);

  // nativeSelect.style.display = "none";

  const select = document.querySelector(".custom-select");
  const trigger = select.querySelector(".custom-select__trigger");
  const triggerText = trigger.querySelector(".custom-select__trigger-text");
  const options = select.querySelectorAll(".custom-select__option");
  trigger.addEventListener("click", toggleDropdown);
  document.addEventListener("click", handleOutsideClick);
  options.forEach((option) => {
    option.addEventListener("click", handleOptionClick);
  });

  function handleOptionClick(event) {
    if (event.target.classList.contains("custom-select__option_selected"))
      return;
    if (event.target.classList.contains("custom-select__option_disabled"))
      return;

    const value = event.target.dataset.value;
    const text = event.target.textContent.trim();

    select.classList.remove("custom-select_expanded");
    triggerText.textContent = text;
    trigger.dataset.value = value;

    options.forEach((option, index) => {
      option.classList.remove("custom-select__option_selected");
      if (option.dataset.value === value) {
        nativeSelect.options[index].selected = true;
      }
    });
    event.target.classList.add("custom-select__option_selected");

    if ("createEvent" in document) {
      var e = document.createEvent("HTMLEvents");
      e.initEvent("change", false, true);
      nativeSelect.dispatchEvent(e);
    } else {
      nativeSelect.fireEvent("onchange");
    }
  }

  function handleChangeLanguage(event) {
    const langCode = event.target.value;
    console.log(langCode);
  }

  function toggleDropdown(event) {
    event.stopPropagation();
    select.classList.toggle("custom-select_expanded");
  }

  function handleOutsideClick(event) {
    if (event.target.closest(".custom-select")) return;

    select.classList.remove("custom-select_expanded");
  }
})();
