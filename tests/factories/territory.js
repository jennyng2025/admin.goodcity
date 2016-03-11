import FactoryGuy from 'ember-data-factory-guy';
import './district';
var territory_list = ["", "New Territories","Hong Kong Island","Kowloon"];

FactoryGuy.define('territory',{
  sequences: {
    territory_name: function() {
       return territory_list[Math.floor(Math.random()*(territory_list.length))];
    }
  },
  default: {
    name: FactoryGuy.generate("territory_name")
  },
  territory_with_many_districts: {
    districts: FactoryGuy.hasMany('district', 6)
  }
});

export default {};
