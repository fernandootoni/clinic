import * as Toastify from 'toastify-js'

export class ToastifyHelper {
  showMessage(text: string, className: string, duration: number) {
    // console.log("Text length: " + text.length)
    // console.log(text)
    Toastify({
      text,
      className: `${className} toastify-default`,
      duration,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      offset: {
        x: 0,
        y: 35
      },
      stopOnFocus: true,
      onClick: function(){}
    }).showToast();
  }
}