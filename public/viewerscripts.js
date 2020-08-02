// Collapsibles
$j("div.collapsible-block a.collapsible-block-link").on("click",function(){
  console.log("Yeet.");
  var d=$j(this).parents("div.collapsible-block").first();
  if(d.find(".collapsible-block-folded").is(":visible")){
    d.find(".collapsible-block-folded").hide();
    var e=d.find(".collapsible-block-unfolded");
    e.find(".collapsible-block-content").hide();
    e.show();
    e.find(".collapsible-block-content").fadeIn("fast")
  }
  else{
    d.find(".collapsible-block-unfolded").hide();
    d.find(".collapsible-block-folded").show()
  }
});
// Replace Links
$j('a[href^="/"]').attr('href', function(i, val) {
  return "/v?p=" + val.substr(1);
});
// Footnotes

// Code copied from WIKIDOT.
var WIKIDOT = {};
WIKIDOT.page = {};
WIKIDOT.page.utils = {};
WIKIDOT.page.utils.scrollToReference = function(a) {
  a=(a=="header")?"body":"#"+a;
  $j("body").scrollTo(a,0);
}

var g=YAHOO.util.Dom.getElementsByClassName("footnoteref","a");for(var c=0;c<g.length;c++){var e=g[c];var j=e.id.replace(/^footnoteref\-/,"");var h=$("footnote-"+j);var d=h.innerHTML.replace(/<a.*?<\/a>\. /,"");var f='<div class="footnote"><div class="f-heading">Footnote '+j+'.</div><div class="f-content">'+d+'</div><div class="f-footer">(click to scroll to footnotes)</div></div>';OZONE.dialog.hovertip.makeTip(e,{text:f,valign:"center",smartWidthLimit:0.7,style:{width:"auto",backgroundColor:"white"}})}