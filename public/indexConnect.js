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

// {
//     "sectionId": 174026,
//     "courseId": 2054,
//     "sectionName": "11",
//     "courseCredit": 3,
//     "courseCode": "CSE111",
//     "sectionType": "OTHER",
//     "capacity": 38,
//     "consumedSeat": 0,
//     "semesterSessionId": null,
//     "parentSectionId": null,
//     "faculties": "TMD",
//     "roomName": "07F-22C",
//     "roomNumber": "07F-22C",
//     "academicDegree": "UNDERGRADUATE",
//     "sectionSchedule": {
//       "classPairId": null,
//       "classSlotId": null,
//       "finalExamDate": "2025-05-19",
//       "finalExamStartTime": "11:00:00",
//       "finalExamEndTime": "13:00:00",
//       "midExamDate": "2025-03-19",
//       "midExamStartTime": "11:00:00",
//       "midExamEndTime": "13:00:00",
//       "finalExamDetail": "May 19, 2025 11:00 AM - 1:00 PM",
//       "midExamDetail": "Mar 19, 2025 11:00 AM - 1:00 PM",
//       "classStartDate": "2025-02-04",
//       "classEndDate": "2025-05-15",
//       "classSchedules": [
//         {
//           "startTime": "12:30:00",
//           "endTime": "13:50:00",
//           "day": "MONDAY"
//         },
//         {
//           "startTime": "12:30:00",
//           "endTime": "13:50:00",
//           "day": "WEDNESDAY"
//         }
//       ]
//     },
//     "labSchedules": [
//       {
//         "startTime": "08:00:00",
//         "endTime": "10:50:00",
//         "day": "TUESDAY"
//       }
//     ],
//     "labRoomName": "09B-10L"
//   }

// A function to convert time from 24 hour format to 12 hour format if applicable, has hours, minutes, seconds. Remove the seconds
function convertTime24to12(time24) {
    let [hours, minutes, seconds] = time24.split(':');
    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
}

async function execute() {
        let usisdata = await fetch("https://usis-cdn.eniamza.com/connect.json");
        usisdata = await usisdata.json();
        // let lastUpdated = usisdata.lastUpdated;
        // const formattedTime = formatTimestamp(lastUpdated);
        // usisdata = usisdata.data;

        usisdata.sort(function(a, b) {
            let courseA = `${a.courseCode}-${a.sectionName}`;
            let courseB = `${b.courseCode}-${b.sectionName}`;
            return courseA.localeCompare(courseB);
        });
    
        console.log(usisdata);
    
        let table = document.getElementById("table");

        table.querySelectorAll("tr:not(:first-child)").forEach(row => row.remove());

        // let lastUpdatedElement = document.getElementById("lastUpdatedTime");
        // lastUpdatedElement.innerText = `Last Updated: ${formattedTime}`;
    
        usisdata.forEach(element => {

            // const classScheduleArray = element.classSchedule.split(/,\s*/);
            // const classLabScheduleArray = element.classLabSchedule.split(/\n/);
            let classScheduleArray = []
            let labScheduleArray = []
            if(element.sectionSchedule !== null){
                classScheduleArray = element.sectionSchedule.classSchedules.map(schedule => {
                    return `${schedule.day} ${convertTime24to12(schedule.startTime)} - ${convertTime24to12(schedule.endTime)}`;
                });
                
            }

            if(element.labSchedules !== null){
                labScheduleArray = element.labSchedules.map(schedule => {
                    return `${schedule.day} ${convertTime24to12(schedule.startTime)} - ${convertTime24to12(schedule.endTime)}`;
                });
            }
    

            let preReq = element.prerequisiteCourses
            // (CSE110) OR (CSE161) OR (EEE103) OR (ECE103) , Alternatively (CSE111 AND CSE230) Or it might be (CSE110)
            if (element.prerequisiteCourses !== null){
                if (element.prerequisiteCourses.includes("AND")){
                    preReq = element.prerequisiteCourses.split("AND").map(item => {
                        return item.replace("(","").replace(")","")
                    }).join("+\n")
                }
                else if (element.prerequisiteCourses.includes("OR")){
                    preReq = element.prerequisiteCourses.split("OR").map(item => {
                        return item.replace("(","").replace(")","")
                    }).join("/\n")
                }
                else {
                    preReq = element.prerequisiteCourses.replace("(","").replace(")","")
                }
            }
            else {
                preReq = ""
            }

            let courseDetails = `${element.courseCode}-[${element.sectionName}]`
            let finalExamDetail = ""
            console.log(element)
            if (element.sectionSchedule !== null){
                finalExamDetail = element.sectionSchedule.finalExamDetail
            } else {
                finalExamDetail = "Not Available"
            }
    
            let tr = document.createElement("tr");
    
            let values = [
                courseDetails,
                element.faculties,
                preReq,
                element.capacity,
                element.consumedSeat,
                `${element.capacity - element.consumedSeat}`,
                classScheduleArray.join("\n"), //Class Schedule 
                labScheduleArray.join("\n"), //Lab Schedule
                finalExamDetail
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

    // Reapply the search filter after updating the table
    searchTable();
    }
    
    function startPeriodicFetch() {
        execute(); // Initial fetch
        setInterval(execute, 120000); // Fetch every 60 seconds
    }
    
    startPeriodicFetch();
    
