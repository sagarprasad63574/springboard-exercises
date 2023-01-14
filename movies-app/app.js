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