function loadData() {
    
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text('');
    $nytElem.text('');

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('so you want to live at ' + streetStr + ' Street, ' + cityStr + ' ?');

    var streetviewUrl = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address;
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // NYT ajax request goes here 
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "cdd8d1603c0d4018b1dce0c5ac6b0eb6",
        'q': cityStr,
        'sort': "newest"
    });
    $.ajax({
        url: url,
        method: 'GET',
        }).done(function(data) {
            console.log(data);
            $nytHeaderElem.text('New York Times articles about ' + cityStr);
            articles = data.response.docs;
            for (var i = 0; i < articles.length; i++) {
                var article = articles[i];
                $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p' + '</li>');
            }
        }).fail(function(err) {
            $nytHeaderElem.text('New York Times Article Could Not Be Loaded!')
        });

    // wiki ajax request goes here



    return false;

}

$('#form-container').submit(loadData);

