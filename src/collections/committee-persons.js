var Backbone = require('backbone'),
     Tabletop = require('tabletop').Tabletop,
     $ = require('jquery')
     CommitteePerson = require('../models/committee-person');
require('backbone.tabletopSync');

module.exports = Backbone.Collection.extend({
    model: CommitteePerson,
    initialize: function(models, options) {
       if(options.ward) this.ward = options.ward;
       if(options.party) this.party = options.party;
    },
    partyMap: {
       D: 'Democrat',
       R: 'Republican'
     },
    url: function() {

        var baseUrl = 'https://docs.google.com/spreadsheets/d/1nkkFQUaxcGa0oDPWl1Vr1cknToIq8FxfJ7CILQrFgBM/gviz/tq?tq=';
        var urlPostFix = '&gid=1903727742'; // selects the "Committeepeople" sheet
        var queryString = '';
        var params = {};

        // Built query string based on provided params
        if (this.ward) {

            params.ward = ('00' + this.ward).slice(-2); // pad left
            queryString = queryString.concat('Select * where B = ', params.ward);

            if (this.party) {

                params.party = this.partyMap[this.party] || '';
                queryString = queryString.concat(' and H = "', params.party, '"');

            }

        } else if (this.party){

            params.party = this.partyMap[this.party] || '';
            queryString = queryString.concat('Select * where H = "', params.party, '"');
        } 

        // encode the query and build the url
        return baseUrl.concat(encodeURIComponent(queryString), urlPostFix);

     },
     comparator: function(row) { return +row.get('division'); }
});