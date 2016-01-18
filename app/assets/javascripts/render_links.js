var linksContainer;

$(document).ready(function () {
  linksContainer = $('.links');

  LinkRepository.all()
    .then(convertLinks)
    .then(prependLinksToContainer);
  updateReadStatus();
  updateUnreadStatus();
  editLink();
  searchLinks();
  sortRead();
  sortUnread();
  sortABC();
  showAll();
});


function prependLinkToContainer(link, textStatus, jqXHR) {
  $(linkTemplate(link)).prependTo(linksContainer);
  return link;
}

function prependLinksToContainer(links) {
  return links.map(prependLinkToContainer);
}

function toggleReadStatusClassTrue(linkHTML) {
  linkHTML.removeClass('read-false').addClass('read-true');
}

function toggleReadStatusClassFalse(linkHTML) {
  linkHTML.removeClass('read-true').addClass('read-false');
}

function toggleReadStatus(linkHTML, readStatus) {
  readStatus ? toggleReadStatusClassTrue(linkHTML) : toggleReadStatusClassFalse(linkHTML);
}

