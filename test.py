# https://github.com/JazzCore/python-pdfkit

import pdfkit
options = {
    'page-size':'A4',
    'margin-top': '0',
    'margin-right': '0',
    'margin-bottom': '0',
    'margin-left': '0',
    'encoding': "UTF-8",
    "enable-local-file-access": None
}


data = {
    "firstname": "Malay", "lastname":"Hazarika", "designation":"Software Engineer",
    "contacts":{
        "address":"Banglore,KA", "email":"malay.hazarika@gmail.com", "phone":"+91 7896290374", 
        "website":"thehazarika.com", "github": "github.com/malayh", "linkedin":"linkedin.com/in/malay-hazarika"
    },
    "skills":[
        {"label":"Python", "value":95}, {"label":"C++", "value":70}, {"label":"System Design/ OO Desing", "value":65},
        {"label":"SQL/ PL-SQL/ Data Modeling", "value":85}, {"label":"Django/ REST", "value":60},
        {"label":"Linux/ Bash", "value":80}, {"label":"Git", "value":75}
    ],
    "profile-summary": "I am a software developer experienced in designing and building software system with 2+ years of experience as independent freelance developer and 1.5 years of experience in a team environments in an MNC. I have builtworking systems from scratch and also helped create tools for already existing systems. My primary technical skills are Python, C++, System design and Data modelling.",
    "work-history":[
        {
            "timeframe":"Jan 2018 - Present", "job-profile":"Freelance Developer", "company":"Independent Freelancing",
            "achievements":[
                "Built large scale web scraping tool using Python to gather and index data from over 150k ecommerce sites that monitor sales of 27 Million products. This data is used to predict sales patterns to help build effective business strategies for online retailer.",
                "Build tool to monitor sales of competitor's site, and if a set products are found to be working, use the same marketing keywords at lower price to gain sales.",
                "Implemented automated pricing strategy that helps the user become the default seller of a product in an e-commerce platform."
            ] 
        },
        {
            "timeframe":"Jul 2019 - Oct 2020", "job-profile":"Software engineer", "company":"Subex", "location":"Banglore, KA",
            "achievements":[
                "Create data validation tool for bulk loading pipeline using Java/Regex",
                "Automated product deployment to cut setup time by above 50% using Linux shell.",
                "Created configuration automation tool to generate SQL migrations that cut down configuration time by almost 50%"
            ] 
        }
    ],
    "education":{
        "timeframe":"Aug 2015 - Jun 2019", "degree": "B.Tech. Computer Science"
    }
}
pdfkit.from_file('test.html', 'out.pdf', options=options)