// https://jqueryui.com/tooltip/ 
// The class "highlight" used here is predefined in JQuery UI
// the message of the tooltip is encoded in the input (in the HTML file)
$("#creditCard").tooltip({
    classes: {
    "ui-tooltip": "highlight"
    }
});

// Look at the different events on which an action can be performed
// https://www.w3schools.com/jquery/jquery_events.asp
// Here, we put 

//CREDIT CARD
$("#creditCard").on("mouseenter", function(){
    $("#creditCard").addClass("showInput");
});

$("#creditCard").on("mouseleave", function(){
    $("#creditCard").removeClass("showInput");
});

//NAME
$("#name").on("mouseenter", function(){
    $("#name").addClass("showInput");
});

$("#name").on("mouseleave", function(){
    $("#name").removeClass("showInput");
});

//EMAIL
$("#exampleInputEmail1").on("mouseenter", function(){
    $("#exampleInputEmail1").addClass("showInput");
});

$("#exampleInputEmail1").on("mouseleave", function(){
    $("#exampleInputEmail1").removeClass("showInput");
});

//PHONE
$("#phoneNumber").on("mouseenter", function(){
    $("#phoneNumber").addClass("showInput");
});

$("#phoneNumber").on("mouseleave", function(){
    $("#phoneNumber").removeClass("showInput");
});

//MECHANIC
$("#mechanics").on("mouseenter", function(){
    $("#mechanics").addClass("showInput");
});

$("#mechanics").on("mouseleave", function(){
    $("#mechanics").removeClass("showInput");
});

//DATE
$("#dateTimeInput").on("mouseenter", function(){
    $("#dateTimeInput").addClass("showInput");
});

$("#dateTimeInput").on("mouseleave", function(){
    $("#dateTimeInput").removeClass("showInput");
});

// Function to verify that the phone number is correct.
// Here, I validate for (12345), but you have to change that for a phone validation
// Tutorials on Regular expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions 
// https://flaviocopes.com/javascript-regular-expressions/ 
// Regular expressions can get complex, you can think in terms of a series of characters
// or numbers 
function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits

    //REGEX was inpsired from https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript

    //valid formats
    // (xxx) xxx-xxxx
    // (xxx)xxx-xxxx
    // xxx-xxx-xxxx
    // xxx.xxx.xxxx
    // xxxxxxxxxx
    // +xxxxxxxxxx
    // xxx-xxxxxxx

    var filter = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

function validateCreditCard(txtCreditCard) {
    var a = document.getElementById(txtCreditCard).value;

    //REGEX was inspired from https://stackoverflow.com/questions/48586735/javascript-regex-to-find-credit-card-number-in-string-and-mask/48586929

    var filter = /\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

function validateEmail(txtEmail) {
    var a = document.getElementById(txtEmail).value;

    //REGEX was inspired from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

    var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

// phone validation, it calls validatePhone
// and also some feedback as an Alert + putting a value in the input that shows the format required
// the "addClass" will use the class "error" defined in style.css and add it to the phone input
// The "error" class in style.css defines yellow background and red foreground

// following code inspired from https://stackoverflow.com/questions/9232810/change-placeholder-text-using-jquery
$("#phoneNumber").on("change", function(){
    if (!validatePhone("phoneNumber")){
        alert("Wrong format for phone number.");
        $("#phoneNumber").val("");
        $("#phoneNumber").attr("placeholder", "xxx-xxx-xxxx");
        $("#phoneNumber").addClass("error");
    }
    else {
        $("#phoneNumber").removeClass("error");
    }
});

// credit card validation
$("#creditCard").on("change", function(){
    if (!validateCreditCard("creditCard")){
        alert("Wrong format for credit card number.");
        $("#creditCard").val("");
        $("#creditCard").attr("placeholder", "xxxx-xxxx-xxxx-xxxx");
        $("#creditCard").addClass("error");
    }
    else {
        $("#creditCard").removeClass("error");
    }
});

//email validation
$("#exampleInputEmail1").on("change", function(){
    if (!validateEmail("exampleInputEmail1")){
        alert("Wrong format for email address.");
        $("#exampleInputEmail1").val("");
        $("#exampleInputEmail1").attr("placeholder", "john.smith@uottawa.ca");
        $("#exampleInputEmail1").addClass("error");
    }
    else {
        $("#exampleInputEmail1").removeClass("error");
    }
});

// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/ 
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
// Make sure in your version that you associate Days to remove with Experts (e.g. John doesn't work Mondays)
var unavailableDatesLionel = ["06/29/2020","07/07/2020","07/20/2020"];
var unavailableDatesRonald = ["07/02/2020","07/03/2020","07/10/2020"];
const setDateFormat = "mm/dd/yy";

function disableDates(date) {
    if ($("#mechanics :selected").text() == "Lionel") {
        // Sunday is Day 0, disable all Sundays
        if (date.getDay() == 0 || date.getDay() == 6 || date.getDay() == 4 || date.getDay() == 5)
            return [false];
        var string = jQuery.datepicker.formatDate(setDateFormat, date);
        return [ unavailableDatesLionel.indexOf(string) == -1 ]
    } else {
        // Sunday is Day 0, disable all Sundays
        if (date.getDay() == 0 || date.getDay() == 6 || date.getDay() == 1 || date.getDay() == 2 || date.getDay() == 3)
            return [false];
        var string = jQuery.datepicker.formatDate(setDateFormat, date);
        return [ unavailableDatesRonald.indexOf(string) == -1 ]
    }
}

// To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery 
// You can try different themes (the names are under the calendars) / This is Excite Bike 
// To use a different theme you must include its css in your HTML file. 
// The one I included in my HTML is the Excite Bike, but you can try others

// Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/ 
// Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/ 

$( "#dateTimeInput" ).datepicker(
    {
        dateFormat: setDateFormat,
        // no calendar before June 22, 2020
        minDate: new Date('06/22/2020'),  
        maxDate: '+4M',
        // used to disable some dates
        beforeShowDay: $.datepicker.noWeekends,
        beforeShowDay: disableDates
    }
);