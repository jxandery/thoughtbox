var linkTemplate = _.template(
    '<div class="link">' +
    '<h2 class="link-title"><%= title %></h2>' +
    '<p class="link-url"><%= url %></p>' +
    '<p class="link-read"><%= read %></p>' +
    '<div class="link-read-statuses link-buttons">' +
    '<button class="link-promote">Promote</button>' +
    '<button class="link-demote">Demote</button>' +
    '<button class="link-delete">Delete</button>' +
    '</div>' +
    '</div>'
    );
