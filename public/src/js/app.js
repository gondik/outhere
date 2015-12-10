var angular = require('angular');
var _ = require('underscore');
var mapsapi = require('google-maps-api')('AIzaSyAlBBVppsstZJuHbVkmR_Jw89Yy1mbklVA');

var towntapApp = angular.module('towntapApp', []);

towntapApp.controller('mainCtrl', function($scope, $http) {
    $scope.venues = [];

    $scope.init = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(loadVenues);
        }
        else {

        }

        $scope.town = 'Prague 12';
    };

    function loadVenues(position) {
        var pos = position || null;

        if (pos) {
            $http.post('/api/venues', {
                params: {
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude
                }
            })
            .then(function(response) {
                $scope.venues = response.data;
            });

            mapsapi().then(function(maps) {
                var mapOptions = {
                    zoom: 13,
                    center: new maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                    mapTypeId: maps.MapTypeId.ROADMAP,
                    disableDefaultUI: true
                };
                var map = new maps.Map(document.getElementById("map-canvas"), mapOptions);
            });
        }
    }
});
