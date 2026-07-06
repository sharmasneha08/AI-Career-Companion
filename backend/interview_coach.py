def generate_questions(role):


    questions = {


        "data analyst":[

            "Explain your data analysis project",

            "How do you handle missing data?",

            "Difference between SQL JOIN types?"

        ],


        "software developer":[

            "Explain OOP concepts",

            "What is REST API?",

            "Explain your projects"

        ],


        "ml engineer":[

            "Explain machine learning workflow",

            "Difference between supervised and unsupervised learning",

            "How do you evaluate a model?"

        ]

    }



    return questions.get(

        role.lower(),

        [

            "Tell me about yourself",

            "Explain your strongest project",

            "What are your technical skills?"

        ]

    )





def evaluate_answer(answer):


    length = len(answer.split())



    if length > 50:

        score = 9

        feedback = "Good detailed answer with explanation"


    elif length > 20:

        score = 7

        feedback = "Good answer but add more examples"


    else:

        score = 5

        feedback = "Answer needs more explanation"



    return {


        "score":score,


        "feedback":feedback

    }