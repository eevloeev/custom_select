(function (querySelector) {
  const globeSVG = `<svg class="custom-select__trigger-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z"/></svg>`;
  const arrowSVG = `<svg class="custom-select__trigger-arrow" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-360 280-560h400L480-360Z" /></svg>`;

  const nativeSelect = document.querySelector(querySelector);

  generateHTML();

  const select = document.querySelector(".custom-select");
  const trigger = select.querySelector(".custom-select__trigger");
  const triggerText = trigger.querySelector(".custom-select__trigger-text");
  const dropdown = select.querySelector(".custom-select__options");
  const options = select.querySelectorAll(".custom-select__option");

  init();

  function init() {
    nativeSelect.style.display = "none";

    nativeSelect.addEventListener("change", handleChangeLanguage);
    nativeSelect.addEventListener("change", updateCustomSelect);
    trigger.addEventListener("click", toggleDropdown);
    document.addEventListener("click", handleOutsideClick);
    options.forEach((option) => {
      option.addEventListener("click", handleOptionClick);
    });
  }

  function createOptions() {
    return Array.from(nativeSelect.options).map((option) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("custom-select__option");
      optionElement.dataset.value = option.value;
      optionElement.textContent = option.textContent.trim();

      if (option.selected) {
        optionElement.classList.add("custom-select__option_selected");
      }

      if (option.disabled) {
        optionElement.classList.add("custom-select__option_disabled");
      }

      return optionElement;
    });
  }

  function generateHTML() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("custom-select-wrapper");
    nativeSelect.insertAdjacentElement("afterend", wrapper);

    const select = document.createElement("div");
    select.classList.add("custom-select");
    wrapper.appendChild(select);

    const trigger = document.createElement("div");
    trigger.classList.add("custom-select__trigger");
    trigger.dataset.value = nativeSelect.value;
    select.appendChild(trigger);

    const triggerText = document.createElement("div");
    triggerText.classList.add("custom-select__trigger-text");
    triggerText.textContent =
      nativeSelect.options[nativeSelect.selectedIndex].textContent.trim();
    trigger.innerHTML += globeSVG;
    trigger.appendChild(triggerText);
    trigger.innerHTML += arrowSVG;

    const dropdown = document.createElement("div");
    dropdown.classList.add("custom-select__options");
    select.appendChild(dropdown);

    const options = createOptions();
    options.forEach((option) => {
      dropdown.appendChild(option);
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
})(".jsLanguageSwitcher");
