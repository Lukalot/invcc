
/* invcc defaults config
 *
 * If you have a problem with how long these lines are,
 * then set your IDE to wrap them or something idk.
 * 
 * Here's how this works
 * Each category and field are included in the 'defaults' object.
 * 
 * Categories:
 *  - color, you can change the color value to any of red, green, blue, magenta, yellow, ... to change the categories color when color is enabled
 * 
 * Fields:
 *  - icon, an emoji displayed next to the field name when icons are enabled
 *  - type, the field type. Changes how the input is saved. The following types are avaliable: string, number (TODO: date, price)
 *  - hint, a hint that will appear above the prompt if hints are enabled
 *  - auto, or Automatic suggestion. This is an expression/value which is avaliable next to the prompt during invoice creation, and can be accepted by pressing enter without entering a new value.
 *  - value, or override value. This value will be used if avaliable.
 * If value is set to anything other than null, the value will be skipped when filling invoices.
 * I would recommend simply setting autos for many settings you might be tempted to preset 'value' for
 * to allow for further flexibility during creation.
 * 
*/

import * as Helpers from './helpers.js'

export let defaults = {
    'General Details': {
        color: 'red',
        fields: {
            'Invoice Number': {
                icon: '📟',
                type: 'number',
            },
            'Creation Date': {
                icon: '📆',
                type: 'string',
                auto: () => Helpers.datePretty(Helpers.date.getMonth(), Helpers.date.getDate(), Helpers.date.getFullYear()),
            },
            'Due Date': {
                icon: '📆',
                type: 'string',
                auto: () => Helpers.datePretty((Helpers.date.getMonth()+1)%12, Helpers.date.getDate(), Helpers.date.getFullYear()+Math.floor(Helpers.date.getMonth()/12)),
            }
        }
    },
    'Issuer': {
        'color': 'blue',
        'fields': {
            'Name': {
                icon: '🧑',
                type: 'string',

                // If a 'value' property is filled on a field, it will automatically be used instead of prompting the user
                value: ''
            },
            'Address': {
                icon: '📍',
                type: 'string',
            },
            'Phone Number': {
                icon: '📞',
                type: 'string',
            },
            'Email Address': {
                icon: '📧',
                type: 'string',
                auto: () => 'example@email.com' // Simple auto suggestion, ideally you can put your address here. Or, you can replace this with a `value:` setting
            }
        }
    },
    'Billing': {
        'color': 'green',
        'fields': {
            'Customer Name': {
                icon: '🧑',
                type: 'string',
            },
            'Company': {
                icon: '🏢',
                type: 'string',
            },
            'Billing Street Address': {
                icon: '📍',
                type: 'string',
            },
            'Billing Country': {
                icon: '🌍',
                type: 'string',
                
            },
            'Billing City': {
                icon: '🏙️ ',
                type: 'string',
            }
        }
    },
    'Item Ledger': {
        'color': 'yellow',
        'fields': {
            'Items': {
                icon: '📦',
                type: 'string',
                hint: 'List items in the format: Rocket Design, Painting Lesson, Tech Support'
            }
        }
    },
    'Miscellaneous': {
        'color': 'magenta',
        'fields': {
            'Note': {
                icon: '📝',
                type: 'string',
            }
        }
    },
    'Totals': {
        'color': 'blue',
        'fields': {
            'Subtotal': {
                icon: '🧾',
                type: 'number',
            },
            'Discount': {
                icon: '💸',
                type: 'number',
            },
            'Tax': {
                icon: '🏛️ ',
                type: 'number',
                hint: 'Include percent (%) sign to auto calculate based on a rate.'
            },
            'Shipping': {
                icon: '🚚',
                type: 'number',
            },
            'Total': {
                icon: '🧾',
                type: 'number',
            }
        }
    }
}