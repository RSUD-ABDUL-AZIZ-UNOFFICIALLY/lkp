async function lihat() {
    $.ajax({
        url: "/api/template",
        method: "GET",
        success: function (response) {
            $('#templateModalLabel').html('Lihat Template ' + response.data.nama);
            try {
                $('#list-group').empty();
                listTemplate(response.data.template);
            } catch (error) {
                console.log(error);
                $('#list-group').empty();
            }
        },
        error: function (error) {
            console.log(error);
        },
    });

    $('#templateModal').modal('show');
}
function listTemplate(data) {
    let litst = $('#list-group');
    litst.empty();
    data.forEach((element) => {
        litst.append(
            '<li class="list-group-item list-group-item-action d-flex justify-content-between align-items-start" onclick="preview(' + element.id + ')"  id="' + element.id + '"' + '>' +
            '<div class="ms-2 me-auto">' +
            '<div class="fw-bold">' + element.kegiatan + '</div>' +
            element.satuan +
            '</div>' +
            '<button type="button" class="btn btn-danger btn-sm" onclick="hapus(' +
            element.id +
            ')"><i class="fa-regular fa-trash-can"></i></button>' +
            "</li>"
        );
    }
    );

}

async function hapus(data) {
    $.ajax({
        url: "/api/template?id=" + data,
        method: "DELETE",
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil dihapus',
                showConfirmButton: false,
                timer: 1500
            })
        },
        error: function (error) {
            console.log(error);
        },
    });
    $('#' + data).remove();
}
async function simpan() {
    let dataWaktu = parseInt($('#InputCompletion').val());
    let dataVolume = parseInt($('#InputVolume').val());
    let data = {};
    data.kegiatan = $('#InputActivities').val();
    data.satuan = $('#Unit').val();
    isNaN(dataWaktu) ? null : data.waktu = dataWaktu;
    isNaN(dataVolume) ? null : data.volume = dataVolume;

    if ($('#InputActivities').val() == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Kegiatan kerja tidak boleh kosong!',
        })
        return;
    }
    $.ajax({
        url: "/api/template",
        method: "POST",
        data: data,
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: response.data.title,
            })

        },
        error: function (error) {
            Swal.fire({
                icon: 'error',
                title: error.statusText,
            })
            console.log(error.responseJSON);

        },
    });

}

async function preview(data) {
    $.ajax({
        url: "/api/template?id=" + data,
        method: "GET",
        success: function (response) {
            try {
                addPreview(response.data);
            } catch (error) {
            }
        }
    });
    $('#templateModal').modal('hide');
}
function addPreview(data) {
    $('#InputActivities').val(data.kegiatan);
    $('#InputVolume').val(data.volume);
    $('#Unit').val(data.satuan);
    $('#InputCompletion').val(data.waktu);
}