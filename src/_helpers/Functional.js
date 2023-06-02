import React from "react";
import Toastify from "toastify-js";

export const handleToaster = (message = '', type = 'default') => {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        gravity: 'bottom',
        position: 'center',
        stopOnFocus: true,
        style: {
            background: type === 'danger' ? "linear-gradient(to right, #f85032, #e73827)" : "",
            marginBottom: "20px"
        }
    }).showToast();
}

export const slugify = (str) => {
    if(str) {
      str = str.replace(/^\s+|\s+$/g, ''); // trim
      str = str.toLowerCase(); // lowercase
      str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes
      return str;
    }
    return '';
  }

