var linksContainer;

$(document).ready(function () {
  linksContainer = $('.links');

  LinkRepository.all()
    .then(renderLinks)
    .then(prependLinksToContainer);
});

function renderLinks(links) {
  links.map(renderLink);
  return links;
}

function renderLink(link) {
  link.render = function () {
    this.element = $(linkTemplate(this));
    return this;
  };

  link.prependTo = function (target) {
    this.element.prependTo(target);
    return this;
  };

  return link.render();
}

function prependLinkToContainer(link) {
  link.prependTo(linksContainer);
  return link;
}

function prependLinksToContainer(links) {
  return links.map(prependLinkToContainer);
}
