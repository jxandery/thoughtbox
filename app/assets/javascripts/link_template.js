var linkTemplate = _.template(
    '<div class="link" data-id="<%= id %>">' +
    '<h2 class="link-title"><%= title %></h2>' +
    '<p class="link-url"><%= url %></p>' +
    '<button id="link-read-status"><%= readStatus %></button>' +
    '<button id="link-edit">Edit</button>' +
    '</div>' +
    '</div>'
    );


