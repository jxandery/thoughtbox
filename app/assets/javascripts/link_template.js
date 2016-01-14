var linkTemplate = _.template(
    '<div class="link">' +
    '<h2 class="link-title"><%= title %></h2>' +
    '<p class="link-url"><%= url %></p>' +
    '<button class="link-read-status"><%= read_status %></button>' +
    '<button class="link-edit">Edit</button>' +
    '</div>' +
    '</div>'
    );
