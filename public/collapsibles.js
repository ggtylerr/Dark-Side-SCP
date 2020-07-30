$("div.collapsible-block a.collapsible-block-link").on("click",function(){
  console.log("Yeet.");
  var d=$(this).parents("div.collapsible-block").first();
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