<div id="top" class="container">
    <div>
        <header class="text-white text-center">
            <h1>Welcome to Image reducer</h1>
            <p>This project uses FastAPI, Jinja2, and Bootstrap4.</p>
        </header>
    </div>
    <div class="row mt-5">
        <div class="col-md-5">
            <!-- Upload image input-->
            <div class="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                <input id="upload" type="file" enctype="multipart/form-data" onchange="readURL(this);" class="form-control border-0">
                <label id="upload-label" for="upload" class="font-weight-light text-muted">Choose file</label>
                <div class="input-group-append">
                    <label for="upload" class="btn btn-light m-0 rounded-pill px-4"> <i class="fa fa-cloud-upload mr-2 text-muted"></i><small class="text-uppercase font-weight-bold text-muted">Choose file</small></label>
                </div>
            </div>
            <!-- Uploaded image area-->
            <p class="font-italic text-white text-center">The image uploaded will be rendered inside the box below.</p>
            <div class="image-area mt-4"><img id="imageResult" src="#" alt="" class="img-fluid rounded shadow-sm mx-auto d-block"></div>
        </div>
        <div class="col-md-2 mx-auto">
            <div class="text-center">
                <button onclick="upload()" type="button" class="btn btn-info">Convert</button>
            </div>
        </div>
        <div class="col-md-5">
            <!-- Converted image area-->
            <div id="reduced-image-container" class="reduced-image-area"></div>
            <a id="download_result" class="btn btn-primary mt-5" title="Download converted image">Download</a>
        </div>
    </div>
    
</div>
