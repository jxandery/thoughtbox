var LinkRepository = {
  all: function () {
    return $.getJSON('/api/v1/links')
      //.then(renderLinks);
  },
  create: function (link) {
    return $.post('/api/v1/links', {link: link});
  }
};
