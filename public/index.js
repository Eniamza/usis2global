function formatTimestamp(isoString) {
    // Parse the ISO 8601 timestamp into a Date object
    const date = new Date(isoString);

    // Extract individual components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Format into a standard time format string
    return `${hours}:${minutes} , ${year}-${month}-${day}`;
}

// Example usage



async function execute() {
        let usisdata = await fetch("https://usis-cdn.eniamza.com/old-usisdump.json");
        usisdata = await usisdata.json();
        let lastUpdated = usisdata.lastUpdated;
        const formattedTime = formatTimestamp(lastUpdated);
        usisdata = usisdata.data;
        usisdata.sort(function(a, b) {
            return a.courseDetails.localeCompare(b.courseDetails);
        });
    
        console.log(usisdata[0]);
    
        let table = document.getElementById("table");

        let lastUpdatedElement = document.getElementById("lastUpdatedTime");
        lastUpdatedElement.innerText = `Last Updated: ${formattedTime}`;
    
        usisdata.forEach(element => {

            // const classScheduleArray = element.classSchedule.split(/,\s*/);
            // const classLabScheduleArray = element.classLabSchedule.split(/\n/);
            const classScheduleArray = element.classSchedule.split(/\n/);
    

            // const filteredLabSchedule = classLabScheduleArray.filter(labSchedule => {
            //     return !classScheduleArray.includes(labSchedule);
            // });

            let preReq = element.preRequisiteCourses
            preReq = preReq.replaceAll(",","\n")
    
            let tr = document.createElement("tr");
    
            let values = [
                element.courseDetails,
                preReq,
                element.empShortName,
                // preReq,
                element.defaultSeatCapacity,
                element.totalFillupSeat,
                element.availableSeat,
                element.classSchedule,
                element.LabSchedule,
                element.dayNo
            ];
    
            values.forEach(item => {
                let td = document.createElement("td");
                let classesAdd = ["break-words","border-2","border-gray-400","text-center","p-3"]
                td.classList.add(...classesAdd)

                td.innerText = item;
                tr.appendChild(td);
            });
    
            table.appendChild(tr);
        });
    }
    
    execute();
    
