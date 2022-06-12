function getFormData(form) {
    const formData = new FormData(form);
    const res = {};
     Array.from(formData.keys()).forEach(key => {
        res[key] = formData.getAll(key);
     });
    return res;
}


function useXmlHttpRequest(data) {
    const request = new XMLHttpRequest();
    request.open('POST', ' http://localhost:3000/students');
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
    request.onloadend = () => {

    }
}

window.addEventListener('load', () => {
    const studentForm = document.forms.studentForm;
    studentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = getFormData(document.forms.studentForm);
        document.getElementById('sended-data').innerText = JSON.stringify(data);
        // useXmlHttpRequest(data);
    })
    const studentFormSubmit = document.getElementById('studentFormSubmit');

});