export let defaults = {
    "General Details": {
        color: "red",
        fields: {
            "Invoice Number": {
                icon: "📟",
                type: "number",
                value: null
            },
            "Creation Date": {
                icon: "📆",
                type: "string",
                value: null
            },
            "Due Date": {
                icon: "📆",
                type: "string",
                value: null
            }
        }
    },
    "Issuer": {
        "color": "blue",
        "fields": {
            "Name": {
                icon: "🧑",
                type: "string",
                value: null
            },
            "Address": {
                icon: "📍",
                type: "string",
                value: null
            },
            "Phone Number": {
                icon: "📞",
                type: "string",
                value: null
            },
            "Email Address": {
                icon: "📧",
                type: "string",
                value: null
            }
        }
    },
    "Billing": {
        "color": "green",
        "fields": {
            "Customer Name": {
                icon: "🧑",
                type: "string",
                value: null
            },
            "Company": {
                icon: "🏢 ",
                type: "string",
                value: null
            },
            "Billing Street Address": {
                icon: "📍",
                type: "string",
                value: null
            },
            "Billing Country": {
                icon: "🌍",
                type: "string",
                value: null
            },
            "Billing City": {
                icon: "🏙️ ",
                type: "string",
                value: null
            }
        }
    },
    "Item Ledger": {
        "color": "yellow",
        "fields": {
            "Items": {
                icon: "📦",
                type: "string",
                value: null
            }
        }
    },
    "Miscellaneous": {
        "color": "magenta",
        "fields": {
            "Note": {
                icon: "📝",
                type: "string",
                value: null
            }
        }
    },
    "Totals": {
        "color": "blue",
        "fields": {
            "Subtotal": {
                icon: "🧾",
                type: "number",
                value: null
            },
            "Discount": {
                icon: "💸",
                type: "number",
                value: null
            },
            "Tax": {
                icon: "🏛️ ",
                type: "number",
                value: null
            },
            "Shipping": {
                icon: "🚚",
                type: "number",
                value: null
            },
            "Total": {
                icon: "🧾",
                type: "number",
                value: null
            }
        }
    }
}