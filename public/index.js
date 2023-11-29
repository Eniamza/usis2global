async function execute() {
        let usisdata = await fetch("https://usis-cdn.eniamza.com/usisdump.json");
        usisdata = await usisdata.json();
        usisdata.sort(function(a, b) {
            return a.courseCode.localeCompare(b.courseCode);
        });
    
        console.log(usisdata[0]);
    
        let table = document.getElementById("table");
    
        usisdata.forEach(element => {

            const classScheduleArray = element.classSchedule.split(/,\s*/);
            const classLabScheduleArray = element.classLabSchedule.split(/,\s*/);
    

            const filteredLabSchedule = classLabScheduleArray.filter(labSchedule => {
                return !classScheduleArray.includes(labSchedule);
            });
    
            let tr = document.createElement("tr");
    
            let values = [
                element.courseDetails,
                element.empShortName,
                element.defaultSeatCapacity,
                element.totalFillupSeat,
                element.availableSeat,
                classScheduleArray.join("\n"),
                filteredLabSchedule.join("\n")
            ];
    
            values.forEach(item => {
                let td = document.createElement("td");
                let classesAdd = ["border-2","border-gray-400","text-center","p-3"]
                td.classList.add(...classesAdd)

                td.innerText = item;
                tr.appendChild(td);
            });
    
            table.appendChild(tr);
        });
    }
    
    execute();
    