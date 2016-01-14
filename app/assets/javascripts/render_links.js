var linksContainer;

$(document).ready(function () {
  linksContainer = $('.links');

  LinkRepository.all()
    .then(prependLinksToContainer);
});

function prependLinkToContainer(link, textStatus, jqXHR) {
    $(linkTemplate(link)).prependTo(linksContainer);
  return link;
}

function prependLinksToContainer(links) {
  return links.map(prependLinkToContainer);
}
