'use strict';

var peopleApp = angular.module('peopleApp', ['ngRoute']);

peopleApp.config(function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'peoplelist.html',
		controller: 'peopleController'
	}).when('/people/:id', {
		templateUrl: 'peopleinfo.html',
		controller: 'peopleDetailController'
	}).when('/add', {
		templateUrl: 'addPeople.html',
		controller: 'peopleAddController'
	}).when('/modify/:id', {
		templateUrl: 'modifyPeople.html',
		controller: 'peopleModifyController'
	}).otherwise({
		redirectTo: '/'
	});
});

peopleApp.factory('peopleFactory', ['$http', function($http){
	var baseUrl = "api/people";
	var peopleFactory = {};
	peopleFactory.getAllPeople= function(){
		return $http.get(baseUrl);
	};
	peopleFactory.getOnePeople = function(id){
		return $http.get(baseUrl+"/"+id);
	};
	peopleFactory.addOnePeople = function(people){
		return $http.post(baseUrl, people);
	};
	peopleFactory.updateOnePeople = function(people){
		return $http.put(baseUrl + "/" + people.id, people);
	}
	peopleFactory.deleteOnePeople = function(id){
		return $http.delete(baseUrl+'/'+id);
	}
	return peopleFactory;
}]);
peopleApp.controller('peopleAddController', ['$scope', 'peopleFactory', function($scope, peopleFactory){
	$scope.save = function(){
		var people = {};
		people.id = $scope.peopleId;
		people.name = $scope.peopleName;
		people.school = $scope.peopleSchool;
		peopleFactory.addOnePeople(people).success(function(str){
			alert(str);
		}).error(function(error){
			$scope.status = "save occurs error.";
		});
	};
}]);

peopleApp.controller('peopleModifyController', ['$scope', '$routeParams', 'peopleFactory', function($scope, $routeParams, peopleFactory){
	peopleFactory.getOnePeople($routeParams.id).success(function(people){
		$scope.people = people;
	}).error(function(error){
		$scope.status = "Unable to load people info: "+error.message;
	});
	
	$scope.savePeople = function(){
		people = {};
		people.id = $scope.people.id;
		people.name = $scope.people.peopleName;
		people.school = $scope.people.peopleSchool;
		peopleFactory.updateOnePeople(people).success(function(str){
			alert(str);
		}).error(function(error){
			$scope.status = "update occurs error.";
		});
	};
	
}]);

peopleApp.controller('peopleController', ['$scope', '$routeParams', 'peopleFactory', function($scope, $routeParams, peopleFactory){
	$scope.title = "AngularJS People List";
	$scope.deletePeople = function(peopleid){
		peopleFactory.deleteOnePeople(peopleid).success(function(str){
			alert(str);
		}).error(function(error){
			$scope.status = "delete occurs error.";
		});
	};
	$scope.addPeople = function(){
		
	};
	
	peopleFactory.getAllPeople().success(function(peoples){
		$scope.peoples = peoples;
	}).error(function(error){
		$scope.status = "Unable to load people data: "+error.message;
	});
}]);

peopleApp.controller('peopleDetailController', ['$scope', '$routeParams', 'peopleFactory', function($scope, $routeParams, peopleFactory){
	$scope.title = "people info";
	peopleFactory.getOnePeople($routeParams.id).success(function(people){
		$scope.people = people;
	}).error(function(error){
		$scope.status = "Unable to load people info: "+error.message;
	});
}]);







