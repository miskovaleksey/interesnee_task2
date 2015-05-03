// define app, include Wijmo 5 directives
var app = angular.module('app', ['wj']);

// controller
app.controller('appCtrl', function ($scope) {
  function buildPager(current, count){
    var i, start, end, pager, ranges, page;
    pager = [];
    ranges = [];

    ranges.push({start: 1, end: 2});

    start = Math.max(current-2,1);
    end   = Math.min(current+2,count);

    if(start == 1){ end = 5; }
    if(end == count){ start = count - 5;}

    ranges.push({start: start, end: end});
    ranges.push({start: count-1, end: count})

    for(i=0; i<ranges.length; i++){
      var range, prev, next;
      range = ranges[i];
      prev = ranges[i-1];
      next = ranges[i+1];
      if(i==1 && prev.end < range.start){
        pager.push('...');
      }
      for(page=range.start; page<=range.end; page++){
          if(pager.indexOf(page) == -1){
              pager.push(page);
          }
      }
      if(i==1 && next.start > range.end){
        pager.push('...');
      }
    }

    return pager;
  }

  var i, countries, data, count, view;

  countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
  data = [];
  count = 100;
  for (i = 0; i < count; i++) {
    var countryId = (Math.floor(Math.random() * ((countries.length - 1) - 0 + 1)) + 0);
    data.push({
      All: i % 4 === 0,
      Country: countries[countryId],
      Downloads: Math.round(Math.random() * 20000),
      Sales: Math.random() * 10000,
      Expenses: Math.random() * 5000
    });
  }

  // expose data as a CollectionView to get events
  view = new wijmo.collections.CollectionView(data);
  view.pageChanged.addHandler(function (flex) {
    $scope.pageNumber = view.pageIndex + 1;
    $scope.pages = buildPager($scope.pageNumber, view.pageCount);
  });
  view.pageSize = 5;


  $scope.data = view;
  $scope.pageNumber = view.pageIndex + 1;
  $scope.pages = buildPager($scope.pageNumber, view.pageCount);

  $scope.goToPage = function(value) {
    view.moveToPage(value-1);
  };

  $scope.srcChanged = function (flex, args) {
    flex.rows.defaultSize = 34;
    flex.columnHeaders.rows.defaultSize = 40;

  };
});

