/**
 * Created by ADMIN on 03-03-2017.
 */

   var myapp= angular.module('myapp', ["ui.router",'ngMaterial','ngMessages'])
    myapp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/material');
        $stateProvider
            .state('material', {
                url: '/material',
                templateUrl: 'material.html',
                controller: 'DemoCtrl'
            })
    }]);
myapp.controller('DemoCtrl', DemoCtrl);

function DemoCtrl ($timeout, $q, $log) {
    var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;

    self.repos         = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for repos... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
        debugger;
        var results = query ? self.repos.filter( createFilterFor(query) ) : self.repos,
            deferred;
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    function searchTextChange(text) {
        $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build `components` list of key/value pairs
     */
    function loadAll() {
        var repos = [
            {
                'name'      : 'Angular 1',
                'watchers'  : '82',
            },
            {
                'name'      : 'Angular 2',
                'watchers'  : '83',
            },
            {
                'name'      : 'Angular Material',
                'watchers'  : '84',
            },
            {
                'name'      : 'Bower Material',
                'watchers'  : '85',
            },
            {
                'name'      : 'Material Start',
                'watchers'  : '81',

            }
        ];
        return repos.map( function (repo) {
            repo.value = repo.name.toLowerCase();
            repo.value = repo.watchers.toLowerCase();
            return repo;
        });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        debugger;
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(item) {
            return (item.value.indexOf(lowercaseQuery) === 0);
        };

    }
}
