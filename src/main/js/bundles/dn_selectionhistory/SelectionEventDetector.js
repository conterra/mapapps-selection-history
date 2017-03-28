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
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define([
    "dojo/_base/declare",
    "dojo/_base/lang"
], function (declare, d_lang) {
    return declare([], {
        handleEvent: function (evt) { 
            if(evt.getProperties().postedBy && evt.getProperties().postedBy === "dn_selectionhistory"){
                return;
            }
            if(evt.getProperties().store.idList.length < 1){
                return;
            }
            this.resultOverviewWidget.addResult(evt.getProperties());
        }        
    });
});

