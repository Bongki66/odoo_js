odoo.define('odoo_js.sale_custom_report', function (require) {
    'use strict';
    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    var rpc = require('web.rpc');
    var QWeb = core.qweb;
    var _t = core._t;
    var SaleCustomReport = AbstractAction.extend({
        template: 'SaleCustomReport',
        events: {
            'click .o_so_data': '_onSoDataClicked',
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

        _onSoDataClicked: function (event) {
            // stopPropagation: agar tidak mengaktifkan action yang lain
            // contoh:
            // <div onclick="functionOne">
            //      <div onclick="functionTwo"></div>
            // </div>
            // agar tidak menjalankan functionOne, functionTwo perlu ditambahkan stopPropagation
            event.stopPropagation();
            console.log('click so data');
            var so_id = $(event.currentTarget).data('res-id');
            console.log('so_id: '+so_id);
            return this.do_action({
                name: _t('Sale Order'),
                type: 'ir.actions.act_window',
                res_model: 'sale.order',
                res_id: so_id,
                views: [[false, 'form']],
                view_mode: 'form',
                target: 'current',
            });
        },
    });
    core.action_registry.add("sale_custom_report", SaleCustomReport);
    return SaleCustomReport;
});