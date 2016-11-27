var Backbone = require('backbone'),
     util = require('../util');

module.exports = Backbone.Model.extend({
     initialize: function() {
          this.set('district', this.get('District'));
          this.set('nameLowerCase', this.get('Name').toLowerCase());
          this.set('divisionOrdinal', util.getOrdinal(this.get('Division')));
     }
});