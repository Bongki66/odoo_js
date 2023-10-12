{
    "name": "ODOO JS",
    "version": "1.0.0",
    "category": "Customizations",
    "license": "AGPL-3",
    "summary": "Odoo JS",
    "author": "AWH",
    "website": "",
    "depends": ["sale_stock"],
    "data": [
        # views
        'views/report_views.xml',
    ],
    "assets": {
        'web.assets_backend': [
            'odoo_js/static/src/js/**/*',
        ],
        'web.assets_qweb': [
            'odoo_js/static/src/xml/**/*',
        ],
    },
}
