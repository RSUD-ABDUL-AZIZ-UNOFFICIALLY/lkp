$(document).ready(function () {
  let monthly = $("#InputTanggal").val();
  // GET TABEL
  getTabel(monthly);
  // GET SCORE
  getScore(monthly);
});
function hapus(data, id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
       $.ajax({
      url: "/api/monthly/activity?id=" + data,
      method: "delete",
      success: function (response) {
        // let rows = $("tbody > tr");
        // rows.eq(id).remove();
        getTabel(monthly);
        getScore(monthly);
      },
      error: function (error) {
        // console.log(error);
      },
    });
    }
  })
   
  let monthly = $("#InputTanggal").val();
  getScore(monthly);
}

function getScore(monthly) {
  $.ajax({
    url: "/api/monthly/score?date=" + monthly,
    method: "GET",
    success: function (response) {
      // console.log(response);
      $("#capaian").text(response.data.capaian);
      $("#kategori").text(response.data.kategori);
      $("#tpp").text(response.data.tpp);
    },
  });
}
function getTabel(newDateValue) {

  $.ajax({
    url: "/api/monthly?date=" + newDateValue,
    method: "GET",
    success: function (response) {
      let rows = $("tbody > tr");
      rows.remove();
      for (let i = 0; i < response.data.length; i++) {
        let nomor = i + 1
        let row = $("<tr>");
        row.append($("<td>" + nomor + "</td>"));
        row.append($("<td>" + response.data[i].tgl + "</td>"));
        row.append($("<td>" + response.data[i].rak + "</td>"));
        row.append($("<td>" + response.data[i].volume + "</td>"));
        row.append($("<td>" + response.data[i].satuan + "</td>"));
        row.append($("<td>" + response.data[i].waktu + "</td>"));
        row.append(
          $(
            "<td>" +
              '<button type="button" class="btn btn-outline-danger"  onclick="hapus(' +
              response.data[i].id +
              "," +
              i +
              ')"><i class="fa fa-trash"></i></button>' +
              '<button type="button" class="btn btn-outline-success ml-2"  onclick="edit(' +
              response.data[i].id +
              "," +
              i +
              ')"><i class="fa fa-pencil"></i></button>' +
              "</td>" 

          )
        );
        $("tbody").append(row);
      }
    },
    error: function (error) {
      // console.log(error);
    },
  });
}
// Listen for change event on the date input field
$("#InputTanggal").on("change", function () {
  // Get the new value of the input field
  let newDateValue = $(this).val();
  getTabel(newDateValue);
  getScore(newDateValue);
});

function cetak() {
  let monthly = $("#InputTanggal").val();
  window.open("/api/report?date=" + monthly, "_blank");
}

function submit() {
  let monthly = $("#InputTanggal").val();
// ajax post
  $.ajax({
    url: "/api/monthly",
    method: "POST",
    data: {
      monthly: monthly,
    },
    success: function (response) {
      Swal.fire({
        icon: 'success',
        title: response.message,
        text: response.data,
      })
    },
    error: function (error) {
      console.log(error);
    },
  });
    return;
}

function edit(data, id) {
  $.ajax({
    url: "/api/monthly/activity?id=" + data,
    method: "GET",
    success: function (response) {
      $("#InputTgl").val(response.data.tgl);
      $("#InputActivities").val(response.data.rak);
      $("#InputVolume").val(response.data.volume);
      $("#InputUnit").val(response.data.satuan);
      $("#InputCompletion").val(response.data.waktu);
      $("#InputId").val(response.data.id);
    },
    error: function (error) {
      console.log(error);
    },
  });
  $('#exampleModal').modal('show');
  
}

$('#UpdateProgress').submit(function(event) {
  // event.preventDefault(); // Mencegah form untuk melakukan submit pada halaman baru

  let data = {
    id: $('#InputId').val(),
    tgl: $('#InputTgl').val(),
    rak: $('#InputActivities').val(),
    volume : $('#InputVolume').val(),
    satuan : $('#InputUnit').val(),
    waktu : $('#InputCompletion').val()
  };
  console.log(data);

  $.ajax({
    url: '/api/monthly/activity',
      method: 'POST',
      data: data,
    success: function(response) {
      Swal.fire({
          icon: 'success',
          title: 'Succeed',
          text: 'Progres berhasil dikirim ke atasan anda',
        })
        $("#InputActivities").val("");
        $("#InputVolume").val("");
        $("#InputCompletion").val("");
          return;
    },
    error: function(error) {
      console.log(error);
    }
  });
});

