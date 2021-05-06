import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts';
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

let invoice_data = {};

console.log(Style.bold(Style.underline('General Details:')));
invoice_data.invoice_number = prompt('    ' + Style.red('📟') + ' Invoice #:');
invoice_data.creation_date = prompt('    ' + Style.red('📆') + ' Date:', datePretty(date.getMonth(), date.getDate(), date.getFullYear()));
invoice_data.due_date = prompt('    ' + Style.red('📆') + ' Due date:', datePretty((date.getMonth()+1)%12, date.getDate(), date.getFullYear()+Math.floor(date.getMonth()/12)));

console.log(Style.bold(Style.underline('\nBilling:')));
invoice_data.customer_name = prompt('    ' + Style.green('🧑') + ' Customer Name:');
invoice_data.company = prompt('    ' + Style.green('🏢') + ' Company:');
invoice_data.billing_address = prompt('    ' + Style.green('🌍') + ' Billing Address:');
invoice_data.billing_country = prompt('    ' + Style.green('📍') + ' Billing Country:');
invoice_data.billing_city = prompt('    ' + Style.green('🏙️') + '  Billing City:');

console.log(Style.bold(Style.underline('\nItem Ledger:')));
invoice_data.items = prompt('    ' + Style.yellow('📦') + ' Items:');

console.log(Style.bold(Style.underline('\nTotals:')))
invoice_data.subtotal = prompt('    ' + Style.blue('🧾') + ' Subtotal:');
invoice_data.tax = prompt('    ' + Style.blue('🏛️') + '  Tax:');
invoice_data.shipping = prompt('    ' + Style.blue('🚚') + ' Shipping:');

// Prompt the user for invoice field data
/*
let invoice_data2 = {
    'general-section': console.log(Style.bold(Style.underline('General Details:'))),
        invoice_number: prompt('    ' + Style.red('📟') + ' Invoice #:'),
        creation_date: prompt('    ' + Style.red('📆') + ' Date:', datePretty(date.getMonth(), date.getDate(), date.getFullYear())),
        due_date: prompt('    ' + Style.red('📆') + ' Due date:', datePretty((date.getMonth()+1)%12, date.getDate(), date.getFullYear()+Math.floor(date.getMonth()/12))),

    'bill-to': console.log(Style.bold(Style.underline('\nBilling:'))),
        customer_name: prompt('    ' + Style.green('🧑') + ' Customer Name:'),
        company: prompt('    ' + Style.green('🏢') + ' Company:'),
        billing_address: prompt('    ' + Style.green('🌍') + ' Billing Address:'),
        billing_country: prompt('    ' + Style.green('📍') + ' Billing Country:'),
        billing_city: prompt('    ' + Style.green('🏙️') + '  Billing City:'),
    
    'items-section': console.log(Style.bold(Style.underline('\nItem Ledger:'))),
        'items-section': console.log(Style.italic('List items in the format: Rocket Design, Painting Lesson, Tech Support')), 
        items: prompt('    ' + Style.yellow('📦') + ' Items:'),

    'totals': console.log(Style.bold(Style.underline('\nTotals:'))),
        subtotal: prompt('    ' + Style.blue('🧾') + ' Subtotal:'),
        tax: prompt('    ' + Style.blue('🏛️') + '  Tax:'),
        shipping: prompt('    ' + Style.blue('🚚') + ' Shipping:')

}*/

// Remove empty properties used for console.log
invoice_data.removeUndefinedProperties();

// Convert items string array
invoice_data.items = invoice_data.items.split(',');
// Cleanup stray whitespace
invoice_data.items.forEach( (e, index) => { invoice_data.items[index] = e.trim() } )

console.log(invoice_data)