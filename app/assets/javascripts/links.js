function Link(data) {
  this.id     = data.id
  this.title  = data.title;
  this.url    = data.url;
  this.read   = data.read;
  this.readStatus = this.viewed();
}

Link.prototype.viewed = function() {
  return this.read ? "read" : "unread"
}

Link.prototype.toggleStrikeThrough = function() {
}

Link.prototype.updateReadStatusButton = function() {
  // if it's false/unread then i want it to display read (possibly re-rendered)
  // i also want it to strike through the text
  // i'll want it to call a method that is watching the dom for actions and do this there

  return $.ajax({
    method: 'PUT',
    url: '/api/v1/links/' + this.id,
    data: !this.read
  });
}
