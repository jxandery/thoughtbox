var LinkRepository = {
  create: function (link) {
    return $.post('/api/v1/links', {link: link});
  }
};
