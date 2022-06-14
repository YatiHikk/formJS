(async () => {
    const data = await fetch('http://localhost:3000/students', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json());
    addContent(data);
})();

function addContent(listInfo) {
    const main = document.getElementById("table-content");

    listInfo.forEach(function (item, index) {
        const row = main.insertRow(1 + index);
        const shortObject = {
            name: item.firstNameStudent, 
            lastName: item.lastNameStudent,
            day: item.dateBirthday,
            phone: item.phone,
            email: item.email,
            idNumber: item.idNumber,
            work: item.work,
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
