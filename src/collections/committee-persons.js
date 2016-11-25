var Backbone = require('backbone'),
     Tabletop = require('tabletop').Tabletop,
     $ = require('jquery')
     CommitteePerson = require('../models/committee-person');
require('backbone.tabletopSync');

module.exports = Backbone.Collection.extend({
     model: CommitteePerson,
     initialize: function(models, options) {
          
          var params = {};
          if(options.ward) {
              this.ward = options.ward;
              params.ward = ('00' + this.ward).slice(-2); // pad left
          }
          if(options.party){
              this.party = options.party;
              params.party = this.partyMap[this.party] || '';
          } 

          var url = 'https://docs.google.com/spreadsheets/d/1nkkFQUaxcGa0oDPWl1Vr1cknToIq8FxfJ7CILQrFgBM/pubhtml';
          var storage = Tabletop.init({
              key: url,
              wait: true
          });

          this.tabletop = { instance: storage, sheet: 'Committeepeople' }
     },
     partyMap: {
       D: 'Democrat',
       R: 'Republican'
     },
     sync: Backbone.tabletopSync,
     comparator: function(row) { return +row.get('division'); }
});


/*
,
     url: function() {
          var url = 'https://data.phila.gov/resource/hezk-qta3.json',
            params = {};
          if(this.ward) params.ward = ('00' + this.ward).slice(-2); // pad left
          if(this.party) params.party = this.partyMap[this.party] || '';
          return url + '?' + $.param(params);
     }
     */
