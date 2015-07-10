$(function(){
   init();
});

var init = function(){
    createDropdown("placeTo","mui-select-placeTo" ,"http://localhost:9980/acc/?method=getPlaces");
};
