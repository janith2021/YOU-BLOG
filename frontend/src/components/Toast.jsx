import Swal from 'sweetalert2'
export const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  })

