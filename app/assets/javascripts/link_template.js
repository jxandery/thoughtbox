var linkTemplate = _.template(
    '<div class="link read-<%= read %> "' +
    'data-id="<%= id %>">' +
    '<h2 class="link-title"><%= title %></h2>' +
    '<p class="link-url"><%= url %></p>' +
    '<button class="link-edit">Edit</button>' +
    '<button class="link-read">Mark as Read</button>' +
    '<button class="link-unread">Mark as Unread</button>' +
    '</div>' +
    '</div>'
    );


