async function execute(){
        let usisdata = await fetch("https://usis-cdn.eniamza.com/usisdump.json");
        usisdata = await usisdata.json() 
        usisdata.sort(function(a, b) {
                return a.courseCode.localeCompare(b.courseCode);
             });

        console.log(usisdata[0])

        let table = document.getElementById("table")

        let getFirstObjectKeys = Object.keys(usisdata[0])
        let wantedHeaderKeys = ["courseDetails","empShortName","defaultSeatCapacity","totalFillupSeat","availableSeat"]

        usisdata.forEach(element => {

                let tr = document.createElement("tr")

                let values = [
                        element.courseDetails,
                        element.empShortName,
                        element.defaultSeatCapacity,
                        element.totalFillupSeat,
                        element.availableSeat,
                        element.classSchedule,
                        element.classLabSchedule
                ]
                
                values.forEach(item => {
                        let td = document.createElement("td")
                        td.innerText = String(item).replaceAll(",","\n")
                        tr.appendChild(td)
                })

                table.append(tr)
        });


        




}



execute()