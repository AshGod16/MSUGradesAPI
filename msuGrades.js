const msuGrades = function(){
    console.log('here');
    jQuery('.hello').css('color', 'white');

    jQuery()
};


function Interactive() {
    var gradeButton = jQuery('#getGrades');

    var that = this;
    that.installListener(gradeButton);

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

    course = course.split(' ');
    console.log(course);

    var link = 'http://127.0.0.1:5000/grades/' + course[0] +'_' + course[1];
    // msu-grades-api.herokuapp.com
    debugger;
    console.log('here');
    // Make ajax call here
    jQuery.ajax({
        url: link,
        method: "GET",
        dataType: 'text',
        success: function (data) {
            console.log(data)
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