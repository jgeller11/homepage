function populate() {
    document.getElementById("links").innerHTML = localStorage.getItem("links");

    var css = '.linkbox:hover{ background-color: '+localStorage.getItem("color")+' } .searchbar:focus{ border-color: '+localStorage.getItem("color")+' }';
    var style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);

}

function update() {
    localStorage.setItem("links", "<a href=\"https:\/\/www.tumblr.com/dashboard/blog_subs\"> <span class=\"linkbox\">t</span></a><a href=\"https://www.xkcd.com\"> <span class=\"linkbox\">x</span></a><a href=\"https://www.youtube.com/feed/subscriptions\"> <span class=\"linkbox\">y</span></a>");
}

function color_update() {
    localStorage.setItem("color", "#101040");
}