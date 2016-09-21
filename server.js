/**
 * RS-GOALS server.js
 * 
 * Pulls goalsheet from database for user
 *
 */
 
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);
var fs = require('fs');

var port = process.env.PORT;

app.use(express.static("client"));

var properties = function(obj) {
    var out = "";
    for (var p in obj) {
        if (typeof obj[p] === "function") continue;
        out += p + ": " + obj[p] + "\n";
    }
    console.log(out);
    return out;
};

app.use('/', express.static(__dirname + '/client'));

server.listen(port, function() {
    console.log("listening on *:" + port);
});