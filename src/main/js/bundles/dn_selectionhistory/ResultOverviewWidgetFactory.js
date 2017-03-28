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
    "dojo/_base/array",
    "dojo/dom-class",
    "dojo/dom-style",
    "./ResultOverviewWidget"
], function (declare,
        i18n,
        d_array,
        dom_class,
        dom_style,
        ResultOverviewWidget) {
    return declare([], {
        results: [],
        constructor: function () {

        },
        createInstance: function () {
            this.inherited(arguments);
            return this.widget;
        },
        activate: function () {            
            this.inherited(arguments);
            var i18n = this._i18n.get();            
            var widget = this.widget = new ResultOverviewWidget({
                source: this,
                i18n: i18n
            });
            widget.resize();
        },
        /*         
         * TODO: attach dataview to resultcenter instead of posting new event
         */
        postEvent: function (properties) {            
            this._eventService.postEvent("ct/selection/SELECTION_END",
                    {                        
                        source: properties.source,
                        store: properties.store,
                        postedBy: "dn_selectionhistory"
                    }
            );
        },
        _addResult: function (result){            
            result.extent = this._mapState.getExtent();
            this.results.push(result);
        },
        _onShowResultClick: function(index) {
            //var extent = this.results[index].store.getInitialQuery().query.geometry.$intersects.getExtent();
            /*
             * currently uses the extent of the moment the selection was made, not the extent of selected features
             */
            this._mapState.setExtent(this.results[index].extent);
            this.postEvent(this.results[index]);
        },
        _clearResults: function(){
            this.results = [];            
        }
    });
});
		