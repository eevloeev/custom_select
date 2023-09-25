(function () {
  const nativeSelect = document.querySelector(".jsLanguageSwitcher");
  nativeSelect.addEventListener("change", handleChangeLanguage);

  // nativeSelect.style.display = "none";

  nativeSelect.addEventListener("change", updateCustomSelect);
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

    setActiveOption(event.target);

    if ("createEvent" in document) {
      var e = document.createEvent("HTMLEvents");
      e.initEvent("change", false, true);
      nativeSelect.dispatchEvent(e);
    } else {
      nativeSelect.fireEvent("onchange");
    }
  }

  function setActiveOption(option) {
    const value = option.dataset.value;
    const text = option.textContent.trim();

    select.classList.remove("custom-select_expanded");
    triggerText.textContent = text;
    trigger.dataset.value = value;

    options.forEach((option, index) => {
      option.classList.remove("custom-select__option_selected");
      if (option.dataset.value === value) {
        nativeSelect.options[index].selected = true;
      }
    });
    option.classList.add("custom-select__option_selected");
  }

  function updateCustomSelect(event) {
    const value = event.target.value;
    const option = Array.from(options).find((option) => {
      return option.dataset.value === value;
    });
    setActiveOption(option);
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
