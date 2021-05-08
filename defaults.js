
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
 *  - format, the field format. Changes how the input is saved. The following formats are avaliable: string, number (TODO: date, price)
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
                format: Helpers.field_type.number,
            },
            'Creation Date': {
                icon: '📆',
                format: Helpers.field_type.string,
                auto: () => Helpers.datePretty(Helpers.date.getMonth(), Helpers.date.getDate(), Helpers.date.getFullYear()),
            },
            'Due Date': {
                icon: '📆',
                format:  Helpers.field_type.string,
                auto: () => Helpers.datePretty((Helpers.date.getMonth()+1)%12, Helpers.date.getDate(), Helpers.date.getFullYear()+Math.floor(Helpers.date.getMonth()/12)),
            }
        }
    },
    'Issuer': {
        'color': 'blue',
        'fields': {
            'Issuer Name': {
                icon: '🧑',
                format: Helpers.field_type.string,

                // If a 'value' property is filled on a field, it will automatically be used instead of prompting the user
                value: ''
            },
            'Issuer Address': {
                icon: '📍',
                format: Helpers.field_type.string,
            },
            'Issuer Phone Number': {
                icon: '📞',
                format: Helpers.field_type.string,
            },
            'Issuer Email Address': {
                icon: '📧',
                format: Helpers.field_type.string,
                auto: () => 'example@email.com' // Simple auto suggestion, ideally you can put your address here. Or, you can replace this with a `value:` setting
            }
        }
    },
    'Billing': {
        'color': 'green',
        'fields': {
            'Client Name': {
                icon: '🧑',
                format: Helpers.field_type.string,
            },
            'Client Company': {
                icon: '🏢',
                format: Helpers.field_type.string,
            },
            'Billing Street Address': {
                icon: '📍',
                format: Helpers.field_type.string,
            },
            'Billing Country': {
                icon: '🌍',
                format: Helpers.field_type.string,
                
            },
            'Billing City': {
                icon: '🏙️ ',
                format: Helpers.field_type.string,
            }
        }
    },
    'Item Ledger': {
        'color': 'yellow',
        'fields': {
            'Items': {
                icon: '📦',
                format: Helpers.field_type.item_list,
                hint: 'List items in the format: Rocket Design, Painting Lesson, Tech Support'
            },
        }
    },
    'Miscellaneous': {
        'color': 'magenta',
        'fields': {
            'Note': {
                icon: '📝',
                format: Helpers.field_type.string,
            }
        }
    },
    'Totals': {
        'color': 'blue',
        'fields': {
            'Subtotal': {
                icon: '🧾',
                format: Helpers.field_type.number,
                auto: (data) => data['Item Ledger'].fields.Items.item_prices.reduce((a, b) => { return parseInt(a) + parseInt(b) })
            },
            'Discount': {
                icon: '💸',
                format: Helpers.field_type.number,
            },
            'Tax': {
                icon: '🏛️ ',
                format: Helpers.field_type.tax,
                hint: 'Include percent (%) sign to auto calculate based on a rate. (todo)'
            },
            'Shipping': {
                icon: '🚚',
                format: Helpers.field_type.number,
            },
            'Total': {
                icon: '🧾',
                format: Helpers.field_type.number,
                auto: (data) => {
                    return data['Totals'].fields.Subtotal.value
                         - data['Totals'].fields.Discount.value
                         + data['Totals'].fields.Tax.value
                         + data['Totals'].fields.Shipping.value
                }
            }
        }
    }
}

