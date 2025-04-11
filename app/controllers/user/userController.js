//Constantes
const formId = 'my-form';
const modalId = 'my-modal';
const model = 'users';
const tableId = '#table-index';
const preloadId = 'preloadId';
const classEdit = 'edit-input';
const textConfirm = 'Press a button!\nEither OK or Cancel';
const btnSubmit = document.getElementById('btnSubmit');
const mainApp = new Main(modalId, formId, classEdit, preloadId);

//Variables
var insertUpdate = true;
var url = "";
var method = "";
var data = "";
var resultFetch = null;

//Window
window.addEventListener('load', (event) => {
  show();
});

//Function 'showStatus'
function showId(id) {
  mainApp.disabledFormAll();
  mainApp.resetForm();
  btnEnabled(true);
  getDataId(id);
}

//Function 'show'
function show() {
  mainApp.disabledFormAll();
  mainApp.resetForm();
  btnEnabled(true);
  getUsers();
}

//Function 'newStatus'
function add() {
  mainApp.enableFormAll();
  mainApp.resetForm();
  mainApp.hiddenMessageError();
  insertUpdate = true;
  btnEnabled(false);
  mainApp.showModal();
}

//Function 'editStatus'
function edit(id) {
  mainApp.disabledFormEdit();
  mainApp.resetForm();
  insertUpdate = false;
  btnEnabled(false);
  getDataId(id);
}

//Function 'deleteStatus'
async function delete_(id) {
  if (confirm(textConfirm)== true) {
    method = 'DELETE';
    url = URL + URI_USER + id;
    data = "";
    resultFetch = getData(data, method, url);
    resultFetch.then(response => response.json())
      .then(data => {
        console.log(data);
        //Set data form
        reloadPage();
        mainApp.hiddenPreload();
      })
      .catch(error => {
        console.error(error);
        //Hidden Preload
        mainApp.hiddenPreload();
      })
      .finally();
  } else {
  }
}

//Function 'get by id'
async function getDataId(id) {
  method = 'GET';
  url = URL + URI_USER + id;
  data = "";
  resultFetch = getData(data, method, url);
  resultFetch.then(response => response.json())
    .then(data => {
      //Set data form
      mainApp.setDataFormJson(data);
      //Show Modal
      mainApp.showModal();
      //Hidden Preload
      mainApp.hiddenPreload();
    })
    .catch(error => {
      console.error(error);
      //Hidden Preload
      mainApp.hiddenPreload();
    })
    .finally();
}

//Function getUsers
async function getUsers() {
  method = 'GET';
  url = URL + URI_USER;
  data = mainApp.getDataFormJson();
  
  resultFetch = getData(data, method, url);
  resultFetch.then(response => response.json())
    .then(data => {
      //Create table
      mainApp.createTable(data, 'tbody', true);
      refreshTable();
      //Hidden Preload
      mainApp.hiddenPreload();
    })
    .catch(error => {
      //Hidden Preload
      mainApp.hiddenPreload();
    })
    .finally();
}

//Function 'Refresh Table'
function refreshTable() {
  $(tableId).DataTable();
}

//Function 'Btn Enbled'
function btnEnabled(type) {
  btnSubmit.disabled = type;
}

//Function getData
async function getData(data, method, url) {
  var parameters;
  //Show Preload
  mainApp.showPreload();
  if (method == 'GET') {
    parameters = {
      method: method,
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpResquest"
      }
    }
  } else {
    parameters = {
      method: method,
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpResquest"
      }
    }
    if (data != "") {
      parameters.body = JSON.stringify(data);
    }
  }
  return await fetch(url, parameters);
}

//Method getForm
mainApp.getForm().addEventListener('submit', async function (event) {
  event.preventDefault();
  if (mainApp.setValidateForm()) {
    //Show Preload
    mainApp.showPreload();
    if (insertUpdate) {
      method = 'POST';
      url = URL + URI_USER;
      data = mainApp.getDataFormJson();
      resultFetch = getData(data, method, url);
      resultFetch.then(response => response.json())
        .then(data => {
          //Show Modal
          mainApp.hiddenModal();
          //Reload View
          reloadPage();
        })
        .catch(error => {
          console.error(error);
          //Hidden Preload
          mainApp.hiddenPreload();
        })
        .finally();
    } else {
      method = 'PUT';
      data = mainApp.getDataFormJson();
      url = URL + URI_USER + data.id;
      resultFetch = getData(data, method, url);
      resultFetch.then(response => response.json())
        .then(data => {
          //Show Modal
          mainApp.hiddenModal();
          //Reload View
          reloadPage();
        })
        .catch(error => {
          console.error(error);
          //Hidden Preload
          mainApp.hiddenPreload();
        })
        .finally();
    }
  } else {
    alert('Data Validate');
    mainApp.resetForm();
  }
});

//Function 'reloadPage'
function reloadPage() {
  setTimeout(function() {
    //Hidden Preload
    mainApp.hiddenPreload();
    location.reload();
  }, 500);
}