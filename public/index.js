function validSCPurl(s) {
  // Check if the URL is from the scp-wiki.net website
  if (s.startsWith("https://") || s.startsWith("http://")) {
    s = s.replace("https://","");
    s = s.replace("http://","");
    if (s.startsWith("www.scp-wiki.net/") || s.startsWith("scp-wiki.net/"))
      return true;
  }
  if (s.startsWith("www.scp-wiki.net/") || s.startsWith("scp-wiki.net/"))
    return true;
}

function goToPage() {
  // Get the URL
  var url = document.getElementById("urlInput").value;
  // Check if it is from the SCP wiki and it's a number
  if (!validSCPurl(url) && isNaN(url)) {
    alert("That's not a valid URL from the SCP wiki, and that's not a number.")
  } else if (validSCPurl(url)) {
    // If it's a URL, cut out the domain.
    url = url.split(".net/")[1];
    // Redirect to viewer
    window.location = "https://darksidescp.ggtylerr.digital/v?p=" + url;
  } else {
    // Add 0's at the start if it doesn't match 3 characters
    if (url.length < 3) url = url.padStart(3,"0");
    // Redirect to viewer
    window.location = "https://darksidescp.ggtylerr.digital/v?p=scp-" + url;
  }
}