$(document).ready(function () {
    $("#chart").kendoChart({
        title: {
            text: "Percentage of Students Placed and Unplaced branch wise"
        },
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: "column",
            stack: {
                type: "100%"
            }
        },
        series: [{
            name: "Mech",
            stack: {
                group: "UnPlaced Students"
            },
            data: [854622, 925844, 984930, 1044982, 1100941, 1139797, 1172929, 1184435, 1184654]
        }, {
            name: "EEE",
            stack: {
                group: "UnPlaced Students"
            },
            data: [490550, 555695, 627763, 718568, 810169, 883051, 942151, 1001395, 1058439]
        }, {
            name: "ECE",
            stack: {
                group: "UnPlaced Students"
            },
            data: [379788, 411217, 447201, 484739, 395533, 435485, 499861, 569114, 655066]
        }, {
            name: "CSE",
            stack: {
                group: "UnPlaced Students"
            },
            data: [97894, 113287, 128808, 137459, 152171, 170262, 191015, 210767, 226956]
        }, {
            name: "Civil",
            stack: {
                group: "UnPlaced Students"
            },
            data: [16358, 18576, 24586, 30352, 36724, 42939, 46413, 54984, 66029]
        }, {
            name: "CSE",
            stack: {
                group: "Placed Students"
            },
            data: [900268, 972205, 1031421, 1094547, 1155600, 1202766, 1244870, 1263637, 1268165]
        }, {
            name: "ECE",
            stack: {
                group: "Placed Students"
            },
            data: [509133, 579487, 655494, 749511, 844496, 916479, 973694, 1036548, 1099507]
        }, {
            name: "Mech",
            stack: {
                group: "Placed Students"
            },
            data: [364179, 401396, 440844, 479798, 390590, 430666, 495030, 564169, 646563]
        }, {
            name: "EEE",
            stack: {
                group: "Placed Students"
            },
            data: [74208, 86516, 98956, 107352, 120614, 138868, 158387, 177078, 192156]
        }, {
            name: "Civil",
            stack: {
                group: "Placed Students"
            },
            data: [9187, 10752, 13007, 15983, 19442, 23020, 25868, 31462, 39223]
        }],
        seriesColors: ["#cd1533", "#d43851", "#dc5c71", "#e47f8f", "#eba1ad",
            "#009bd7", "#26aadd", "#4db9e3", "#73c8e9", "#99d7ef"],
        valueAxis: {
            line: {
                visible: false
            }
        },
        categoryAxis: {
            categories: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: "#= series.stack.group #, branch #= series.name #"
        }
    });


});