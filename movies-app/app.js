/*
Part Two - Movies App!
Build an application that uses jQuery to do the following:

Contains a form with two inputs for a title and rating along with a button 
to submit the form.
When the form is submitted, capture the values for each of the inputs and append 
them to the DOM along with a button to remove each title and rating from the DOM.
When the button to remove is clicked, remove each title and rating from the DOM.
*/

$("#formInput").on("submit", function(e){
    e.preventDefault();
    let title = $("<span>").text(" Title: ").append($("#title").val()); 
    let rating = $("<span>").text(" Rating: ").append($("#rating").val()); 
    let button = $("<button type=click>").text("Remove").addClass("remove-movie");
    let newRating = $("<div>").append(title).append(rating).append(button); 
    $("#movie-list").append(newRating);
});     

$("#movie-list").on("click", ".remove-movie", function(e) {
    e.target.parentElement.remove(); 
});