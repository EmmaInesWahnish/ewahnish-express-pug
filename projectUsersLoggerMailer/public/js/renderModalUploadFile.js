import uploadFile from './uploadFile.js';
import multer from 'multer';

const renderModalUploadFile = () => {

    formData = new FormData();

    let file = '';

    let buttonId = "Image";

    document.getElementById('modal').style.display = 'block';

    const modifyForm = document.getElementById('modifyForm');

    modifyForm.innerHTML = `<div class="input-group">
                            <label for='name'>Your name</label>
                            <input name='name' id='name' placeholder="Enter your name" />
                        </div>
                        <div class="form-group">
                            <label for='files'>Select files</label>
                            <input id='files' type="file" multiple>
                        </div>

      <button type="submit" id=${buttonId} class="btn btn-success">Upload</button>`;

    let theFiles = document.getElementById("files");
    let theName = document.getElementById("name");

    let formUpdate = document.getElementById(buttonId);

    formUpdate.addEventListener('click', function () {

        formData.append("name", theName.value);
        formData.append("files", theFiles.files[0]);
        console.log("Antes de salir ", formData);

        uploadFile(formData);

        document.getElementById('modal').style.display = 'none';
    })

    let closeModal = document.getElementById('close');

    closeModal.addEventListener('click', function () {
        document.getElementById('modal').style.display = 'none';
    })

}

export default renderModalUploadFile;