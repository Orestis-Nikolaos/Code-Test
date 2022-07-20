$("#hidden").hide();

function generate_year_range(start, end) {
    var years = "";
    for (var year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");


createYear = generate_year_range(1970, 2050);
/** or
 * createYear = generate_year_range( 1970, currentYear );
 */

document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');

var months = "";
var days = "";

var monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

if (lang == "en") {
    months = monthDefault;
    days = dayDefault;
}

var $dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";

//alert($dataHead);
document.getElementById("thead-month").innerHTML = $dataHead;


monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);



function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);

    if ($("#month > option:selected").val() == 3 ||
        $("#month > option:selected").val() == 5 ||
        $("#month > option:selected").val() == 8 ||
        $("#month > option:selected").val() == 10
    ) {
        $("#hide").hide();
    }
    else {
        $("#hide").show();
    }


    if ($("#month > option:selected").val() == 1 && !($("#year > option:selected").val() % 4 == 0 || ($("#year > option:selected").val() % 100 == 0 && $("#year > option:selected").val() % 400 == 0))) {
        $(".hideFeb").hide();
    }
    else if ($("#month > option:selected").val() == 1 && ($("#year > option:selected").val() % 4 == 0 || ($("#year > option:selected").val() % 100 == 0 && $("#year > option:selected").val() % 400 == 0))) {
        $(".hideFeb").hide();
        $("#showLeap").show();
    }
    else if ($("#month > option:selected").val() == 3 ||
        $("#month > option:selected").val() == 5 ||
        $("#month > option:selected").val() == 8 ||
        $("#month > option:selected").val() == 10
    ) {
        $("#showLeap").show();
        $("#showEx").show();
    }

}

function showCalendar(month, year) {

    var firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar-body");


    tbl.innerHTML = "";


    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    var date = 1;
    for (var i = 0; i < 6; i++) {

        var row = document.createElement("tr");


        for (var j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span>";

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.className = "date-picker selected";
                }
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row);
    }

}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}




$("#create").click(function () {

    let title = $("#Title").val();
    let desc = $("#Description").val();
    let hour1 = parseInt($("#hour").val()) + 3;
    let year1 = parseInt($("#year").val());
    let month1 = parseInt($("#month").val());
    let day1 = parseInt($("#day").val()) + 1;
    let date1 = new Date(year1, month1, day1, hour1);
    let date2 = date1.toISOString();



    if (title == "" || desc == "") {
        alert("Title and description must not be empty")
        return false
    }

    else {

        var settings = {
            "url": "https://api.corvium.com/api/1.0.0/test/events/62d2817bbe594138ed60bfea/new ",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "event_name": title, "event_description": desc, "event_date": date2, "created_by": "62d2817bbe594138ed60bfea"
            }),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);

        });
    }
})








$("#list").click(function () {

    $("#hidden tr").remove();

    let hour1 = parseInt($("#hour").val()) + 3;
    let year1 = parseInt($("#year").val());
    let month1 = parseInt($("#month").val());
    let day1 = parseInt($("#day").val()) + 1;
    let date1 = new Date(year1, month1, day1, hour1);
    let date2 = date1.toISOString();


    var settings = {
        "url": "https://api.corvium.com/api/1.0.0/test/events/62d2817bbe594138ed60bfea/list",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({ "limit": 100, "sort": "created_at" }),
    };

    $.ajax(settings).done(function (response) {

        buildTable(response.return.docs)

        $("#hidden").show();

        function buildTable(data) {
            var table = document.getElementById('myTable')
            for (var i = 0; i < data.length; i++) {
                if (data[i].event_date == date2) {
                    var row = `<tr>
                                <td>${data[i].event_name}</td>
                                <td>${data[i].event_description}</td>
                                <td>${data[i].event_date}</td>
                          </tr>`
                    table.innerHTML += row
                }
            }
        }
    });

})








$("#update").click(function () {


    let title = $("#Title").val();
    let desc = $("#Description").val();
    let hour1 = parseInt($("#hour").val()) + 3;
    let year1 = parseInt($("#year").val());
    let month1 = parseInt($("#month").val());
    let day1 = parseInt($("#day").val()) + 1;
    let date1 = new Date(year1, month1, day1, hour1);
    let date2 = date1.toISOString();
    let match2;
    let update1 = $("#UpdateName").val();
    let update2 = $("#UpdateDescription").val();



    var settings = {
        "url": "https://api.corvium.com/api/1.0.0/test/events/62d2817bbe594138ed60bfea/list",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({ "limit": 100, "sort": "created_at" }),
    };


    $.ajax(settings).done(function (response) {

        let match1 = getMatch(response.return.docs);

        function getMatch(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].event_name == title && data[i].event_date == date2) {
                    match = data[i]._id
                }
            }
            return match
        }
        $("h3").append("<p id ='read'></p>")

        $("#read").html(match1);
    });

    match2 = $("#read").text();
    $("#read").hide()




    var settings = {
        "url": "https://api.corvium.com/api/1.0.0/test/events/62d2817bbe594138ed60bfea/" + match2,
        "method": "PUT",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "event_name": update1, "event_description": update2, "event_date": date2, "created_by": "62d2817bbe594138ed60bfea"
        }),
    };


    $.ajax(settings).done(function (response) {
        console.log(response);

    });


})



//HAS A SMALL BUG MAYBE FIX LATER


$("#delete").click(function () {

    let title = $("#Title").val();
    let desc = $("#Description").val();
    let hour1 = parseInt($("#hour").val()) + 3;
    let year1 = parseInt($("#year").val());
    let month1 = parseInt($("#month").val());
    let day1 = parseInt($("#day").val()) + 1;
    let date1 = new Date(year1, month1, day1, hour1);
    let date2 = date1.toISOString();
    let match2;



    var settings = {
        "url": "https://api.corvium.com/api/1.0.0/test/events/62d2817bbe594138ed60bfea/list",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({ "limit": 100, "sort": "created_at" }),
    };


    $.ajax(settings).done(function (response) {

        let match1 = getMatch(response.return.docs);

        function getMatch(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].event_name == title && data[i].event_date == date2) {
                    match = data[i]._id
                }
            }
            return match
        }
        $("h3").append("<p id ='read'></p>")

        $("#read").html(match1);
    });

    match2 = $("#read").text();
    $("#read").hide()

    var settings = {
        "url": "https://api.corvium.com/api/1.0.0/test/events/62d2817bbe594138ed60bfea/" + match2,
        "method": "DELETE",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMDE2IiwibmFtZSI6ImlBbGVydCBEZXZlbG9wZXIiLCJhZG1pbiI6dHJ1ZX0.2akYsCOtrsocM1UXPsoXbLjqwlc1X22lHCCcAqaNCo8",
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "event_name": title, "created_by": "62d2817bbe594138ed60bfea"
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);

    });

})