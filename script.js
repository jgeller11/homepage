function populate() {
    document.getElementById("links").innerHTML = localStorage.getItem("links");

    var css = '.linkbox:hover{ background-color: '+localStorage.getItem("color")+' } .searchbar:focus{ border-color: '+localStorage.getItem("color")+' }';
    var style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    if (localStorage.getItem("ptable")) {
        document.getElementById("ptable").style.display = "inline";
        document.getElementById("photon").style.display = "inline";
    }

    document.getElementsByTagName('head')[0].appendChild(style);

}

function showptable() {
    localStorage.setItem("ptable", true)
}

function update() {
    localStorage.setItem("links", "<a href=\"https:\/\/www.tumblr.com/dashboard/blog_subs\"> <span class=\"linkbox\">t</span></a><a href=\"https://www.xkcd.com\"> <span class=\"linkbox\">x</span></a><a href=\"https://www.youtube.com/feed/subscriptions\"> <span class=\"linkbox\">y</span></a>");
}

function color_update() {
    localStorage.setItem("color", "#101040");
}
