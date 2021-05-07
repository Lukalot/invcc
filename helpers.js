
import * as Style from "https://deno.land/std/fmt/colors.ts";

export let date = new Date();

export function monthFromNum (number) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months[number-1];
}

export function datePretty (month, date, year) {
    return `${ monthFromNum(month) } ${date}, ${year}`
}

export function round (number, decimalPlaces) {
    const factorOfTen = Math.pow(10, decimalPlaces);
    return Math.round(number * factorOfTen) / factorOfTen;
}

export function numFromStr(str) {
    if (typeof str === 'string') {
        return Number(str.replace(/[^0-9.]/g, ''));
    } else {
        return str
    }
}

// Helps remove the remains of console.logs() used in the invoice_data decleration later.
export function removeUndefinedProperties (object) {
    for (let i = 0; i < Object.keys(object).length; i ++) {
        if (object[Object.keys(object)[i]] === undefined) {
            delete object[Object.keys(object)[i]]
        }
    }
}

export function colorByName (name, string) {
    switch(name) {
        case "blue":
            return Style.blue(string)
            break;
        case "green":
            return Style.green(string)
            break;
        case "magenta":
            return Style.magenta(string)
            break;
        case "red":
            return Style.red(string)
            break;
        case "yellow":
            return Style.yellow(string)
            break;
    }
}

export let field_type = {
    number: function (value) {
        return numFromStr(value);
    },
    string: function (value) {
        return value;
    },
    item_list: function (value) {
        value = value.split(',');
        // Cleanup stray whitespace
        value.forEach( (e, index) => { value[index] = e.trim() } );
        return value;
    },
    tax: function (value, data) {
        if (value.includes('%')) {
            value = numFromStr(value)
            value = round(value * ((data['Totals'].fields.Subtotal.value - data['Totals'].fields.Discount.value)/100), 2)
            return value;
        } else {
            value = numFromStr(value)
            return value;
        }
    }
}