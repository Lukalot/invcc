/*
class Invoice {
    constructor (categories) {
        this.categories = categories;
    }
}

class InvoiceCategory {
    constructor (display_name, feilds) {
        this.display_name = display_name;
        this.feilds = feilds;
    }
}

class InvoiceField {
    constructor (dislay_name, value, icon) {
        this.value = value;
        this.icon = icon;
    }
}

let invoice = new Invoice({
    "general_details": new InvoiceCategory( "General Details", {
        "number": new InvoiceField( "Invoice #",  "📟", null),
        "date": new InvoiceField( "Creation Date", "📟", null),
        "due_date": new InvoiceField( "Due Date", "📟", null)
    }),
    "billing": new InvoiceCategory( "Billing", {
        "client": new InvoiceField( "Client Name", "📟", null),
        "company": new InvoiceField( "Company Name", "📟", null),
        "street_address": new InvoiceField( "Billing Street Address", "📟", null),
        "country": new InvoiceField( "Country", "📟", null),
        "city": new InvoiceField( "City", "📟", null)
    }),
    "items_ledger": new InvoiceCategory( "Item Ledger", {
        "items": new InvoiceField( "Items", "📟", null)
    }),
    "miscellaneous": new InvoiceCategory( "Miscellaneous", {
        "note": new InvoiceField( "Note", "📟", null)
    }),
    "totals": new InvoiceCategory( "Totals", {
        "Subtotal": new InvoiceField( "Subtotal", "📟", null,),
        "Discount": new InvoiceField( "", "📟", null),
        "Tax": new InvoiceField( "📟", null),
        "Shipping": new InvoiceField( "📟", null),
        "Total": new InvoiceField( "📟", null)
    })
});*/

// I know this is all horrible:

/*
let invoice_data = {
    "General Details": {
        "Invoice Number": {
            "icon": "📟",
            "value": null
        },
        "Creation Date": null,
        "Due Date": null
    },
    "Billing": {
        "Customer Name": null,
        "Company": null,
        "Billing Street Address": null,
        "Billing Country": null,
        "Billing City": null
    },
    "Item Ledger": {
        "Items": null
    },
    "Miscellaneous": {
        "Note": null
    },
    "Totals": {
        "Subtotal": null,
        "Discount": null,
        "Tax": null,
        "Shipping": null,
        "Total": null
    }
};
*/

// Sequence

console.log(Style.bold(Style.underline('General Details:')));
    invoice_data.invoice_number = numFromStr(prompt('    ' + Style.red('📟') + ' Invoice #:'));
    invoice_data.creation_date = prompt('    ' + Style.red('📆') + ' Date:', datePretty(date.getMonth(), date.getDate(), date.getFullYear()));
    invoice_data.due_date = prompt('    ' + Style.red('📆') + ' Due date:', datePretty((date.getMonth()+1)%12, date.getDate(), date.getFullYear()+Math.floor(date.getMonth()/12)));

console.log(Style.bold(Style.underline('\nBilling:')));
    invoice_data.customer_name = prompt('    ' + Style.green('🧑') + ' Client Name:');
    invoice_data.company = prompt('    ' + Style.green('🏢') + ' Company:');
    invoice_data.billing_address = prompt('    ' + Style.green('📍') + ' Billing Street Address:');
    invoice_data.billing_country = prompt('    ' + Style.green('🌍') + ' Billing Country:');
    invoice_data.billing_city = prompt('    ' + Style.green('🏙️') + '  Billing City:');

console.log(Style.bold(Style.underline('\nItem Ledger:')));
    console.log(Style.italic(Style.dim('List items in the format: Rocket Design, Painting Lesson, Tech Support')));
    invoice_data.items = prompt('    ' + Style.yellow('📦') + ' Items:');

    // Remove empty properties used for console.log
    invoice_data.removeUndefinedProperties();

    // Convert items string array
    invoice_data.items = invoice_data.items.split(',');
    // Cleanup stray whitespace
    invoice_data.items.forEach( (e, index) => { invoice_data.items[index] = e.trim() } );

    invoice_data.item_prices = [];

    console.log('');

    invoice_data.items.forEach( (e, index) => {
        invoice_data.item_prices[index] = numFromStr(prompt('    ' + Style.yellow('💵') + ' Charge for \'' + invoice_data.items[index] + '\'' + ':'));
    } )

    let expected_subtotal = invoice_data.item_prices.reduce((a, b) => { return parseInt(a) + parseInt(b) });

console.log(Style.bold(Style.underline('\nMiscellaneous:')));
    invoice_data.note = prompt('    ' + Style.magenta('📝') + ' Note:');

console.log(Style.bold(Style.underline('\nTotals:')));
    invoice_data.subtotal = numFromStr(prompt('    ' + Style.blue('🧾') + ' Subtotal:', expected_subtotal));
    invoice_data.discount = numFromStr(prompt('    ' + Style.blue('💸') + ' Discount:'));

    console.log(Style.italic(Style.dim('Include percent (%) sign to auto calculate based on a rate.')));
    invoice_data.tax = prompt('    ' + Style.blue('🏛️') + '  Tax:');
    if (invoice_data.tax.includes('%')) {
        invoice_data.tax = numFromStr(invoice_data.tax)
        invoice_data.tax = round(invoice_data.tax * ((invoice_data.subtotal - invoice_data.discount)/100), 2)
    } else {
        invoice_data.tax = numFromStr(invoice_data.tax)
    }

    invoice_data.shipping = numFromStr(prompt('    ' + Style.blue('🚚') + ' Shipping:'));

    invoice_data.total = round(numFromStr(((invoice_data.subtotal - invoice_data.discount) + invoice_data.tax + invoice_data.shipping)), 2);

    console.log('    ' + Style.blue('🧾') + ' Total:' + ' $' + invoice_data.total)


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