
    let data = fetch('http://localhost:3000/students', {
        method: 'GET',
    })
        .then(response => response.json());
    addContent(data)
console.log(data)

function addContent(listInfo) {
    const main = document.getElementById("table-content");

    listInfo.forEach(function (item, index) {
        const row = main.insertRow(1 + index);
        const shortObject = {
            name: item.students.firstNameStudent, 
            lastName: item.students.lastNameStudent,
            day: item.students.dateBirthday,
            phone: item.students.phone,
            email: item.students.email,
            idNumber: item.students.idNumber,
            work: item.students.work,
        };
        console.log(listInfo)
        
        Object
            .values(shortObject)
            .forEach((propertyValue, propertyIndex) => {
                const propertyRow = row.insertCell(propertyIndex);
                propertyRow.innerHTML = propertyValue; 
            });
    })

};
