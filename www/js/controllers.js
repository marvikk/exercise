angular.module('starter.controllers', [])

.controller('WeatherCtrl', function($scope, GetWeather) {
  $scope.data = {
    'query' : '',
    'weather' : ''
  };
  $scope.favorites = {};
  var arrFavorites =[];
   $scope.showMe = false;
   $scope.showSuccess = false;

  //autocomplete Google API
    var inputFrom = document.getElementById('from');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();
        $scope.data.query = place.formatted_address;
        $scope.$apply();
    });

  $scope.getWeather = function(){
    $scope.showMe = true;
    GetWeather.getWeather($scope.data.query).then(function(response){

      console.log(response.data.main.temp);
       var result = Math.round(+response.data.main.temp - 273);
       $scope.data.weather = result + "°";
      })

  };
  $scope.addToFavourites = function(){
    GetWeather.add($scope.data);
    $scope.favorites =  GetWeather.getFavourites($scope.data);
     $scope.showSuccess = true;
     function f(){
       $scope.showSuccess = false
     }
     setTimeout(function() { f() }, 3000);
       $scope.data = {};
       $scope.showMe = false;

  };

})

.controller('FavsCtrl', function($scope, GetWeather) {
  $scope.favorites = {};
  $scope.favorites =  GetWeather.getFavourites($scope.data);

  $scope.removeFromFavourites = function(index){
console.log(index);
       GetWeather.remove(index);
$scope.favorites =  GetWeather.getFavourites();
  };
  // $scope.$on('$ionicView.enter', function(e) {
  //
  // });


});
