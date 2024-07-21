import moment from "moment";
import numeral from "numeral";

export const Date = ({ value }) => {
    const date = moment(value);
    const DateFormat = date.format("DD/MM/YYYY");
    return DateFormat;
};

export const DateTime = ({ value }) => {
    const date = moment(value);
    const DateFormat = date.format("DD/MM/YYYY HH:mm");
    return DateFormat;
};

export const Number = ({ value }) => {
    const numeroCedula = value;
    const NumberFormat = `${numeral(numeroCedula).format("0,0")}`;
    return NumberFormat.split(",").join(".");
};

export const DocumentIdentity = ({ value }) => {
    const numeroCedula = value;
    const NumberFormat = `V-${numeral(numeroCedula).format("0,0")}`;
    return NumberFormat.split(",").join(".");
};

export const FillZero = ({ value, amount = 6 }) => {
    const numero = value;
    return numero.toString().padStart(amount, "0");
};

export default { Number, Date, DocumentIdentity, DateTime, FillZero };
