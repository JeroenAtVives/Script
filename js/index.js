/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);

        // Opties initialiseren.
        var options      = new ContactFindOptions();
        options.filter   = "";
        options.multiple = true; // Dubbele contacten mogen er tussen zitten.
        // Enkel het id, naam en phonenumber worden teruggegeven van het contact.
        options.desiredFields = [navigator.contacts.fieldType.id, navigator.contacts.fieldType.name, navigator.contacts.fieldType.phoneNumbers]; 
        options.hasPhoneNumber = true;
        var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name]; // Zoeken op displaynaam en naam.
        navigator.contacts.find(fields, onSuccess, onError, options); 
    }
};

// Callback wordt opgeroepen indien de contacten succesvol uit de database gehaald zijn.
function onSuccess(contacts) {
    // De select tag opvragen.
    var contactenLijst = document.getElementById('contactenLijst');

    contacts.forEach(function(element) {   // ForEach voor elk contact toe te voegen aan de contactenlijst.

        // Maak een option element aan en stel de inhoud gelijk aan de contactnaam.
        var option = document.createElement("option"); 
        option.text = element.displayName;

        // Attributen toevoegen aan de "option", makkelijk om later het telefoonnummer en de contactnaam op te vragen.
        // Anders moet de volledige array 'contacts' gecontroleerd worden.
        option.setAttribute("phonenumber", element.phoneNumbers[0].value); 
        option.setAttribute("ContactName" , element.displayName);
        //console.log(element);

        // Het effectief toevoegen van de optie aan de selectie.
        contactenLijst.appendChild(option);
    });
};

// Callback voor als er iets foutgelopen is bij het uitlezen van de contacten.
function onError(contactError) {
    alert('onError!');
};

document.getElementById("contactenLijst").addEventListener("change", contactSelecteren);

function contactSelecteren() {

    // De index van de geselecteerde contact opvragen.
    var selectedItemIndex = document.getElementById("contactenLijst").options.selectedIndex;

    // Een object maken met daarin de gegevens van de te contacteren persoon.
    var contact = {
        contactnaam : document.getElementById("contactenLijst").options[selectedItemIndex].getAttribute("ContactName"),
        mobile : document.getElementById("contactenLijst").options[selectedItemIndex].getAttribute("phonenumber")
    }

    // De info van de contactpersoon tonen...
    document.getElementById("naam").innerHTML = "Selected contact: "+contact.contactnaam;
    document.getElementById("telefoonnummerBellen").setAttribute("href","tel:"+contact.mobile);
    document.getElementById("telefoonnummerBericht").setAttribute("href","sms:"+contact.mobile);
    document.getElementById("contactYourContact").setAttribute("class","row d-flex justify-content-center bg-dark")
  }

app.initialize();