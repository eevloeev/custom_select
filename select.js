(function () {
  window.customLanguageSelect = function (querySelector) {
    const nativeSelect = document.querySelector(querySelector);

    const select = document.querySelector(".custom-select"),
      trigger = select.querySelector(".custom-select__trigger"),
      triggerText = select.querySelector(".custom-select__trigger-text"),
      dropdown = select.querySelector(".custom-select__options"),
      options = select.querySelectorAll(".custom-select__option");

    init();

    function init() {
      // nativeSelect.style.display = "none";

      nativeSelect.addEventListener("change", handleChangeLanguage);
      nativeSelect.addEventListener("change", updateCustomSelect);
      trigger.addEventListener("click", toggleDropdown);
      document.addEventListener("click", handleOutsideClick);
      options.forEach((option) => {
        option.addEventListener("click", handleOptionClick);
      });
    }

    function handleOptionClick(event) {
      const isSelected = event.target.classList.contains(
        "custom-select__option_selected"
      );
      const isDisabled = event.target.classList.contains(
        "custom-select__option_selected"
      );

      if (isSelected || isDisabled) return;

      setActiveOption(event.target);
      emitEvent();
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
      const isExpanded = select.classList.contains("custom-select_expanded");

      if (isExpanded) {
        fixDropdownPosition();
      } else {
        dropdown.classList.remove("custom-select__options_top");
      }
    }

    function handleOutsideClick(event) {
      if (event.target.closest(".custom-select")) return;

      select.classList.remove("custom-select_expanded");
    }

    function fixDropdownPosition() {
      const dropdownRect = dropdown.getBoundingClientRect();

      const isBottomComesOut =
        dropdownRect.y + dropdownRect.height > window.innerHeight;

      if (isBottomComesOut) {
        dropdown.classList.add("custom-select__options_top");
      }
    }

    function emitEvent() {
      if ("createEvent" in document) {
        var e = document.createEvent("HTMLEvents");
        e.initEvent("change", false, true);
        nativeSelect.dispatchEvent(e);
      } else {
        nativeSelect.fireEvent("onchange");
      }
    }
  };

  customLanguageSelect(".jsLanguageSwitcher");
})();
