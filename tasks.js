var entries = [
{"id":1, "title":"Task1", "body":"Task eins", "published":"6/2/2013"},
{"id":2, "title":"Task2", "body":"Task zwei", "published":"6/3/2013"},
{"id":3, "title":"Task3", "body":"Task drei", "published":"6/4/2013"},
{"id":4, "title":"Task4", "body":"Task vier", "published":"6/5/2013"},
{"id":5, "title":"Task5", "body":"Task fünf", "published":"6/10/2013"},
{"id":6, "title":"Task6", "body":"Task sechs", "published":"6/12/2013"}];
 
 
exports.getTaskEntries = function() {
    return entries;
}
 
exports.getTaskEntry = function(id) {
    for(var i=0; i < entries.length; i++) {
        if(entries[i].id == id) return entries[i];
    }
}
