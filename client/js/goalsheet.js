/**
 * Goalsheet.js
 * 
 * Handles all interaction with the goal sheet
 * 
 */
 
/* global $ angular */

var app = angular.module("app", []);

var requestImages = function(term, limit, replace, callback) {
    
    var url = "http://runescape.wikia.com/api.php";
    
    if (osrs) {
        url = "http://2007scape.wikia.com/api.php";
    }
    
    $.ajax({
        url: url,
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            action: "query",
            list: "allimages",
            aiprop: "size|url",
            aifrom: term,
            ailimit: limit,
            format: "json"
        },
        xhrFields: { withCredentials: true },
        success: function(response) {
            for (var i = 0; i < response.query.allimages.length; i++) {
                var image = response.query.allimages[i];
                // assume it grabbed 
                if (replace && !image.name.contains(term)) {
                    image.url = "img/rs3.png";
                    image.width = 27;
                    image.height = 30;
                } else {
                    image.url = image.url.split("?")[0] + "/thumbnail-down/width/"
                     + image.width + "/height/" + image.height;
                }
            }
            callback(response.query.allimages);
        }
    });
    
};

app.controller("sheet-ctrl", function($scope) {
    
    $scope.range = function(n) {
        var a = new Array();
        for (var i = 0; i < n; i++) a.push(i);
        return a;
    };
    
    $scope.sheet =  {
        title: "Unnamed",
        id: "#23455",
        user: "Btw Im Dank",
        data: {
            id: "",
            size: {w: 25, h: 15},
            items: [
                {
                    name: "Saradomin Godsword",
                    wiki: "Two-handed_sword",
                    x: 1, y: 2,
                    current: 0, goal: 1
                },
                {
                    name: "Zamorak Godsword",
                    wiki: "Zamorak_godsword",
                    image: {
                        url: "http://vignette2.wikia.nocookie.net/2007scape/images/b/b1/Zamorak_godsword.png/revision/latest",
                        width: 32, height: 32
                    },
                    x: 2, y: 2,
                    current: 0, goal: 1
                },
                {
                    name: "Blue Partyhat",
                    wiki: "Blue_partyhat",
                    image: {
                        url: "http://vignette4.wikia.nocookie.net/2007scape/images/3/35/Blue_partyhat.png/revision/latest",
                        width: 32, height: 32
                    },
                    x: 1, y: 3,
                    current: 0, goal: 1
                },
                {
                    name: "Coins",
                    wiki: "Coins_10000",
                    x: 2, y: 3,
                    current: 1, goal: 2147000000
                },
                {
                    name: "Noxious Scythe",
                    wiki: "Noxious_scythe",
                    x: 3, y: 3,
                    current: 0, goal: 12345
                },
                {
                    name: "Thingy",
                    wiki: "drygore",
                    x: 12, y: 3,
                    current: 0, goal: 12345
                },
            ]
        }
    };
    
    document.title = $scope.sheet.title + " · RSGT";
    
    $scope.current_item = null;
    
    $scope.sheet_width = $scope.range($scope.sheet.data.size.w);
    $scope.sheet_height = $scope.range($scope.sheet.data.size.h);
    
    $scope.item_at = function(x, y) {
        for (var i in $scope.sheet.data.items) {
            var item = $scope.sheet.data.items[i];
            if (item.x == x && item.y == y) {
                $scope.current_item = item;
                return;
            }
        }
        $scope.current_item = null;
    };
    
    $scope.get_image = function(item) {
        requestImages(item.wiki, 1, true, function(image) {
            item.image = image;
        });
    };
    
});

var osrs = false;

var formatNumber = function(n) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i&&c!=="."&&((a.length-i)%3===0)?','+c:c;
    });
};

var getBoxAt = function(x, y) {
    
    var table = $("#goalsheet tbody");
    var row = $(table.children()[y]);
    var box = $(row.children()[x]);
    console.log(box);
    
    return box;
    
};

var populateImage = function(item, box) {
    
    requestImages(item.wiki, 1, true, function(images) {
        box.append("<img src='" + images[0].url + "' height='" + images[0].height 
            + "' width='" + images[0].width + "'/>");
    });
    
    return;
    
};

var amountAsHTML = function(n) {
    
    if (n >= 10000000) {
        
        n /= 1000000;
        return Math.round(n) + "M";
        
    } else if (n >= 100000) {
        
        n /= 1000;
        return Math.round(n) + "K";
        
    } else if (n > 1) {
        
        return n + "";
        
    } else {
        
        return "";
        
    }
    
};
 
var populateData = function(data) {
    console.log(data);
    
    var table = "<table id='goalsheet'>";
    
    for (var i = 0; i < data.size.h; i++) {
        
        table += "<tr>";
        
        for (var j = 0; j < data.size.w; j++) {
            
            table += "<td></td>";
            
        }
        
        table += "</tr>";
        
    }
    
    table += "</table>";
    
    $("#goalsheet-container").append(table);
    
    for (var i in data.items) {
        
        var item = data.items[i];
        
        var dataBox = getBoxAt(item.x, item.y);
        
        var amount = amountAsHTML(item.goal);
        var color = amount.contains("M") ? "#0F0" : 
            amount.contains("K") ? "#FFF" : "#FF0";
        var tooltip = item.name;
            
        if (color != "#FF0") tooltip = formatNumber(item.goal) + " x " + tooltip;
        
        dataBox.attr({
            tooltip,
            id: item.wiki,
            amount
        });
        
        dataBox.css("color", color);
        
        dataBox.addClass("has-tooltip");
        
        console.log(item);
        
        if (item.current >= item.goal) dataBox.addClass("completed-goal");
        
        populateImage(item, dataBox);
        
    }
    
};

$(document).ready(function() {
    
    // initialise tooltips
    $('[data-toggle="tooltip"]').tooltip(); 
    
    var in_progress = false;
    
    var updateSearch = function() {
        
        if (in_progress) return;
        
        in_progress = true;
       
        var term = $("#search-term").val();
       
        $(".search-table").empty();
        
        $(".search-table").append("<tbody></tbody>");
        
        requestImages(term, 25, false, function(images) {
            
            var empty = true;
           
            $.each(images, function(i, image) {
                
                if (!image.name.contains(".png") || image.width > 32 || image.height > 32) return;
                
                empty = false;
                
                var name = image.name.replace(/_/g, " ").replace(".png", "");
               
                $(".search-table tbody").append("<tr><td class='icon'><img src='" + image.url + "' width='" + image.width + "' height='" + image.height + "'></td><td>" + name + "</td></tr>");
               
            });
            
            if (empty) {
               
                $(".search-table tbody").append("<tr><td>No results for '" + term + "'</td></tr>");
            }
            
            in_progress = false;
            
            if (term != $("#search-term").val()) {
                updateSearch();
            }
            
        });
        
    };
    
    $("#search-term").keyup(updateSearch);

    $("#search-item").click(updateSearch);
    
});

if (typeof String.prototype.contains === 'undefined') { 
    String.prototype.contains = function(it) { return this.indexOf(it) != -1; }; 
    
}