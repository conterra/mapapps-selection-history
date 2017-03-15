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
    "./MultipleSelectionWidget",
    "ct/mapping/geometry",
    "ct/_Connect",
    "apprt/ServiceResolver"
], function (declare,
        i18n,
        d_array,
        dom_class,
        dom_style,
        MultipleSelectionWidget,
        ct_geometry,
        _Connect,
        ServiceResolver) {
    return declare([_Connect], {
        _drawController: undefined,
        clickTolerance: 0,
        storeIds: [],
        activator: null,
        deactivator: null,
        constructor: function () {

        },
        createInstance: function () {
            this.inherited(arguments);
            return this.widget;
        },
        activate: function (componentContext) {           
            var serviceResolver = this.serviceResolver = new ServiceResolver();
            var bundleCtx = componentContext.getBundleContext();
            serviceResolver.setBundleCtx(bundleCtx);
            this.inherited(arguments); 
            this._init();           
        },
        _init: function(){
            var i18n = this._i18n.get();
            var widget = this.widget = new MultipleSelectionWidget({
                source: this,
                i18n: i18n
            });
            widget.resize();           
            this.deactivator = this.connect(this._tool, "onDeactivate", this.deactivateWidget);
            this.activator = this.connect(this._tool, "onActivate", this.activateWidget);
        },
        activateWidget: function () {
            this.disconnect();
            var geoType = "Extent";
            var drawController = this._drawController;
            drawController["activateDraw" + geoType]();
            this.connect("draw", drawController, "onGeometryDrawn", this._handleGeometrySelection);
            this._init();
        },
        deactivateWidget: function () {            
            this.deactivator.disconnect(),
                    this._drawController.deactivateDraw();
            this._tool.set("active", false);           
            this.disconnect(this.deactivator);
        },
        addMultipleSelectionStore: function (store, serviceproperties) {
            /*
             * TODO: add to dataview
             */                        
            var storeId = serviceproperties.id;
            this.storeIds.push(storeId);
        },
        _handleGeometrySelection: function (evt) {
            if (evt.graphic) {
                return;
            }
            var geometry = this._getGeometryFromEvent(evt);
            this.resultOverviewWidget.clearResults();
            this._performSelection(geometry, this._properties.operator, 0);
        },
        _getGeometryFromEvent: function (evt) {
            var geom = evt.geometry;
            //currently only supports extent
            /*if (this.clickTolerance && parameter.geoType === "Point" && this._mapState) {
             geom = this._calcExtentWithPixelTolerance(geom, this.clickTolerance);
             }*/
            return geom;
        },
        /*
         * for geometry 'point', not implemented yet
         */
        _calcExtentWithPixelTolerance: function (geoPoint, clickTolerance) {
            var viewport = this._mapState.getViewPort();
            return viewport.toGeo(ct_geometry.createExtent({
                center: viewport.screen.getCenter(),
                width: clickTolerance,
                height: clickTolerance
            })).centerAt(geoPoint);
        },
        getStore: function (id) {
            return this.serviceResolver.getService("ct.api.Store", "(id=" + id + ")");
        },
        _performSelection: function (geometry, geomRel, storeIdIndex) {

            if (storeIdIndex > this.storeIds.length - 1) {                
                storeIdIndex = 0;
                return;
            }
            var selectionAction = this.selectionAction;
            var store = this.getStore(this.storeIds[storeIdIndex]);
            var storeId = store.id;
            selectionAction.selectionParameter = {};
            selectionAction.selectionParameter.store = store;
            selectionAction.selectionParameter.storeId = storeId;
            selectionAction.selectionParameter.operator = geomRel;
            selectionAction.performSelection(geometry);
            var _this = this;
            var selectionEnd = this.connect(selectionAction, "onSelectionEnd", function (evt) {
                _this.disconnect(selectionEnd);
                if (storeId && storeId === evt.source.selectionParameter.storeId) {
                    _this._performSelection(geometry, geomRel, ++storeIdIndex);
                }
            });
        }
    });
});
		