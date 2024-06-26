//Grading scale: https://www.guelphhumber.ca/registrar/grading
var gradingScale = [
    { grade: 'A+', min: 90, max: 100 },
    { grade: 'A', min: 85, max: 89 },
    { grade: 'A-', min: 80, max: 84 },
    { grade: 'B+', min: 77, max: 79 },
    { grade: 'B', min: 73, max: 76 },
    { grade: 'B-', min: 70, max: 72 },
    { grade: 'C+', min: 67, max: 69 },
    { grade: 'C', min: 63, max: 66 },
    { grade: 'C-', min: 60, max: 62 },
    { grade: 'D+', min: 57, max: 59 },
    { grade: 'D', min: 53, max: 56 },
    { grade: 'D-', min: 50, max: 52 },
    { grade: 'F', min: 0, max: 49 }
]

function getInputs(){
    stored = []
    
    while(true){

        var input = prompt("Enter course name, grade (c to cancel)")
        if(input == "c" || input == null){
            return stored;
        }else{
            input = input.split(',');
        }
        try{
            var num = parseFloat(input[1])
            if(!input[1]) throw new Error('this is error trigger')
            if(num<0 || num>100 || isNaN(num)) throw new Error('this is error trigger')
        }catch{
            alert('Please enter valid number betweeen the range of 0 and 100')
            continue;
        }
        stored.push({course: input[0], grade: num});
    }
}

function calculateGPA(){
    var element = document.getElementById("gpa-result");

    var inputs = getInputs();
    var totalGrade = 0;
    var totalCourses = 0;

    element.innerHTML = '<h2>RESULTS</h2><hr>';

    if(inputs.length == 0){
        element.innerHTML += "<p>No courses entered</p>";
    }
    else{
        for(var i = 0; i < inputs.length; i++){
            var grade = inputs[i].grade;
            var course = inputs[i].course;
            var gradeLetter = getGradeLetter(grade);
            var gradeValue = getGradeValue(gradeLetter);
            totalGrade += gradeValue;
            totalCourses++;
            element.innerHTML += "<p>" + course + ": " + gradeLetter + ' (' + grade + ')' + "</p>";

            if(inputs.length-1 == i){
                if(!isNaN(grade)){
                    element.innerHTML += "<hr>";
                    var gpa = totalGrade / totalCourses;
                    element.innerHTML += "<br><strong><p>GPA: " + gpa + "</p><strong>";
                    element.innerHTML += "<br>Grade Letter: " + getGradeLetter(gpa) + "<br>";
                    element.innerHTML += "<p>Total courses: " + totalCourses + "</p>";
                    element.innerHTML += "<p>Total grade: " + totalGrade + "</p>";
                }else{
                    if(confirm('No courses entered! Do you want to try again?') == true){
                        location.reload()
                    }
                }
            }
        }
    }

    
}

function getGradeLetter(grade){
    if(isNaN(grade)) return 'No courses entered!'
    for(var i = 0; i < gradingScale.length; i++){
        if(grade >= gradingScale[i].min && grade <= gradingScale[i].max){
            return gradingScale[i].grade;
        }
    }
}
function getGradeValue(gradeLetter){
    for(var i = 0; i < gradingScale.length; i++){
        if(gradeLetter == gradingScale[i].grade){
            return gradingScale[i].min;
        }
    }
}

calculateGPA();
