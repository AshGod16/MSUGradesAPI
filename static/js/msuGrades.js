const msuGrades = function(){
    console.log('here');
    jQuery('.hello').css('color', 'white');

    var code = "jQuery.ajax({\n" +
        "    url: 'https://msu-grades-api.herokuapp.com/grades/CSE_325',\n" +
        "    method: 'GET',\n" +
        "    dataType: 'text',\n" +
        "    success: function (data) {\n" +
        "        console.log(data) // The data received from the api\n" +
        "    },\n" +
        "    error: function(xhr, status, error){\n" +
        "        console.log('error');\n" +
        "    }\n" +
        "});";

    console.log(typeof(code));

    debugger;
    jQuery('#ajaxrequest').html(code)//.val(code);

    var result = {"courses": [{"term": "SS20", "subject": "CSE", "code": 325, "title": "Computer Systems", "instructor": "MCCULLEN,MARK H", "total": 183, "average": 2.546448087, "four": 37, "threefive": 17, "three": 29, "twofive": 32, "two": 28, "onefive": 17, "one": 10, "zero": 13, "incomplete": 0, "withdrawn": 0, "passed": 0, "nograde": 0}, {"term": "FS19", "subject": "CSE", "code": 325, "title": "Computer Systems", "instructor": "MCCULLEN,MARK H", "total": 188, "average": 2.401595745, "four": 29, "threefive": 19, "three": 24, "twofive": 28, "two": 43, "onefive": 18, "one": 14, "zero": 13, "incomplete": 1, "withdrawn": 1, "passed": 0, "nograde": 0}]};

    jQuery('#results').html(JSON.stringify(result, null, 2));
    //jQuery()
};


function Interactive() {
    var gradeButton = jQuery('#getGrades');

    var that = this;
    that.installListener(gradeButton);
    // jQuery('#results').hide();

};

Interactive.prototype.installListener = function(gradeButton){
    var that = this;
    gradeButton.click(function (event) {
        event.preventDefault();
        console.log('Hello from Interactive');
        that.communicate();
    });
};

Interactive.prototype.communicate = function () {

    var that = this;
    var course = jQuery('#courseName').val();
    var courseNumber = jQuery('#courseNumber').val();
    var link = 'https://msu-grades-api.herokuapp.com/grades/' + course +'_' + courseNumber;
    // https://cors-anywhere.herokuapp.com/
    // msu-grades-api.herokuapp.com

    console.log('here');
    // Make ajax call here
    jQuery.ajax({
        url: link,
        method: "GET",
        dataType: 'JSON',
        success: function (data) {
            // debugger;
            jQuery('#apiresults').html(JSON.stringify(data));
            console.log(data);
        },
        error: function(xhr, status, error){
            console.log('error');
        }
    });
    console.log('here');
};

const parse_json = function(json) {
    try {
        var data = JSON.parse(json);
    } catch(err) {
        throw "JSON parse error: " + json;
    }

    return data;
}