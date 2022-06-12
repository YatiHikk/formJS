(async () => {
    let data = await fetch("data.json")
        .then(response => response.json());
    addContent(data)
})();

function addContent(listInfo) {
    const main = document.getElementById("table-content");

    listInfo.forEach(function (item, index) {
        const row = main.insertRow(1 + index);
        const shortObject = {
            owner: `${item.person.firstname} ${item.person.lastname}`,
            manufacturer: item.car.manufacturer,
            model: item.car.model,
            year: item.car.year,
        };
        
        Object
            .values(shortObject)
            .forEach((propertyValue, propertyIndex) => {
                const propertyRow = row.insertCell(propertyIndex);
                propertyRow.innerHTML = propertyValue; 
            });
    })

};
