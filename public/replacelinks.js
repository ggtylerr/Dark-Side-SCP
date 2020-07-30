$('a[href^="/"]').attr('href', function(i, val) {
  return "/v?p=" + val.substr(1);
});