import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts';
import { parse } from "https://deno.land/std@0.95.0/flags/mod.ts"
import * as Style from "https://deno.land/std/fmt/colors.ts";
import * as Helpers from "./helpers.js"

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
```

```
    );
}

let template = Deno.readTextFile("./invoice_templates/sparksuite_simple.html");

// console.log(Style)

// Get data from defaults.json
import { defaults } from "./defaults.js"

let invoice_data = defaults;



// Loop through all categories and fields asking for inputs
for ( let i = 0; i < Object.keys(invoice_data).length; i ++ ) {

    // Category title
    console.log(Style.bold(Style.underline(Object.keys(invoice_data)[i])))

    // Get current property based on loop index
    let current_category = invoice_data[Object.keys(invoice_data)[i]];

    // Loop through all fields of the current property
    for ( let key in current_category.fields ) {
        // If there is no preset value for the given invoice field, ask the user to set one
        if ( !current_category.fields[key].value ) {

            // Generate prompt based on options (set via either config or CLI flags)
            let prompt_text;
            if ( current_category.fields[key].hint && options.hints ) {
                if (options.color) {
                    console.log(Style.italic(Style.dim(current_category.fields[key].hint)))
                } else {
                    console.log(Style.italic(current_category.fields[key].hint))
                }
            }

            // Check if icons are enabled and there is an icon avaliable for the active field
            if ( current_category.fields[key].icon && options.icons ) {
                if (options.color) {
                    // if icons AND color are enabled
                    prompt_text = '    ' + Helpers.colorByName( current_category.color, current_category.fields[key].icon) + " " + key + ':'
                } else {
                    prompt_text = '    ' + current_category.fields[key].icon + " " + key + ':'
                }
            } else {
                prompt_text = '       ' + key + ':'
            }

            if (current_category.fields[key].auto) {
                // If there is an auto function expression avaliable, evaluate it and use it as the automatic suggestion
                current_category.fields[key].value = prompt(prompt_text, current_category.fields[key].auto())
            } else {
                // just prompt
                current_category.fields[key].value = prompt(prompt_text)
            }
        }
    }
}

console.log();
console.log(invoice_data);