"use strict";

/* global WebsyDesigns */
// API_KEY = 'ZV7DIFPQUWYA1LD0'
var apiService = new WebsyDesigns.APIService('https://www.alphavantage.co');

function renderData() {
  apiService.fetchData('get', 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=ZV7DIFPQUWYA1LD0').then(function (result) {
    console.log(result);
  });
}

renderData();
