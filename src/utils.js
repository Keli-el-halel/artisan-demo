import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { format } from "date-fns";
import './index.css'
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';

export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const showToast = (message) => { // ensure that the 'ToastContainer & Slide' are imported somewhere in the js file as well as the ReactToastify css import
    toast(message, {position: 'top-right'});
}

export const returnFormattedDate = (incomingDate, desiredFormat) => {
    let dateReturned = incomingDate ? new Date(incomingDate) : new Date();
    let formatReturned = desiredFormat ? desiredFormat : "MMMM dd, yyyy hh:mm aaaa";
    return format(dateReturned, formatReturned);
}

export const simpleSearch = (word, columns, copyList) => {
    let trimmedList = [];
    copyList.forEach((element) => {
      for (let index = 0; index < columns.length; index++) {
        const column = columns[index];
        if (element[column]) {
            let numtostr = element[column].toString();
            let matchCase = numtostr.toLowerCase();
            if (matchCase.includes(word.toLowerCase())) {
                trimmedList.push(element);        
                return;
            }            
        }                  
      }
    });
    return trimmedList;
}

export const showAlert = (title, message, callbackFunction, yesText, noText, yesPrimary) => {
    confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='modal-ui'>
              <h3>{title}</h3>
              <p className="mb-3">{message}</p>
              <button className={yesPrimary ? "btn btn-outline-primary float-end" : "btn btn-outline-danger float-end"} onClick={() => { callbackFunction(); onClose();}}>{yesText}</button>
              <button className="btn btn-outline-primary float-end me-3" onClick={onClose}>{noText}</button>
            </div>
          );
        }
    });
}

export const fetchFromStorage = (storageLocation) => {
  return sessionStorage.getItem(storageLocation);
}

export const saveInStorage = (storageLocation, data) => {
  sessionStorage.setItem(storageLocation, data);
}