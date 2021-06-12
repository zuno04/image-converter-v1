/*==========================================
    SHOW UPLOADED IMAGE
* ========================================== */
function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function (e) {
      // console.log("src: ", e.target.result);
      $("#imageResult").attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

$(function () {
  $("#upload").on("change", function () {
    readURL(input);
  });
});

/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById("upload");
var infoArea = document.getElementById("upload-label");

input.addEventListener("change", showFileName);
function showFileName(event) {
  var input = event.srcElement;
  var fileName = input.files[0].name;
  infoArea.textContent = "File name: " + fileName;
}

/*  ==========================================
    REDUCE IMAGE
* ========================================== */

async function upload() {
  // let image = $("#imageResult")[0];
  let input = $("#upload");
  let image = input[0].files[0];
  // const image_ext = image.name.split(".")[1];

  // console.log(image.name.split(".")[1]);
  let data = new FormData();
  data.append("file", image);
  // console.log(data.get("file"));

  // for (var key of data.entries()) {
  //   console.log(key[0] + ", " + key[1]);
  // }

  const url = "http://localhost:5000/api/reduce_image/";
  let result_img_url = "";

  axios
    .post(url, data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      },
    })
    .then((response) => {
      // console.log(response.data.filename);
      result_img_url = "http://localhost:5000/api/images/";

      axios
        .get(result_img_url, {
          params: {
            filename: response.data.filename,
          },
        })
        .then((res) => {
          // console.log(res.data);
          let oldImg = $("#renderedImageResult");

          if (oldImg) {
            $("#renderedImageResult").remove();
          }

          // let dl = $(
          //   '<a id="dl-converted-image" title="converted_image" download="' +
          //     res.data.image_name +
          //     '"></a>'
          // );

          let downlink = $(
            '<a id="dl-converted-image" target="blank" title="Download converted image"></a>'
          );

          downlink.attr("download", res.data.image_name);
          downlink.attr("href", "data:image/jpg;base64," + res.data.image_data);

          downlink.appendTo("#reduced-image-container");

          let downbutton = $("#download_result");
          downbutton.attr("download", res.data.image_name);
          downbutton.attr(
            "href",
            "data:image/jpg;base64," + res.data.image_data
          );

          let img = $(
            '<img id="renderedImageResult" alt="" class="img-fluid rounded shadow-sm mx-auto d-block">'
          );

          img.attr("src", "data:image/jpg;base64," + res.data.image_data);
          img.appendTo("#dl-converted-image");
        });
    })
    .catch((error) => {
      console.error(error);
    });
}
