$(document).ready(function () {
    $("#chart").kendoChart({
        title: {
            position: "bottom",
            text: "Hobby Percentage"
        },
        legend: {
            visible: false
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            labels: {
                visible: true,
                background: "transparent",
                template: "#= category #: \n #= value#%"
            }
        },
        series: [{
            type: "pie",
            startAngle: 150,
            data: [{
                category: "Singing",
                value: 9.72,
                color: "#9de219"
            },
                {
                category: "Dancing",
                value: 8.75,
                color: "#90cc38"
                },
                {
                category: "Watching",
                value: 8.1,
                color: "#068c35"
                },
                {
                category: "Reading",
                value: 11.34,
                color: "#006634"
                },
                {
                category: "Swimming",
                value: 11.66,
                color: "#004d38"
                },
                {
                category: "Browsing",
                value: 11.83,
                color: "#033939"
                },
                {
                    category: "Trekking",
                    value: 10.21,
                    color: "#FF0000"
                },
                {
                    category: "Skating",
                    value: 9.23,
                    color: "#800000"
                },
                {
                    category: "Studying",
                    value: 9.4,
                    color: "#000080"
                },
                {
                    category: "Cooking",
                    value: 9.76,
                    color: "#FF00FF"
                }]
        }],
        tooltip: {
            visible: true,
            format: "{0}%"
        }
    });



});