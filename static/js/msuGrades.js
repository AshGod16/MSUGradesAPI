const msuGrades = function(){
    jQuery('.hello').css('color', 'white');

    var code = "jQuery.ajax({\n" +
        "    url: 'https://msugradesapi.com/grades/CSE_325',\n" +
        "    method: 'GET',\n" +
        "    dataType: 'JSON',\n" +
        "    success: function (data) {\n" +
        "        console.log(data) // The data received from the api\n" +
        "    },\n" +
        "    error: function(xhr, status, error){\n" +
        "        console.log('error');\n" +
        "    }\n" +
        "});";

    jQuery('#ajaxrequest').html(code);  // Setting the html of the div

    var result = {"courses": [{"term": "SS20", "subject": "CSE", "code": 325, "title": "Computer Systems", "instructor": "MCCULLEN,MARK H", "total": 183, "average": 2.546448087, "four": 37, "threefive": 17, "three": 29, "twofive": 32, "two": 28, "onefive": 17, "one": 10, "zero": 13, "incomplete": 0, "withdrawn": 0, "passed": 0, "nograde": 0}, {"term": "FS19", "subject": "CSE", "code": 325, "title": "Computer Systems", "instructor": "MCCULLEN,MARK H", "total": 188, "average": 2.401595745, "four": 29, "threefive": 19, "three": 24, "twofive": 28, "two": 43, "onefive": 18, "one": 14, "zero": 13, "incomplete": 1, "withdrawn": 1, "passed": 0, "nograde": 0}]};

    jQuery('#results').html(JSON.stringify(result, null, 2));  // Setting the result example
};


function Interactive() {
    var gradeButton = jQuery('#getGrades');
    var that = this;

    var semesters = new Map(); // Creating the map to make ajax calls easier
    semesters.set("All", "");
    semesters.set('Fall', 'FS');
    semesters.set('Spring', 'SS');
    semesters.set('Summer', 'US');

    var years = new Map(); // Creating a map of years
    years.set("All", "");
    for(var i = 2011; i <= 2020; i ++ ){
        years.set(i, i.toString().slice(-2)); // Eg FS + 11
    };

    var semester_select = jQuery('#semesters');
    var str = "";
    for(const [key, value] of semesters.entries()){
        str += '<option>' + key + '</option>';  // Populating the selector
    }
    semester_select.html(str);

    var year_select = jQuery('#years');
    str = "";
    for(const [key, value] of years.entries()){
        str += '<option>' + key + '</option>';  // Populating the selector
    }
    year_select.html(str);

    that.installListener(gradeButton, years, semesters);  // Installing listener on the submit button

}

Interactive.prototype.installListener = function(gradeButton, years, semesters){
    var that = this;
    gradeButton.click(function (event) { // Click event
        event.preventDefault();
        that.communicate(years, semesters);  // Make ajax call through this function
    });
};

Interactive.prototype.communicate = function (years, semesters) {

    var that = this;

    var course = jQuery('#courseName').val();
    var courseNumber = jQuery('#courseNumber').val();
    var semester = jQuery('#semesters').val();
    var year = jQuery('#years').val();  // Gather all the data from the input fields

    // var link = 'https://msu-grades-api.herokuapp.com/grades/';  // The initial link

    // var link = 'http://127.0.0.1:5000/grades/';

    var link = 'http://3.14.6.168/grades/';

    if(course === "" || courseNumber === ""){
        jQuery('#errormsg').html("Do not leave the Course Name or Course Number field blank.").fadeIn(1000).fadeOut(3000);
    }
    // Rules for constructing the API call
    else if(semester === 'All'){
        link += course +'_' + courseNumber;
    }
    else{
        if(year === 'All'){
            jQuery('#errormsg').html("Incorrect combination of semester and year.").fadeIn(1000).fadeOut(1000);
        }
        else {
            link += course + '_' + courseNumber + '_' + semesters.get(semester)+years.get(Number(year));
        }
    }

    var code = "jQuery.ajax({\n" +
        "    url: " + link + ",\n" +
        "    method: 'GET',\n" +
        "    dataType: 'JSON',\n" +
        "    success: function (data) {\n" +
        "        console.log(data) // The data received from the api\n" +
        "    },\n" +
        "    error: function(xhr, status, error){\n" +
        "        console.log('error');\n" +
        "    }\n" +
        "});";  // Ajax call to show users

    // Make ajax call here
    jQuery.ajax({
        url: link,
        method: "GET",
        dataType: 'JSON',
        success: function (data) {

            // Displaying the data in the respective divs
            jQuery('#url').html('<strong style="color: #205c4e; font-size: 1.15em !important;">URL: </strong>\n\n'+ link);
            jQuery('#ajaxcall').html('<strong style="color: #205c4e; font-size: 1.15em !important;">Ajax call for above request: </strong>\n\n' + code);
            jQuery('#apiresults').html('<strong style="color: #205c4e; font-size: 1.15em !important;">Result from API:</strong> \n\n' + JSON.stringify(data, null, 2));
        },
        error: function(xhr, status, error){

            // Error message
            jQuery('#apiresults').html("Course not found. \n Please check your input again. Remember to include only the class name(MTH, EC, CSE, etc.) in the Course Name field. \n \
            Also note that the entered year might not exist for the given class. \n For example, CSE 325 has only been taught in 2019 and 2020. Double-check that you entered the year correctly.");
        }
    });
};