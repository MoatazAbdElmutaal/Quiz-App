let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets")
let bulletContainer =  document.querySelector(".spans");
let answerArea = document.querySelector(".answers-area");
let qustionArea = document.querySelector(".quiz-area");
let QuIndex = 0;
let submit = document.querySelector(".submit-btn")
let rightAnswers = 0;
let theResultContainer =document.querySelector(".result");
let countDownSeconds = document.querySelector(".count-down .seconds");
let Clearer;
let type = document.querySelector(`#sel`);



type.addEventListener(`change`,function(){
    location.reload();
})
getQustions();

function getQustions(){
    fetch(`${type.value}.json`).then(function(result){

         data = result.json()

        return data

    }).then((data)=>{
            data = shuffle(data)
        let quetionsCount = data.length;


        createBullets(quetionsCount);


        addQustions(data[QuIndex]);

        submit.onclick = function(){
           
            let theRightAnswer = data[QuIndex].right_answer;
            checkAnswer(theRightAnswer,quetionsCount)

            if(QuIndex >= quetionsCount -1){
                result(quetionsCount)
            }
            else{
                
            QuIndex++;
            qustionArea.innerHTML="";
            answerArea.innerHTML="";
          
            document.querySelectorAll(".spans span").forEach((span,index)=>{
                if(index == QuIndex){
                    span.classList.add("on")
                }
            })
            clearInterval(Clearer);
            addQustions(data[QuIndex]);
            }
        }
    })
}

function addQustions(obj){

        // create addQustion and add them to the addQustion div
    countDown();
 
    let quetionBody = document.createElement("h3");
     let quetionBodyNode = document.createTextNode(`${QuIndex+1}-  ${obj.title}`)
     quetionBody.appendChild(quetionBodyNode)
    qustionArea.appendChild(quetionBody);
        // arrOfQuToResult.push(quetionBody);
    // to shuffle answers 
    arrOfAnswers =[];
    // create answers and add them to the answer div
   for(let i =1; i<5;i++){
    let answer = document.createElement("div");

    answer.className="answer";
    let input = document.createElement("input");
    input.type="radio";
    input.id=`answer${i}`;
    input.name=`question`;
    input.dataset.answer = obj[`answer_${i}`]
    // arrOfRadioToResult.push(input)
    

    label= document.createElement("label");
    label.setAttribute(`for`,`answer${i}`)
    labelNode = document.createTextNode(obj[`answer_${i}`])
    label.appendChild(labelNode)
    answer.appendChild(input)
    answer.appendChild(label)
    arrOfAnswers.push(answer);
    
    // answerArea.appendChild(answer)
    arrOfAnswers = shuffle(arrOfAnswers);
   }
//    console.log(arrOfRadioToResult)

   for(let i = 0; i<arrOfAnswers.length;i++){
    if(i == 1){
        mustCheck = document.querySelector(".answer input");
        mustCheck.checked = true;
        }
        answerArea.appendChild(arrOfAnswers[i])
   }
}


// function ShowRightWrongAnswers(arrOfQuToResult){
//     let quizApp = document.querySelector(`.quiz-app`);

//     for(let i=0;i<arrOfQuToResult.length;i++){  
//         let quizArea = document.createElement("div");
//         quizArea.className = "quiz-area";
//         let quetionBody = document.createElement("h2");
//         let quetionBodyNode = document.createTextNode(arrOfQuToResult[i].textContent)
//         quetionBody.appendChild(quetionBodyNode)
//         quizArea.appendChild(quetionBody);
//        quizApp.appendChild(quizArea);

  
//     }
//    for(let i = 0; i<arrOfLabelToResult.length;i++){

// }
// let AnswersArea = document.createElement("div");
// AnswersArea.className = "answers-area";

//  for(let i =0; i<4;i++){
//     let answer = document.createElement("div");
//     answer.className="answer";
   
//     let input = document.createElement("input");
//     input.type="radio";
//     input.id=arrOfRadioToResult[i].id;
//     input.name=`question`;
//     input.dataset.answer = arrOfRadioToResult[i].dataset.answer;
//     if(i == 1){
//         mustCheck = document.querySelector(".answer input");
//         mustCheck.checked = true;
//         }
//    answer.appendChild(input);
//    AnswersArea.appendChild(answer);
//    quizApp.appendChild(AnswersArea);
//  }

// }


function createBullets(num){
countSpan.innerHTML = num;
for(let i =0;i<num;i++){

    let bullet = document.createElement("span");

    if(i == 0){
        bullet.className="on";
    }
    bulletContainer.appendChild(bullet)
}
}

function shuffle(array){
    let current = array.length,temp,random;
    while(current > 0){

        random = Math.floor(Math.random()*current);

        current--;

        temp = array[current]

        array[current] = array[random]

        array[random] = temp

    }
    return array;
}

function checkAnswer(rAnswer,count){
        let answers = document.getElementsByName("question");
        let chosenAnswer;
        answers.forEach((answer)=>{

            if(answer.checked == true){
                chosenAnswer = answer.getAttribute("data-answer") ;
            }
        })
                if(chosenAnswer === rAnswer){
                    rightAnswers++;
                    console.log(rightAnswers)
                } 
}

function result(count){
    clearInterval(Clearer);
    let theResult;
    answerArea.remove()
    qustionArea.remove()
    submit.remove()
    bullets.remove()
    if(rightAnswers > (count / 2) && rightAnswers < count ){
        theResult=`${rightAnswers} من ${count} تقديرك هو <span class="good">جيد </span>`
    }
    else if(rightAnswers == count){
        theResult=`${rightAnswers} من ${count} تقديرك هو <span class="perfect">ممتاز </span>`
    }
    else{
        theResult=`${rightAnswers} من ${count} تقديرك هو <span class="bad">سئ </span>`
    }

    theResultContainer.innerHTML=(theResult);
    theResultContainer.style.padding=`20px 10px`;
    theResultContainer.style.margin=`20px 0px`;

}

function countDown(){
    let mins = document.querySelector(".min");
    mins.innerHTML=`:00`;
    countDownSeconds.innerHTML = 45;

    let number = parseInt(countDownSeconds.innerHTML);

   Clearer =  setInterval(()=>{
        if(number == 0){
            submit.click();
        }

        else{
     countDownSeconds.innerHTML = --number >= 10 ?  number : `0${number}`;
        }
    },1000)

}
