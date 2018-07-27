var card_array = Array.from(document.querySelectorAll('.card'));

var filter_studios = function(dropdown)
{
	// get the value of the input, which we filter on
	let index = dropdown.options.selectedIndex;
	var filter_value  = dropdown[index].value;

	if (filter_value === '*')
	{
		return;
	} 

	for (let card of card_array)
	{
		if (!card.id.includes(filter_value) )
		{
			card.classList.add('d-none')
		}
	}
}

var filter = function()
{
	//window.location.search = '';
	card_array.forEach( (card) => { card.classList.remove('d-none') } );
	filter_studios(filter_camp);
	filter_studios(filter_year);
	show_filter_url();
}


var show_filter_url = function()
{
	let index_camp = filter_camp.options.selectedIndex;
	let index_year = filter_year.options.selectedIndex;

	let camp_url = (index_camp > 0 ) ? `camp=${filter_camp[index_camp].value}` : ''
	let year_url = (index_year > 0 ) ? `year=${filter_year[index_year].value}` : ''
	let and = ( camp_url && year_url ) ? '&' : ''
	let ques = (camp_url || year_url) ? '?' : 'index.html'
	let url = ques + camp_url + and + year_url
	history.pushState(null, null, url);
}

// bind filter on select change
var filter_camp = document.getElementById("filter-camp");
filter_camp.addEventListener('change', filter);
var filter_year = document.getElementById("filter-year");
filter_year.addEventListener('change', filter);