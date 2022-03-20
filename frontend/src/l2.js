import { useEffect, useState } from "react";

export default function Lesson2 () {
    const [quiz, setquiz] = useState({"status": "success", "quiz": [{"id": "5", "question": "Have a writing assignment graded by a computer", "dataset":
    ["examples of graded writing assignments", "past links you've clicked on in Google", "examples of websites that are safeand unsafe", "examples of how people misspell words", "how long it historically takes to get from point A to B"],
    "prediction": ["the grade a new assignment deserves", "which search results you\u2019d want to see first", "new websites that are safe and unsafe", "the word you\u2019re trying to spell", "the shortest commute from point A to B"], "correct":
    {"dataset": "examples of graded writing assignments", "prediction": "the grade a new assignment deserves"}}, {"id": "6",
    "question": "Use 'safe search' on Google", "dataset": ["examples of websites that are safe and unsafe", "transcribed  audio of people talking", "examples of graded writing assignments", "what each emoji could mean", "how long it historically takes to get from point A to B"], "prediction": ["new websites that are safe and unsafe", "transcription ofyour audio message", "the grade a new assignment deserves", "the best emoji to replace what you've texted", "the shortest commute from point A to B"], "correct": {"dataset": "examples of websites that are safe and unsafe",
    "prediction": "new websites that are safe and unsafe"}}, {"id": "7", "question": "Get a suggested email response on  Gmail", "dataset": ["people's responses from past email exchanges", "past links you've clicked on in Google", "examples of websites that are safe and unsafe", "past songs that you've listened to"], "prediction": ["a response you might give  to a new email", "which search results you\u2019d want to see first", "new websites that are safe and unsafe", "new songs you may like"], "correct": {"dataset": "people's responses from past email exchanges", "prediction": "a response you might give to a new email"}}, {"id": "11", "question": "Listen to a recommended song on Spotify", "dataset": ["past songs that you've listened to", "what the weather was like in the past", "people's responses from past email exchanges",
    "what each emoji could mean", "images of your face"], "prediction": ["new songs you may like", "what the weather will be like in the future", "a response you might give to a new email", "the best emoji to replace what you've texted",
    "whether a face is yours"], "correct": {"dataset": "past songs that you've listened to", "prediction": "new songs you may like"}}, {"id": "13", "question": "Use a map app to find a path to a destination", "dataset": ["how long it  historically takes to get from point A to B", "examples of graded writing assignments", "what each emoji could mean",
    "past songs that you've listened to", "images of your face"], "prediction": ["the shortest commute from point A to B",
    "the grade a new assignment deserves", "the best emoji to replace what you've texted", "new songs you may like",
    "whether a face is yours"], "correct": {"dataset": "how long it historically takes to get from point A to B",
    "prediction": "the shortest commute from point A to B"}}], "ids": [6, 5, 11, 7, 13]})

    const _getQuiz = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "action": "getquiz"
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://us-central1-aiot-fit-xlab.cloudfunctions.net/learnai", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        _getQuiz();
    }, [])
    return(
        <div className="px-20">
            <div className="text-xl font-bold">Quiz</div>
            {quiz.quiz.map((item)=>(<div className="w-15"><div className="font-bold">{item.id}. {item.question} </div>
            <div>What dataset would you use to accomplish this?</div>
            {item.dataset.map((doption)=>(<div class="form-control w-15">
                <label class="label cursor-pointer">
                <input type="radio" name="radio-6" class="radio checked:bg-red-500" checked></input>
                    <span class="label-text">{doption}</span> 
                </label>
            </div>))}
            <div>What would it predict?</div>
            {item.prediction.map((poption)=>(<div class="form-control w-15">
                <label class="label cursor-pointer">
                <input type="radio" name="radio-6" class="radio checked:bg-red-500" checked></input>
                    <span class="label-text">{poption}</span> 
                </label>
            </div>))}
            </div>))}
        </div>
    )
}