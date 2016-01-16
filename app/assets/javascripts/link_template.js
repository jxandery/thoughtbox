var linkTemplate = _.template(
    '<div class="link read-<%= read %> "' +
    'data-id="<%= id %>">' +
    '<h2 class="link-title"><%= title %></h2>' +
    '<p class="link-url"><%= url %></p>' +
    '<button class="link-read">read</button>' +
    '<button class="link-unread">unread</button>' +
    '<button class="link-edit">Edit</button>' +
    '</div>' +
    '</div>'
    );


