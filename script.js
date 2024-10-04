function populate() {
    document.getElementById("links").innerHTML = localStorage.getItem("links");
}

function update() {
    localStorage.setItem("links", "<a href=\"https:\/\/www.tumblr.com/dashboard/blog_subs\"> <span class=\"linkbox\">t</span></a><a href=\"https://www.xkcd.com\"> <span class=\"linkbox\">x</span></a><a href=\"https://www.youtube.com/feed/subscriptions\"> <span class=\"linkbox\">y</span></a>");
}