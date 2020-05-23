window.addEventListener('load', function () {
  var editor;

  ContentTools.StylePalette.add([
    new ContentTools.Style('Author', 'author', ['p'])
  ]);

  editor = ContentTools.EditorApp.get();
  editor.init('*[data-editable]', 'data-name');

  editor.addEventListener('saved', function (ev) {
    var name, payload, regions;
    // Check that something changed
    regions = ev.detail().regions;
    if (Object.keys(regions).length == 0) {
      return;
    }

    // Set the editor as busy while we save our changes
    this.busy(true);

    // Collect the contents of each region into a FormData instance
    payload = new FormData();
    for (name in regions) {
      if (regions.hasOwnProperty(name)) {
        payload.append(name, regions[name]);
      }
    }

    // Send the update content to the server to be saved
    function onStateChange(ev) {
      // Check if the request is finished
      if (ev.target.readyState == 4) {
        editor.busy(false);
        if (ev.target.status == '200') {
          // Save was successful, notify the user with a flash
          new ContentTools.FlashUI('ok');
        } else {
          // Save failed, notify the user with a flash
          new ContentTools.FlashUI('no');
        }
      }
    };

    xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', onStateChange);
    xhr.open('POST', '/save-my-page');
    xhr.send(payload);
  });

  // Add support for auto-save
  editor.addEventListener('start', function (ev) {
    var _this = this;

    function autoSave() {
      _this.save(true);
    };
    this.autoSaveTimer = setInterval(autoSave, 30 * 1000);
  });

  editor.addEventListener('stop', function (ev) {
    // Stop the autosave
    clearInterval(this.autoSaveTimer);
  });

  // copy markup
  document.querySelector('#copy-content-clipboard').addEventListener('click', () => {
    console.log('copy-content-clipboard');

    var clipboardContent = document.getElementById("clipboard").innerHTML;
    copySurfooterMarkup(clipboardContent);

    function copySurfooterMarkup(str) {
      function listener(e) {
        e.clipboardData.setData('text/html', str);
        e.clipboardData.setData('text/plain', str);
        e.preventDefault();
      }
      document.addEventListener('copy', listener);
      document.execCommand('copy');
      document.removeEventListener('copy', listener);
    }
  });

  // insert images
  var editableImages = document.querySelectorAll('[data-editable-image]')
  editableImages.forEach(function (elem, index) {
    elem.addEventListener('click', (e) => {
      var currentImage = e.target;
      console.log(currentImage)
      var modal = document.getElementById("image-modal");
      var btn = currentImage;
      var close = document.getElementsByClassName("close")[0];
      modal.style.display = "block";
      // close modal
      close.onclick = function () {
        modal.style.display = "none";
      }
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
      // submit form
      document.querySelector('#form-image').addEventListener('submit', (formData) => {
        console.log(formData);
        closeModal(currentImage);
        e.preventDefault();
      });

      function closeModal(image) {
        image.alt = document.querySelector('#form-image--alt').value;
        image.src = document.querySelector('#form-image--url').value;
        modal.style.display = "none";
      }

    });
  });



  document.querySelector('#base').addEventListener('change', (e) => {
    var content;
    if (e.target.value == 1) {
      content = `
      <section class="surfooter">
        <div data-editable="">
          <h3>Lorem ipsum dolor sit amet</h3>
          <h4>Quam lacus suspendisse faucibus interdum posuere lorem</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.</p>
        </div>
        <div data-editable="">
          <h3>Lorem ipsum dolor sit amet</h3>
          <h4>Quam lacus suspendisse faucibus interdum posuere lorem</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.</p>
        </div>
        <div data-editable="">
          <h3>Lorem ipsum dolor sit amet</h3>
          <h4>Quam lacus suspendisse faucibus interdum posuere lorem</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.</p>
        </div>
      </section>
      `;
    } else {
      content = `
        <section class="surfooter">
          <div class="col-sm-12" data-editable="">
            <h3>Lorem ipsum dolor sit amet</h3>
            <h4>Quam lacus suspendisse faucibus interdum posuere lorem</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.</p>
          </div>

          <div class="col-sm-12">
            <div class="row">
              <!-- col-3 -->
              <div class="col-sm-3" data-editable="">
                <h5>Lorem ipsum dolor sit amet</h5>
                <div class="image" data-editable-image="">
                  <img class="img-responsive" alt="surfooter image" src="https://via.placeholder.com/150/0082c3/FFFFFF">
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur <strong><a href="#">tempor</a></strong> oder
                  <strong><a href="#">quis</a></strong>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip exea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu
                  fugiat nulla pariatur. <strong><a href="#">Duis</a></strong>,<strong><a
                      href="#">voluptate</a></strong>.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip exea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu
                  fugiat nulla pariatur. <strong><a href="#">Duis</a></strong>.
                </p>
              </div>
              <!-- col-3 -->
              <div class="col-sm-3" data-editable="">
                <h5>Lorem ipsum dolor sit amet</h5>
                <div class="image" data-editable-image="">
                  <img class="img-responsive" alt="surfooter image" src="https://via.placeholder.com/150/0082c3/FFFFFF">
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur <strong><a href="#">tempor</a></strong> oder
                  <strong><a href="#">quis</a></strong>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip exea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu
                  fugiat nulla pariatur. <strong><a href="#">Duis</a></strong>,<strong><a
                      href="#">voluptate</a></strong>.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip exea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu
                  fugiat nulla pariatur. <strong><a href="#">Duis</a></strong>.
                </p>
              </div>
              <!-- col-3 -->
              <div class="col-sm-3" data-editable="">
                <h5>Lorem ipsum dolor sit amet</h5>
                <div class="image" data-editable-image="">
                  <img class="img-responsive" alt="surfooter image" src="https://via.placeholder.com/150/0082c3/FFFFFF">
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur <strong><a href="#">tempor</a></strong> oder
                  <strong><a href="#">quis</a></strong>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip exea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu
                  fugiat nulla pariatur. <strong><a href="#">Duis</a></strong>,<strong><a
                      href="#">voluptate</a></strong>.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip exea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu
                  fugiat nulla pariatur. <strong><a href="#">Duis</a></strong>.
                </p>
              </div>
              <!-- col-3 -->
              <div class="col-sm-3" data-editable="">
                <h5>Lorem ipsum dolor sit amet</h5>
                <div class="image" data-editable-image="">
                  <img class="img-responsive" alt="surfooter image" src="https://via.placeholder.com/150/0082c3/FFFFFF">
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur <strong><a href="#">tempor</a></strong> oder
                  <strong><a href="#">quis</a></strong>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip exea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu
                  fugiat nulla pariatur. <strong><a href="#">Duis</a></strong>,<strong><a
                      href="#">voluptate</a></strong>.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip exea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu
                  fugiat nulla pariatur. <strong><a href="#">Duis</a></strong>.
                </p>
              </div>
            </div>
          </div>
        </section>
        `
    }
    document.querySelector('#clipboard').innerHTML = content
  });

});