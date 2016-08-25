/***** -- This object is considered a CORE member. You probably don't need to modify this. Read the doc. -- ******/
quizDefaults = {
    //The current question index. 
    questionIndex: 0, 
    //How many questions are in the JSON file? 
    howManyQuestionsAreThere: "",   
    //What's the correct answer for this question? 
    theCorrectAnswerForThisQuestion : "", 
    //What answer did the user pick? 
    theUsersResponse : null, 
    //How fast does the incorrect/correct response fade in? Accepts string: fast, string: slow, int: value.
    fadeDuration: "",  
    quizCompleted: false,
    //Creates a new question.
    initializeAQuestion: function (questionIndex) { 
        if(!quizDefaults.quizCompleted) { 
            $.getJSON("json/quiz.json", function(quizData) {
                //Sets the specific question. 
                $("#quiz-question").html(quizData.question[questionIndex].title); 
                //Makes the answers division empty in preparation for the answers. 
                $("#quiz-answers").html(""); 
                //Append the answers from the JSON file into the answers division.
                for(var i = 0; i < quizData.question[questionIndex].answers.length; i++) { 
                    $("#quiz-answers").append('<div class="answer-container" onclick="quiz.processUserResponse(' + i + ');">' +
                                              '<input id="answer_' + i + '" type="radio" name="foo" />' + 
                                              '<p>' + quizData.question[questionIndex].answers[i][i] + '</p></div><br />'); 
                }
                //Setting the value of the the question array to how many questions are there. 
                quizDefaults.howManyQuestionsAreThere = quizData.question.length;
                $("#quiz-counter").html("Question " + 
                                      (quiz.questionIndex+1) + 
                                      " of " + 
                                      quizDefaults.howManyQuestionsAreThere); 
                //Setting the correct answer for this question. 
                quiz.theCorrectAnswerForThisQuestion = quizData.question[questionIndex].correctAnswer;
                //Setting the correct response for this question. 
                $("#correct-response-text").html(quizData.question[questionIndex].correctResponse); 
                //Setting the incorrect response for this question. 
                $("#incorrect-response-text").html(quizData.question[questionIndex].incorrectResponse);
            });
        }
        else { 
            GSI.switchPage("end-of-training"); 
        }
    }, 
    //This function sets the user's response into the response property of the quiz object. 
    processUserResponse: function (response) { 
        quiz.theUsersResponse = response; 
        $("#answer_" + response).prop("checked", true); 
    }, 
    //This function determines what to do if the correct/incorrect response was made.
    solveTheQuestion: function () { 
        if(!quiz.isSubmitButtonDisabled){
            //If the user's response does not equal the correct answer
            quiz.theUsersResponse != quiz.theCorrectAnswerForThisQuestion ? 
            //Fade in the incorrect response
            (   
                $("#incorrect-response").fadeIn(quiz.fadeDuration),
                $("a.solve").toggleClass('solve-grey'),
                quiz.isSubmitButtonDisabled = true 
            )
            : //Otherwise
            (   //Fade in the correct response. 
                $("#correct-response").fadeIn(quiz.fadeDuration), 
                $("a.solve").toggleClass('solve-grey'), 
                quiz.isSubmitButtonDisabled = true
            )
        }
    }, 
    //This function goes to the next question. 
    goToTheNextQuestion : function () { 
        //If the quiz question index (plus 1) is less than the total number of questions
        (quiz.questionIndex+1) < quizDefaults.howManyQuestionsAreThere ? ( 
            //increment the question index, make a new question with the new index. 
            (quiz.questionIndex++), quiz.initializeAQuestion(quiz.questionIndex)
            //Otherwise, the quiz is complete. Switch to the end of training page. 
        ) : (complete(), quizDefaults.quizCompleted = true,  GSI.switchPage('end-of-training'));
    }, 
    //This function closes the correct/incorrect response division. 
    closeResponse: function () { 
        //If the incorrect response division is visible 
        $("#incorrect-response").is(':visible') ? (
            //Fade it out by the fadeDuration property of the quiz object. 
            $("#incorrect-response").fadeOut(quiz.fadeDuration), 
            quiz.isSubmitButtonDisabled = false, 
            $("a.solve").toggleClass("solve-grey")
        )
        : (//Otherwise
            //When the correct response has faded out wait half a second and go to the next question. 
            $.when($("#correct-response").fadeOut(quiz.fadeDuration)).then(setTimeout(function(){
                quiz.isSubmitButtonDisabled = false; 
                $("a.solve").toggleClass("solve-grey");
                quiz.goToTheNextQuestion();
            },500))
        ); 
    }
}
/***** -- This is the 'options' version of the quizDefaults object. You may modify this. -- ******/
var quizOptions = {
    fadeDuration: "fast",
    isSubmitButtonDisabled: false 
}
// This pushes quizDefaults and quizOptions into a new object called quiz. It does not modify quizDefaults.
var quiz = $.extend({}, quizDefaults, quizOptions); 