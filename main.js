import { parse } from "https://deno.land/std@0.95.0/flags/mod.ts"
import * as Style from "https://deno.land/std/fmt/colors.ts";
import * as Helpers from "./helpers.js"
import * as Mustache from 'https://deno.land/x/mustache/mod.ts';

const { args } = Deno;
const cli_args = parse(args);

// Default options are overriden if necessary
let options = {
    color: true,
    icons: true,
    hints: true
}

// ideally, config should override program defaults,
// then NO_COLOR env variable should override config,
// afterwhich CLI flags can override that

// For now, flags:

if (cli_args.noicon) {
    options.icons = false;
}
if (cli_args.nocolor) {
    options.color = false;
}
if (cli_args.nohint) {
    options.hints = false;
}

if (cli_args.help || cli_args.h) {
    console.log(
        Style.bold(`invcc Help`) +
        `
    --nocolor | disables color in output
    --nohint  | disables hinting in output
    --noicon  | disables field icons in output`);
    Deno.exit(1);
}

// console.log(Style)

// Get data from defaults.json
import { defaults } from "./defaults.js"

let invoice_data = defaults;
let invoice_view = {};

/*
function formatByType (type, data) {
    if (type === 'number') {
        return Helpers.numFromStr(data);
    } else if (type === 'string') {
        return data;
    } else if (type === 'item_list') {
        data = data.split(',');
        // Cleanup stray whitespace
        data.forEach( (e, index) => { data[index] = e.trim() } );
        return data;
    }
}*/

// Loop through all categories and fields asking for inputs
for ( let i = 0; i < Object.keys(invoice_data).length; i ++ ) {

    // newline if not the first category
    (i === 0) ? null : console.log()

    // Category title
    console.log(Style.bold(Style.underline(Object.keys(invoice_data)[i])))

    // Get current property based on loop index
    let current_category = invoice_data[Object.keys(invoice_data)[i]];

    // Loop through all fields of the current property
    for ( let key in current_category.fields ) {

        // Get the current active field
        let current_field = current_category.fields[key];

        // If there is no preset value for the given invoice field, ask the user to set one
        if ( !current_field.value ) {
            // Generate prompt based on options (set via either config or CLI flags)
            let prompt_text;
            if ( current_field.hint && options.hints ) {
                if (options.color) {
                    console.log(Style.italic(Style.dim(current_field.hint)))
                } else {
                    console.log(Style.italic(current_field.hint))
                }
            }

            // Check if icons are enabled and there is an icon avaliable for the active field
            if ( current_field.icon && options.icons ) {
                if (options.color) {
                    // if icons AND color are enabled
                    prompt_text = '    ' + Helpers.colorByName( current_category.color, current_field.icon) + " " + key + ':'
                } else {
                    prompt_text = '    ' + current_field.icon + " " + key + ':'
                }
            } else {
                prompt_text =  '       ' + key + ':'
            }

            if (current_field.auto) {
                // If there is an auto property avaliable, evaluate it and use it as the automatic suggestion
                current_field.value = prompt(prompt_text, current_field.auto(invoice_data))
            } else {
                // just prompt
                current_field.value = prompt(prompt_text)
            }
            
            // format the value data with this field's formatting function
            current_field.value = current_field.format(current_field.value, invoice_data)
            
            if (current_field.format === Helpers.field_type.item_list) {
                console.log();
                current_field.item_prices = [];
                current_field.value.forEach( (e, index) => {
                    current_field.item_prices[index] = Helpers.numFromStr(prompt('    ' + Style.yellow('💵') + ' Charge for \'' + current_field.value[index] + '\'' + ':'));
                } )
            }
        }

        // Add the field to the mustache view for later
        let view_key = key.replace(/\s+/g, '_').toUpperCase();
        invoice_view[view_key] = current_field.value;
    }
}

let template = Deno.readTextFileSync('./invoice_templates/sparksuite_simple.html')

console.log(invoice_view)

var output_invoice = Mustache.render(template, invoice_view);

Deno.writeTextFileSync('./output_invoice.html', output_invoice)