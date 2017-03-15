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
    "dojo/text!./templates/MultipleSelection.html",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/form/Button",
    "ct/_Connect",
    "dijit/form/Select",
    "ct/ui/controls/dataview/DataViewModel",
    "ct/store/ComplexMemory",
    "ct/async"
], function (declare,
        i18n,
        _Widget,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        templateStringContent,
        BorderContainer,
        Button,
        ContentPane, _Connect, d_Select, DataViewModel,
        MemoryStore,
        ct_async
        ) {
    return declare([_Widget, _TemplatedMixin,
        _WidgetsInTemplateMixin, _Connect], {
        templateString: templateStringContent,
        baseClass: "MultipleSelectionWidget",
        constructor: function () {
            this.i18n = i18n;            
            
            /*this._dataViewStore = new MemoryStore({
                idProperty: "id",
                getMetadata: function() {
                    return {
                        fields: [
                            {
                                "name": "id",
                                "title": "ID"
                            },
                            {
                                "name": "title",
                                "title": "Title",
                                "type": "string"
                            },
                            {
                                "name": "description",
                                "title": "Description",
                                "type": "string"
                            }
                        ]
                    };
                }
            });*/
        },
        postCreate: function () {
            /*var model = this.dataViewModel = new DataViewModel({
                store: this._dataViewStore
            });
            var dataView = this.dataView;
            dataView.set("model", model);*/
            this.inherited(arguments);
        },
        resize: function (dims) {
            this._container.resize(dims);
        },
        onShowResultClick: function () {
           
        },
        addResult: function (result) {
            
        }
    });
});
		