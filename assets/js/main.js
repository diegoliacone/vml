jQuery(document).ready(function($) {

    $.getJSON( "https://api.github.com/search/repositories?q=user:globocom", function(data) {
        var item = data.items;

        console.log(data);
        sessionStorage.setItem("globocom", Object.values(item) );

        for( i=0; i<item.length; i++){
            $('#nav-menu').append('<a href="#" class="item" item="' + i + '" >' + item[i].name + '</a>');
        }

        loadRep(item[14]);
   });

   $(document).on("click", "#nav-menu a", function(e) {
       $('.collapse.show').removeClass('show');
       var i = $(this).attr('item');
       $.getJSON( "https://api.github.com/search/repositories?q=user:globocom", function(data) {
        var item = data.items;
        loadRep(item[i]);
       });
       
   });

   function loadRep(item){
        console.log(item.forks_count);
        $('.info .repositorio span').html(item.name);
        $('.info .link-repositorio').attr('href', item.html_url).text(item.full_name);
        $.getJSON( "https://api.github.com/repos/globocom/"+item.name+"/contributors", function(data) {
            $('.contrib .value').html(data.length);
        });
        $('.fork .value').html(item.forks_count);
        $('.star .value').html(item.stargazers_count);
   }

});