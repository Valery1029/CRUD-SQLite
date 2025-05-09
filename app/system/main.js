/**
 * Author:DIEGO CASALLAS
 * Date:08/04/2024
 * Descriptions:This is controller class for managing main general
 * **/
class Main {

  /**
   * The constructor function initializes properties for managing a modal form in JavaScript.
   * @param modalId - The `modalId` parameter is the ID of the modal element that you want to initialize
   * as a Bootstrap modal.
   * @param formId - The `formId` parameter in the constructor function refers to the ID of the form
   * element in the HTML document. This ID is used to select and manipulate the form element within the
   * JavaScript code.
   * @param classEdit - The `classEdit` parameter in the constructor function is used to store a CSS
   * class name that will be used for editing elements in the form. This class name will be applied to
   * elements within the form to indicate that they are in edit mode.
   * @param preloadId - The `preloadId` parameter in the constructor function is used to specify the ID
   * of the element that represents a preloader or loading indicator in the HTML document. This element
   * is typically displayed while data is being loaded or processed asynchronously to provide feedback to
   * the user that an operation is in progress.
   */
  constructor(modalId, formId, classEdit, preloadId) {


    var arrayModal = [];
    var arrayForm = [];

    if (Array.isArray(modalId)) {
      for (let i = 0; i < modalId.length; i++) {
        arrayModal.push(new bootstrap.Modal(document.getElementById(modalId[i])));
      }

    } else {
      arrayModal.push(new bootstrap.Modal(document.getElementById(modalId)));

    }
    this.myModal = arrayModal;
    if (Array.isArray(formId)) {
      for (let i = 0; i < formId.length; i++) {
        arrayForm.push(document.getElementById(formId[i]));
      }
    } else {
      arrayForm.push(document.getElementById(formId));
    }

    this.myForm = arrayForm;
    this.classEdit = classEdit;
    this.elementJson = {};
    this.fromData = new FormData();
    this.preload = document.getElementById(preloadId);
  }

  /**
   * The function `showPreload()` sets the display property of an element with the class `preload` to
   * "block".
   */
  showPreload() {
    this.preload.style.display = "block";
  }


  /**
   * The `hiddenPreload` function gradually reduces the opacity of a specified element until it becomes
   * almost transparent and then hides the element.
   */
  hiddenPreload() {
    const objPreload = this.preload;
    var op = 1;  // initial opacity
    let fadeEffect = setInterval(function () {
      if (op <= 0.1) {
        objPreload.style.display = "none";
        clearInterval(fadeEffect);
      }
      objPreload.style.opacity = op;
      op -= 0.1;
    }, 100, objPreload);
  }

  /**
   * The `setLocationPage` function redirects the user to a new URL after a delay of 1 second.
   * @param url - The `url` parameter in the `setLocationPage` function is a string that represents the
   * URL to which you want to navigate after a delay of 1000 milliseconds (1 second).
   */
  setLocationPage(url) {
    setTimeout(() => {
      window.location.href = url;
    }, 1000);
  }

  /**
   * The function showModal() displays a modal.
   */
  showModal(position = 0) {
    this.myModal[position].show();
  }

  /**
   * The `hiddenModal` function hides a modal element.
   */
  hiddenModal(position = 0) {
    this.myModal[position].hide();
  }

  /**
   * The getForm function returns the myForm property.
   * @returns The `myForm` property is being returned from the `getForm` method.
   */
  getForm(position = 0) {
    return this.myForm[position];
  }

  /**
   * The function `disabledFormAll` disables all input and select elements within a specified form.
   */
  disabledFormAll(position = 0) {

    var elementsInput = this.myForm[position].querySelectorAll('input');
    var elementsSelect = this.myForm[position].querySelectorAll('select');
    for (let i = 0; i < elementsInput.length; i++) {
      elementsInput[i].disabled = true;
    }
    for (let j = 0; j < elementsSelect.length; j++) {
      elementsSelect[j].disabled = true;
    }
  }

  /**
   * The function `disabledFormEdit` disables form elements based on their class name.
   */
  disabledFormEdit(position = 0) {
    var elementsInput = this.myForm[position].querySelectorAll('input');
    var elementsSelect = this.myForm[position].querySelectorAll('select');
    for (let i = 0; i < elementsInput.length; i++) {
      if (elementsInput[i].classList.contains(this.classEdit)) {
        elementsInput[i].disabled = true;
      } else {
        elementsInput[i].disabled = false;
      }
    }
    for (let j = 0; j < elementsSelect.length; j++) {
      if (elementsSelect[j].classList.contains(this.classEdit)) {
        elementsSelect[j].disabled = true;
      } else {
        elementsSelect[j].disabled = false;
      }
    }
  }

  /**
   * The `enableFormAll` function enables all input and select elements within a form.
   */
  enableFormAll(position = 0) {
    var elementsInput = this.myForm[position].querySelectorAll('input');
    var elementsSelect = this.myForm[position].querySelectorAll('select');
    for (let i = 0; i < elementsInput.length; i++) {
      elementsInput[i].disabled = false;
    }
    for (let j = 0; j < elementsSelect.length; j++) {
      elementsSelect[j].disabled = false;
    }
  }

  /**
   * The `resetForm` function clears the input values of all input fields and select elements within a
   * form and resets the form.
   */
  resetForm(position = 0) {
    var elementsInput = this.myForm[position].querySelectorAll('input');
    var elementsSelect = this.myForm[position].querySelectorAll('select');
    for (let i = 0; i < elementsInput.length; i++) {
      elementsInput[i].value = "";
    }
    for (let j = 0; j < elementsSelect.length; j++) {
      elementsSelect[j].value = "";
    }
    this.myForm[position].reset();
  }

  /**
   * The function `getDataFormJson` retrieves form data from input and select elements and returns it
   * as a JSON object.
   * @returns The `getDataFormJson()` function returns an object containing the data from the form
   * elements with IDs in the `myForm` element. The object includes key-value pairs where the key is
   * the ID of the form element and the value is the trimmed value of the form element (or the checked
   * status for checkboxes).
   */
  getDataFormJson(position = 0) {
    var elementsForm = this.myForm[position].querySelectorAll('input, select');
    let getJson = {};
    elementsForm.forEach(function (element) {
      if (element.id) {
        if (element.tagName === 'INPUT') {
          if (element.type === 'checkbox') {
            getJson[element.id] = element.checked;
          } else {
            getJson[element.id] = element.value.trim();
          }
        } else if (element.tagName === 'SELECT') {
          getJson[element.id] = element.value.trim();
        }
      }
    });
    return getJson;
  }

  /**
   * The function `getDataFormData` retrieves data from form elements and appends it to a FormData
   * object.
   * @returns The `getDataFormData()` function is returning the `fromData` object after populating it
   * with the data from the form elements.
   */
  getDataFormData(position = 0) {
    var elementsForm = this.objForm[position].querySelectorAll('input, select');
    elementsForm.forEach(function (element) {
      if (element.id) {
        if (element.tagName === 'INPUT') {
          if (element.type === 'checkbox') {
            this.fromData.append(element.id, element.checked);
          } else {
            this.fromData.append(element.id, element.value.trim());
          }
        } else if (element.tagName === 'SELECT') {
          this.fromData.append(element.id, element.value.trim());
        }
      }
    });
    return this.fromData;
  }

  /**
   * The function `setDataFormJson` populates form input fields with values from a JSON object based on
   * element IDs.
   * @param json - The `json` parameter in the `setDataFormJson` function is expected to be a JavaScript
   * object that contains key-value pairs where the keys correspond to the `id` attributes of form
   * elements (input fields or select dropdowns) and the values are the data that should be set in those
   * form elements
   */
  setDataFormJson(json, position = 0) {

    let elements = this.myForm[position].querySelectorAll("input,select");
    let jsonKeys = Object.keys(json);
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].type == "checkbox") {
        if (jsonKeys.includes(elements[i].id)) {
          elements[i].checked = (json[elements[i].id] == 0) ? false : true;
        }
      } else if (elements[i].tagName === 'SELECT') {
        if (jsonKeys.includes(elements[i].id)) {
          elements[i].value = json[elements[i].id];
          elements[i].selected = true;
        }
      } else {
        if (jsonKeys.includes(elements[i].id)) {
          elements[i].value = json[elements[i].id];
        }
      }

    }
  }

  /**
   * The function `setValidateForm` validates form inputs and selects, displaying error messages and
   * focusing on the first invalid field if necessary.
   * @returns The `setValidateForm()` function returns either `true` if the form is valid or `false` if
   * the form is not valid.
   */
  setValidateForm(position = 0) {
    const objForm = this.myForm[position];
    const inputs = objForm.querySelectorAll('input');
    const selects = objForm.querySelectorAll('select');
    let formValidate = true;
    for (const input of inputs) {
      if (!this.validateInput(input)) {
        formValidate = false;
        this.showMessageError(input);
      }
    }
    for (const select of selects) {
      if (select.value == 0) {
        formValidate = false;
        select.focus();
      }
    }
    if (formValidate) {
      this.hiddenMessageError();
      return true;
    } else {
      return false;
    }
  }
  /**
   * The function `validateInput` determines the type of input and calls the corresponding validation
   * function.
   * @param input - The `input` parameter seems to be an object with a `type` property that determines
   * the type of validation to be performed. The `validateInput` function then calls different
   * validation functions based on the `type` of input. The possible types of input for validation are
   * 'text', 'email',
   * @returns The `validateInput` function returns the result of calling a specific validation function
   * based on the input type. If the input type is 'text', it calls `validateText(input)`, if it is
   * 'email', it calls `validateEmail(input)`, if it is 'password', it calls `validatePassword(input)`,
   * if it is 'number', it calls `validateNumber(input)`. If
   */
  validateInput(input) {
    const type = input.type;
    switch (type) {
      case 'text':
        return this.validateText(input);
      case 'email':
        return this.validateEmail(input);
      case 'password':
        return this.validatePassword(input);
      case 'number':
        return this.validateNumber(input);
      default:
        return true;
    }
  }

  /**
   * The function `validateText` checks if the input value is not empty, not just whitespace, and has a
   * length of at least 4 characters.
   * @param input - The `input` parameter in the `validateText` function seems to be an object with a
   * `value` property. The function checks if the `value` property is an empty string, consists only of
   * whitespace characters, or has a length less than 4. If any of these conditions are met
   * @returns The `validateText` function returns `true` if the input value is not empty, not just
   * whitespace, and has a length of at least 4 characters. Otherwise, it returns `false`.
   */
  validateText(input) {
    if (input.value === '' || input.value.trim === '' || input.value.length < 4) {
      return false;
    }
    return true;
  }

  /**
   * The function `validateEmail` uses a regular expression to check if the input value is a valid email
   * address.
   * @param input - The `input` parameter in the `validateEmail` function seems to be an object with a
   * `value` property. The function uses a regular expression to validate whether the value of the
   * `input` object matches the pattern of a valid email address. If the value passes the validation,
   * the function returns
   * @returns The `validateEmail` function is returning a boolean value indicating whether the input
   * value matches the email regex pattern. If the input value is a valid email address according to the
   * regex pattern, the function will return `true`, otherwise it will return `false`.
   */
  validateEmail(input) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(input.value);
  }
  /**
   * The function `validatePassword` checks if the length of the input password is at least 8
   * characters and returns true if it meets the criteria, otherwise false.
   * @param input - The `input` parameter in the `validatePassword` function seems to be an object with
   * a `value` property. The function checks if the length of the `value` is less than 8 characters and
   * returns `false` if it is, indicating that the password is not valid. Otherwise,
   * @returns The function `validatePassword` is returning `true` if the length of the input value is
   * at least 8 characters, and `false` otherwise.
   */
  validatePassword(input) {
    if (input.value.length < 8) {
      return false;
    }
    return true;
  }
  /**
   * The function `validateNumber` checks if the input value is a number in JavaScript.
   * @param input - The `input` parameter in the `validateNumber` function seems to be an object with a
   * `value` property. The function checks if the `value` property of the `input` object is a valid
   * number using the `isNaN` function. If the value is not a number, the function
   * @returns The function `validateNumber` is returning `true` if the input value is a number, and
   * `false` if it is not a number.
   */
  validateNumber(input) {
    if (isNaN(input.value)) {
      return false;
    }
    return true;
  }
  /**
   * The function `showMessageError` adds an error class to an input element and appends a message
   * indicating that the field is invalid.
   * @param input - The `input` parameter in the `showMessageError` function is typically a reference
   * to an HTML input element that needs to display an error message. The function adds a CSS class
   * 'error' to the input element to visually indicate an error, and then creates a new `span` element
   * to display
   */
  showMessageError(input) {
    input.classList.add('error');
    const messageError = document.createElement('span');
    messageError.classList.add('message-error');
    messageError.textContent = 'This field is invalid';
    input.parentNode.appendChild(messageError);
  }
  /**
   * The `hiddenMessageError` function clears the inner HTML content of all elements with the class
   * name 'message-error'.
   */
  hiddenMessageError() {
    const message = document.querySelectorAll('.message-error');
    for (let data of message) {
      data.innerHTML = "";
    }
  }

  /**
   * The function `createTable` generates an HTML table based on the provided data, with optional actions
   * for each row.
   * @param data - The `data` parameter in the `createTable` function is an array of objects. Each object
   * represents a row of data to be displayed in the table. Each key-value pair in the object represents
   * a column in the table, where the key is the column name and the value is the data to
   * @param id - The `id` parameter in the `createTable` function is used to specify the id of the HTML
   * element where the table will be created. This function dynamically generates a table based on the
   * data provided and populates it within the HTML element identified by the `id` parameter.
   * @param actions - The `actions` parameter in the `createTable` function is a boolean value that
   * determines whether action buttons should be displayed in each row of the table. If `actions` is
   * `true`, action buttons for showing, editing, and deleting the corresponding row entry will be
   * included in the table. If
   */
  createTable(data, id, actions) {
    const objTable = document.getElementById(id);
    objTable.innerHTML = "";
    let tds = "";
    let tr = "";
    for (let i = 0; i < Object.keys(data).length; i++) {
      let obj = Object.entries(data[i]);
      tds = "";
      for (let j = 0; j < obj.length; j++) {
        tds += `<td>${obj[j][1]}</td>`;
      }
      if (actions) {
        tds += `<td class="text-center">
<div class="btn-group" role="group" aria-label="Basic mixed styles example">
<button type="button" title="Show" class="btn btn-warning" onclick="${LIST_CRUD[5]}(${obj[0][1]})"><i class="${LIST_CRUD_ICONS[5]}"></i></button>
<button type="button" title="Edit" class="btn btn-success" onclick="${LIST_CRUD[1]}(${obj[0][1]})"><i class="${LIST_CRUD_ICONS[1]}"></i></button>
<button type="button" title="Delete" class="btn btn-danger" onclick="${LIST_CRUD[3]}(${obj[0][1]})"><i class="${LIST_CRUD_ICONS[3]}"></i></button>
</div>
</td>`;
      }
      tr += "<tr>" + tds + "</tr>";
      tds = "";
    }
    objTable.innerHTML = tr;
    tr = "";
  }

  /**
   * The function `createSelect` populates a select element with options based on data provided.
   * @param data - An object containing key-value pairs that will be used to populate the select dropdown
   * options.
   * @param id - The `id` parameter is the id of the HTML select element where you want to populate the
   * options dynamically using the `createSelect` function.
   */
  createSelect(data, id) {
    const objSelect = document.getElementById(id);
    objSelect.innerHTML = "";
    let options = '<option selected value="">Open this select menu</option>';
    for (let i = 0; i < Object.keys(data).length; i++) {
      let obj = Object.entries(data[i]);
      options += `<option value="${obj[0][1]}">${obj[1][1]}</option>`;
    }
    objSelect.innerHTML = options;
    options = "";
  }

  createCard(data, id) {
    const objContainerCard = document.getElementById(id);
    objContainerCard.innerHTML = "";
    let card = "";

    for (let i = 0; i < Object.keys(data).length; i++) {
      let obj = Object.entries(data[i]);

      card += `<div  style="margin: 0.28em !important;" class="card col-3 mx-auto">
      <img src="https://t3.ftcdn.net/jpg/06/50/85/90/360_F_650859089_x8aWFsiOw5vpE1h936uAMu7UmXmxPcw2.jpg" class="img img-fluid card-img-top " alt="...">
      <div class="card-body">
        <h5 class="card-title">${obj[1][1]}</h5>
        <p class="card-text">${obj[2][1]}.</p>
        <p class="card-text">${obj[3][1]}</p>
        <a href="#" onclick="alert(${obj[0][1]})" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>`;
    
    }
    objContainerCard.innerHTML = card;
    card = "";
  }

}