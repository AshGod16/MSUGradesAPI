const msuGrades = function(){
    console.log('here');
    jQuery('.hello').css('color', 'white');

    var code = "jQuery.ajax({\n" +
        "    url: 'https://msu-grades-api.herokuapp.com/grades/CSE_325',\n" +
        "    method: 'GET',\n" +
        "    dataType: 'JSON',\n" +
        "    success: function (data) {\n" +
        "        console.log(data) // The data received from the api\n" +
        "    },\n" +
        "    error: function(xhr, status, error){\n" +
        "        console.log('error');\n" +
        "    }\n" +
        "});";

    jQuery('#ajaxrequest').html(code);

    var result = {"courses": [{"term": "SS20", "subject": "CSE", "code": 325, "title": "Computer Systems", "instructor": "MCCULLEN,MARK H", "total": 183, "average": 2.546448087, "four": 37, "threefive": 17, "three": 29, "twofive": 32, "two": 28, "onefive": 17, "one": 10, "zero": 13, "incomplete": 0, "withdrawn": 0, "passed": 0, "nograde": 0}, {"term": "FS19", "subject": "CSE", "code": 325, "title": "Computer Systems", "instructor": "MCCULLEN,MARK H", "total": 188, "average": 2.401595745, "four": 29, "threefive": 19, "three": 24, "twofive": 28, "two": 43, "onefive": 18, "one": 14, "zero": 13, "incomplete": 1, "withdrawn": 1, "passed": 0, "nograde": 0}]};

    jQuery('#results').html(JSON.stringify(result, null, 2));
};


function Interactive() {
    var gradeButton = jQuery('#getGrades');

    var that = this;


    debugger;
    var semesters = new Map();
    semesters.set("All", "");
    semesters.set('Fall', 'FS');
    semesters.set('Spring', 'SS');
    semesters.set('Summer', 'US');
    // jQuery('#results').hide();

    var years = new Map();
    years.set("All", "");
    for(var i = 2011; i <= 2020; i ++ ){
        years.set(i, i.toString().slice(-2));
    };

    var semester_select = jQuery('#semesters');
    var str = "";
    for(const [key, value] of semesters.entries()){
        str += '<option>' + key + '</option>';
    }
    semester_select.html(str);

    var year_select = jQuery('#years');
    str = "";
    for(const [key, value] of years.entries()){
        str += '<option>' + key + '</option>';
    }
    year_select.html(str);

    that.installListener(gradeButton, years, semesters);

};

Interactive.prototype.installListener = function(gradeButton, years, semesters){
    var that = this;
    gradeButton.click(function (event) {
        event.preventDefault();
        console.log('Hello from Interactive');
        that.communicate(years, semesters);
    });
};

Interactive.prototype.communicate = function (years, semesters) {

    var that = this;

    var course = jQuery('#courseName').val();
    var courseNumber = jQuery('#courseNumber').val();
    var semester = jQuery('#semesters').val();
    var year = jQuery('#years').val();

    var link = 'https://msu-grades-api.herokuapp.com/grades/';
    // var input_list = [course, courseNumber, semesters[semester]+years[year]];

    if(semester === 'All'){
        link += course +'_' + courseNumber;
    }
    else{
        if(year === 'All'){
            jQuery('#errormsg').html("Incorrect combination of semester and year").fadeIn(500).fadeOut(500);
        }
        else {
            link += course + '_' + courseNumber + '_' + semesters.get(semester)+years.get(year);
        }
    }


    // https://cors-anywhere.herokuapp.com/
    // msu-grades-api.herokuapp.com

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
        "});";

    // Make ajax call here
    jQuery.ajax({
        url: link,
        method: "GET",
        dataType: 'JSON',
        success: function (data) {
            jQuery('#url').html("URL: "+ link);
            jQuery('#ajaxcall').html("Ajax call for above request: \n" + code);
            jQuery('#apiresults').html("Result from API: \n" + JSON.stringify(data, null, 2));
            console.log(data);
        },
        error: function(xhr, status, error){
            jQuery('#apiresults').html("Course not found. \n Please check your input again. Remember to include only the class name(MTH, EC, CSE, etc.) in the Course Name field. \n \
            Also note that the entered year might not exist for the given class. \n For example, CSE 325 has only been taught in 2019 and 2020. Double-check that you entered the year correctly.");
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