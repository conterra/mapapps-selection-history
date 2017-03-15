/*
 * Copyright (C) 2015 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
    "dojo/_base/declare",
    "dojo/i18n!./nls/bundle",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/ResultOverview.html",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/form/Button",
    "ct/_Connect",
    "dijit/form/Select"
], function (declare,
        i18n,
        _Widget,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        templateStringContent,
        BorderContainer,
        Button,
        ContentPane, _Connect, d_Select) {
    return declare([_Widget, _TemplatedMixin,
        _WidgetsInTemplateMixin, _Connect], {
        templateString: templateStringContent,
        baseClass: "ResultOverviewWidget",
        constructor: function () {
            this.i18n = i18n;
        },
        postCreate: function () {

            this._select = new d_Select({
                name: "selectResult",
                style: "width: 250px;",
                maxHeight: "160",
                autoWidth: false,
                emptyLabel: i18n.emptyLabel,
                options: []
            }, this._selectNode1);

            this.inherited(arguments);
        },
        resize: function (dims) {
            this._container.resize(dims);
        },
        onShowResultClick: function () {
            var index = this._select.get("value");
            if (index === "")
                return;
            this.source._onShowResultClick(index);
        },
        addResult: function (result) {            
            this.source._addResult(result);            
            //var time = result.Timestamp.toLocaleTimeString();
            var name = result.store.getMetadata().title ? result.store.getMetadata().title : "";
            var index = this.source.results.length - 1;
            var option = {label: name, value: index};
            this._select.addOption(option);
        },
        clearResults: function(){
            console.log(this._select);
            //this._select.reset();
            this._select.removeOption(this._select.getOptions());            
            this.source._clearResults();
        }
    });
});
		