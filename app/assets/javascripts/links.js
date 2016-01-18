function Link(data) {
  this.id     = data.id
  this.title  = data.title;
  this.url    = data.url;
  this.read   = data.read;
}

function convertLink(link) {
  return new Link(link);
}

function convertLinks(links) {
  return links.map(convertLink);
}

