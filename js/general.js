/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var setCurrentDisplayName = function(displayName){
    window.location.hash = displayName;
}

var getCurrentDisplayName = function(){
    var temp = window.location.hash.split('/')[0];
    return temp.replace("#","");
}
