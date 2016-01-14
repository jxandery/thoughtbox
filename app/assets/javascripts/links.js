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
