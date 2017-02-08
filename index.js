for (var i = 0; i < localStorage.counter; i++) {
  console.log(localStorage.getItem("datePosted_" +  i));
}



const {
    dialog
} = require('electron').remote
var fs = require('fs');

function openFile() {
    dialog.showOpenDialog(function(fileNames) {
        // fileNames is an array that contains all the selected
        if (fileNames === undefined) {
            console.log("No file selected");
        } else {
            readFile(fileNames[0]);
        }
    });
}

function readFile(filepath) {
  var counter = 0;
    fs.readFile(filepath, 'utf-8', function(err, data) {
        if (err) {
            alert("An error ocurred reading the file :" + err.message);
            return;
        }

        $("#transactions").html(data);

        $("#ledgerBalance").html($("LEDGERBAL").find("BALAMT")[0].childNodes[0].nodeValue);
        $("#availableBalance").html($("AVAILBAL").find("BALAMT")[0].childNodes[0].nodeValue);

        $("STMTTRN").each(function() {
            var date = $(this).find("DTPOSTED")[0].childNodes[0].nodeValue;
            var amount = $(this).find("TRNAMT")[0].childNodes[0].nodeValue;
            var type = $(this).find("TRNTYPE")[0].childNodes[0].nodeValue;
            var name = $(this).find("NAME")[0].childNodes[0].nodeValue;
            var memo = $(this).find("MEMO")[0].childNodes[0].nodeValue;

            localStorage.setItem("datePosted_" + counter, moment(date.substring(0,8)).format('ll'));
            localStorage.setItem("amount_" + counter, amount);
            localStorage.setItem("type_" + counter, type);
            localStorage.setItem("name_" + counter, name);
            localStorage.setItem("memo_" + counter, memo);

            $("#transactions-body").append("<tr><td>" + moment(date.substring(0,8)).format('ll') +   "</td><td>" +   amount +   "</td><td>" +   type +   "</td><td>" +    name +    "</td><td>" +    memo +    "</td></tr>");

            counter++;



        });

        localStorage.setItem("counter", counter);




        // var parser, xmlDoc;
        //
        // parser = new DOMParser();
        // xmlDoc = parser.parseFromString(data, "text/xml");
        //
        // console.log(xmlDoc.getElementsByTagName("STMTTRN"));







    });
}
