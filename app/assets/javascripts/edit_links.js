var editForm =  "<div class='edit-form'><div class='row'><div class='col-sm-4'><h6>Edit Title</h6>"
+ "<input class='form-control' type='text' id='edit-title'></div></div><div class='row'><div class='col-sm-8'>"
+ "<h6>Edit URL</h6><input class='form-control' type='text' id='edit-url'></div></div><input "
+ "class='btn btn-default pull-right update-link' type='button' name='submit' value='Update Link'></div></div>";

function addEditLinkForm (link) {
  $('div').remove('.edit-form');
  link.append(editForm);
  updateLinkRecord(link);
}

function editLink() {
  $(document).on('click', '.link-edit', function(event){
    var link            = $(this).closest('.link');

    addEditLinkForm(link);
  });
}
