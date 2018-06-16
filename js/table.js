var tags; 

// loads previously saved searches and displays them in the page
function loadSearches() 
{
   if ( !window.sessionStorage.getItem( "herePreviously" ) )
   {
      sessionStorage.setItem( "herePreviously", "true" );
      document.getElementById( "t" ).innerHTML ="Welcome!";
   } // end if

   var length = localStorage.length; // number of key-value pairs
   tags = []; // create empty array

   // load all keys
   for (var i = 0; i < length; ++i) 
   {
      tags[i] = localStorage.key(i);
   } // end for

   tags.sort(); // sort the keys

   var markup = "<tr><th>score</th><th>Star Time</th></tr>"; 
  

   // build list of links
   for (var tag in tags) 
   { 
      var query = localStorage.getItem(tags[tag]);
      markup += "<tr><td>"+ query+ '</td><td> '+tags[tag] + "</td></tr>" ;
   } // end for

   
   document.getElementById("t").innerHTML = markup;
} // end function loadSearches

// deletes all key-value pairs from localStorage
function clearAllSearches() 
{
   localStorage.clear();
   loadSearches(); // reload searches
} // end function clearAllSearches


function start()
{
    document.getElementById('button').addEventListener("click",clearAllSearches);
   
   var loop=setInterval(loadSearches,1000); // load the previously saved searches
} // end function start

window.addEventListener( "load", start, false );