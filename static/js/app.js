function setPagination(direction) {
    var $button = $(direction);
    $button.on('click', function() {
        var url = $button.data('url');
        $.getJSON(url, function(data) {
            showPlanets(data)
        });
    })
}

function showPlanets(data) {
    var htmlString = "";
    data.results.forEach(function (planet) {

        htmlString += "<tr>" +
            "<td>" + planet.name + "</td>" +
            "<td>" + planet.diameter + " km</td>" +
            "<td>" + planet.climate + "</td>" +
            "<td>" + planet.gravity + "</td>" +
            "<td>" + planet.terrain + "</td>" +
            "<td>" + planet.surface_water + " %</td>" +
            "<td>" + planet.population + " people</td>";
        if (planet.residents.length > 0) {
            htmlString += "<td><button class='resident-button' data-toggle='modal' " +
            "data-target='#resident-modal' data-planet='" + planet.name +
            "'  data-resident-list='" + planet.residents +
            "'>"+ planet.residents.length + " residents</button></td>" + "</tr>"
        } else {
            htmlString += "<td>No known residents</td></tr>"
        }

    });

    $('#table-body').html(htmlString);
    $('#next').data("url", data.next);
    $('#prev').data("url", data.previous);
}

function showResidents(residentList, planet) {
    if (residentList !== undefined) {
    var htmlString = "";
    var residents = residentList.split(',');
    residents.forEach(function (residentURL) {
        $.getJSON(residentURL, function (response) {
            var resident = response;
            htmlString += "<tr>" +
                "<td>" + resident.name + "</td>" +
                "<td>" + resident.height + "</td>" +
                "<td>" + resident.mass + "</td>" +
                "<td>" + resident.hair_color + "</td>" +
                "<td>" + resident.skin_color + "</td>" +
                "<td>" + resident.eye_color + "</td>" +
                "<td>" + resident.birth_year + "</td>" +
                "<td>" + resident.gender + "</td>" +
                "</tr>";
            $('#resident-table').html(htmlString);
        })
    });
    $('#residents-title').html("Residents of " + planet);
    $('#resident-modal').modal('show');
}}

function getResidents() {
    $('#resident-modal').on('show.bs.modal', function (event) {
        var residentButton = $(event.relatedTarget);
        var residentList = residentButton.data("resident-list");
        if (residentList !== "") {
            showResidents(residentList, residentButton.data("planet"))
        }
    });
}

$( document ).ready( function() {
    $.getJSON('http://swapi.co/api/planets', function(data) {
        showPlanets(data)
    });
    setPagination('#next');
    setPagination('#prev');
    getResidents();
    }
);
