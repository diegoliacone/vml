
$("body").ready(function(){
    $.getJSON( "https://api.github.com/search/repositories?q=user:globocom", function(data) {
        var item = data.items;
        for( i=0; i<item.length; i++){
            $('#nav-menu').append('<a href="#" class="item" name="' + item[i].name + '" item="' + i + '" >' + item[i].name + '</a>');
        }
        loadRep(item[0]);
        loadChart(item[0].name);
    });
});

$(document).on("click", "#nav-menu a", function(e) {
    e.preventDefault();
    $('.loading').fadeIn(300);
    $('.collapse.show').removeClass('show'); 
    var i = $(this).attr('item');
    var rep = $(this).attr('name');
    $.getJSON( "https://api.github.com/search/repositories?q=user:globocom", function(data) {
    var item = data.items;
    loadRep(item[i]);
    loadChart(item[i].name);
    });
    
});

function loadRep(item){ 
    $('.info .repositorio span').html(item.name);
    $('.info .link-repositorio').attr('href', item.html_url).text(item.full_name);
    $.getJSON( "https://api.github.com/repos/globocom/"+item.name+"/contributors", function(data) {
        $('.contrib .value').html(data.length);
    });
    $('.fork .value').html(item.forks_count);
    $('.star .value').html(item.stargazers_count);
    $('.loading').fadeOut(300);
}

function loadChart(rep){
    $.getJSON( "https://api.github.com/repos/globocom/"+rep+"/commits?per_page=9999", function(data) {
        var dadosChart = [];
        for( var i = 0; i < data.length; i++){
            var date = new Date( data[i].commit.committer.date );
            var dateCommit = date.getFullYear()+'-'+ (date.getMonth()+1);

            dadosChart[dateCommit] = (dadosChart[dateCommit] == undefined)?1:dadosChart[dateCommit] + 1;
        }

        //Gerando o gráfico
        drawChart(dadosChart);
    });
}



function drawChart(dadosChart) {

    var label = []
    var dados = [];
    var meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    var i = 0;

    //Preparando os dados para serem exibidos no gráfico
    for (var key in dadosChart) {
        lab = key.split('-');
        console.log(i + ' - ' +lab);
        label[i] = meses[lab[1]-1] + ' / ' + lab[0];
        dados[i] = dadosChart[key];
        i++;
    }

    var ctx = document.getElementsByClassName("chart");
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: label.slice(0).reverse(),
            datasets: [{
                label: "Commits",
                data: dados,
                borderWidth: 2,
                borderColor: 'rgba(168,0,0,0.8)',
                backgroundColor: 'rgba(168,0,0,0.1)',
                lineTension: 0,
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                stacked: true,
                gridLines: {
                    display: true,
                    color: "rgba(168,0,0,0.2)"
                }
                }],
                xAxes: [{
                gridLines: {
                    display: false
                }
                }]
            }
        }
    });

}