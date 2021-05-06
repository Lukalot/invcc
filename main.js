//import { Handlebars, HandlebarsConfig } from 'https://deno.land/x/handlebars/mod.ts';
import { parse } from "https://deno.land/std@0.95.0/flags/mod.ts"
import * as Style from "https://deno.land/std/fmt/colors.ts"

const { args } = Deno;
const parsedArgs = parse(args);

//console.log(Style)

function monthFromNum (number) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months[number-1];
}

function datePretty (month, date, year) {
    return `${ monthFromNum(month) } ${date}, ${year}`
}

// Helps remove the remains of console.logs() used in the invoice_data decleration later.
Object.prototype.removeUndefinedProperties = function () {
    for (let i = 0; i < Object.keys(this).length; i ++) {
        if (this[Object.keys(this)[i]] === undefined) {
            delete this[Object.keys(this)[i]]
        }
    }
}

let date = new Date();

// Prompt the user for invoice field data
let invoice_data = {
    'hint-1': console.log(Style.bold(Style.underline('Invoice Details:'))),
    invoice_number: prompt('    Invoice #:'),
    creation_date: prompt('    Date:', datePretty(date.getMonth(), date.getDate(), date.getFullYear())),
    due_date: prompt('    Due date:', datePretty((date.getMonth()+1)%12, date.getDate(), date.getFullYear()+Math.floor(date.getMonth()/12))),
    'hint-2': console.log('\nList items in the format: Spaceship, Painting Lesson, Tech Support'), 
    items: prompt('    Items:')
}

// Remove empty properties used for console.log
invoice_data.removeUndefinedProperties();

// Convert items string array
invoice_data.items = invoice_data.items.split(',');
// Cleanup stray whitespace
console.log(invoice_data.items.forEach( (e, index) => { invoice_data.items[index] = e.trim() } ))

console.log(invoice_data)