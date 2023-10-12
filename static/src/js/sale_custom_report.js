odoo.define('odoo_js.sale_custom_report', function (require) {
    'use strict';
    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    var rpc = require('web.rpc');
    var QWeb = core.qweb;
    var SaleCustomReport = AbstractAction.extend({
        template: 'SaleCustomReport',
        events: {
        },
        init: function(parent, action) {
            this._super(parent, action);
        },
        start: function() {
            var self = this;
            self.load_data();
        },
        load_data: function () {
            var self = this;
            self._rpc({
                model: 'sale.order',
                method: 'get_sale_order',
                args: [],
            }).then(function(datas) {
                self.$('.table_view').html(QWeb.render('SaleTable', {
                    report_lines : datas,
                }));
            });
        },
    });
    core.action_registry.add("sale_custom_report", SaleCustomReport);
    return SaleCustomReport;
});