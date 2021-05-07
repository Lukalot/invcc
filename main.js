import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts';
import { parse } from "https://deno.land/std@0.95.0/flags/mod.ts"
import * as Style from "https://deno.land/std/fmt/colors.ts";

const { args } = Deno;
const cli_args = parse(args);

// Default options are overriden if necessary
let options = {
    color: true,
    icons: true,
}

// ideally, config should override program defaults,
// then NO_COLOR env variable should override config,
// afterwhich CLI flags can override that

// For now, flags:

if (cli_args.i) {
    options.icons = false;
}
if (cli_args.c) {
    options.color = false;
}

let template = Deno.readTextFile("./invoice_templates/sparksuite_simple.html");

// console.log(Style)

function monthFromNum (number) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months[number-1];
}

function datePretty (month, date, year) {
    return `${ monthFromNum(month) } ${date}, ${year}`
}

function round (number, decimalPlaces) {
    const factorOfTen = Math.pow(10, decimalPlaces);
    return Math.round(number * factorOfTen) / factorOfTen;
}

function numFromStr(str) {
    if (typeof str === 'string') {
        return Number(str.replace(/[^0-9.]/g, ''));
    } else {
        return str
    }
}


// Helps remove the remains of console.logs() used in the invoice_data decleration later.
function removeUndefinedProperties (object) {
    for (let i = 0; i < Object.keys(object).length; i ++) {
        if (object[Object.keys(object)[i]] === undefined) {
            delete object[Object.keys(object)[i]]
        }
    }
}

let date = new Date();

// Get data from defaults.json
const decoder = new TextDecoder('utf-8')
let defaults = JSON.parse(
    decoder.decode( await Deno.readFile("./defaults.json") )
);

let invoice_data = defaults;

function colorByName (name, string) {
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

// Loop through all categories and fields asking for inputs
for ( let i = 0; i < Object.keys(invoice_data).length; i ++ ) {

    // Category title
    console.log(Style.bold(Style.underline(Object.keys(invoice_data)[i])))

    // Get current property based on loop index
    let current_category = invoice_data[Object.keys(invoice_data)[i]];

    // Loop through all fields of the current property
    for ( let key in current_category.fields ) {
        if ( !current_category.fields[key].value ) {
            let prompt_text;
            if ( current_category.fields[key].hint && options.hints ) {
                if (options.color) {
                    console.log(Style.italic(Style.dim(current_category.fields[key].hint)))
                } else {
                    console.log(Style.italic(current_category.fields[key].hint))
                }
            }
            if ( current_category.fields[key].icon && options.icons ) {
                if (options.color) {
                    prompt_text = '    ' + colorByName( current_category.color, current_category.fields[key].icon) + " " + key + ':'
                } else {
                    prompt_text = '    ' + current_category.fields[key].icon + " " + key + ':'
                }
            } else {
                prompt_text = '       ' + key + ':'
            }
            current_category.fields[key].value = prompt(prompt_text)
        }
    }
}

console.log();
console.log(invoice_data);