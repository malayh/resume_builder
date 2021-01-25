import pdfkit
from bs4 import BeautifulSoup as BS
import copy
from typing import List, Dict


data = {
    "firstname": "Malay", "lastname":"Hazarika", "designation":"Software Engineer",
    "contacts":{
        "Address":"Banglore,KA", "Email":"malay.hazarika@gmail.com", "Phone":"+91 7896290374", 
        "Website":"thehazarika.com", "Github": "github.com/malayh", "Linkedin":"linkedin.com/in/malay-hazarika"
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
    "education":[
       {"timeframe":"Aug 2015 - Jun 2019", "degree": "B.Tech. Computer Science", "university": "Dibrugarh University"}
    ]
}


class ResumeBuilder:
    def __init__(self,template, elements):
        self.template = BS(open(template,"r").read(),"html.parser")        
        self.repeat_items = self.parse_elements(BS(open(elements,"r").read(),"html.parser"))
        self.render_options = {
            'page-size':'A4',
            'margin-top': '0',
            'margin-right': '0',
            'margin-bottom': '0',
            'margin-left': '0',
            'encoding': "UTF-8",
            "enable-local-file-access": None
        }

    def parse_elements(self,elements):
        _elem = dict()
        keys_required = ["contacts","skills","contact-item","skill-bar-item","content-item","content-header-item"]

        for id in keys_required:
            div = elements.find("div",attrs={"id":id})
            del div.attrs["id"]
            _elem[id] = div

        return _elem

    def build_resume(self):
        pass

    def add_name(self,firstname, lastname, designation):
        fname = self.template.find("div",attrs={"id":"firstname"})
        fname.clear()
        fname.append(firstname)
        
        lname = self.template.find("div",attrs={"id":"lastname"})
        lname.clear()
        lname.append(lastname)

        d = self.template.find("div",attrs={"id":"designation"})
        d.clear()
        d.append(designation)

    def add_contact_section(self,info: dict):
        """
        :param: info , key, value pairs, where keys are labels for contact info
        """
        if not info:
            return
        
        contact_section = copy.copy(self.repeat_items["contacts"])
        for label, value in info.items():
            ci = copy.copy(self.repeat_items["contact-item"])

            x = ci.find("div",attrs={"class":"sidebar-section-label"})
            x.clear()
            x.append(label)

            x = ci.find("div",attrs={"class":"sidebar-section-value"})
            x.clear()
            x.append(value)

            contact_section.append(ci)
        
        place = self.template.find("div",{"id":contact_section.attrs["section_id"]})
        place.append(contact_section)  

    def add_skill_section(self, info: List[Dict]):
        """
        :param: info: list of "lable","value" pairs
        """
        if not info:
            return
        skills_section = copy.copy(self.repeat_items["skills"])
        for i in info:
            si = copy.copy(self.repeat_items["skill-bar-item"])
            si_l = si.find("div",attrs={"class":"sidebar-section-value"})
            si_l.clear()
            si_l.append(i["label"])

            si_skillbar = si.find("div",attrs={"class":"skill-bar"})
            if si_skillbar:
                si_skillbar.div.attrs["style"] = f"width: {i['value']}%;"

            skills_section.append(si)

        place = self.template.find("div",{"id":skills_section.attrs["section_id"]})
        place.append(skills_section)  

    def add_profile_summary(self,summary):
        ps = self.template.find("div",{"id":"profile-summary"})
        ps.clear()
        ps.append(summary)

    def add_work_history(self,info : List[Dict]):
        section_heading = copy.copy(self.repeat_items["content-header-item"])
        section_heading.clear()
        section_heading.append("Work History")

        place = self.template.find("div",{"id":section_heading.attrs["section_id"]})
        place.append(section_heading)    

        for i in info:
            work_history = copy.copy(self.repeat_items["content-item"])            
            work_history = work_history.find("div",attrs={"class":"content-details"})
            tf = work_history.find("div",attrs={"class":"timeframe"})
            tf.clear()
            tf.append(i["timeframe"])

            jp = work_history.find("div",attrs={"class":"job-profile"})
            jp.clear()
            jp.append(i["job-profile"])

            jc = work_history.find("div",attrs={"class":"job-company"})
            jc.clear()
            jc.append(i["company"])

            bullet = work_history.find("ul",attrs={"class":"job-bullet"})
            bullet.clear()
            for ach in i["achievements"]:
                bullet.append(BS(f"<li>{ach}</li><br>"))

            place.append(work_history)

        with open("x.html","w") as f:
            f.write(self.template.prettify())


    def add_education(self, info:List[Dict]):
        section_heading = copy.copy(self.repeat_items["content-header-item"])
        section_heading.clear()
        section_heading.append("Education")

        place = self.template.find("div",{"id":section_heading.attrs["section_id"]})
        place.append(section_heading)

        for i in info:
            edu = copy.copy(self.repeat_items["content-item"])            
            edu = edu.find("div",attrs={"class":"content-details"})

            tf = edu.find("div",attrs={"class":"timeframe"})
            tf.clear()
            tf.append(i["timeframe"])

            degree = edu.find("div",attrs={"class":"job-profile"})
            degree.clear()
            degree.append(i["degree"])

            uni = edu.find("div",attrs={"class":"job-company"})
            uni.clear()
            uni.append(i["university"])

            place.append(edu)


    def render(self,out):
        pdfkit.from_string(str(self.template), out, options=self.render_options)
    


RB = ResumeBuilder("template.html","repeated.html")
RB.add_name("Hi","Hello","Someshit")
RB.add_contact_section({"Address":"Morigaon"})
RB.add_skill_section([{"label":"Eating Shit","value":80}])
RB.add_profile_summary("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
RB.add_work_history([{
            "timeframe":"Jan 2018 - Present", "job-profile":"Freelance Developer", "company":"Independent Freelancing",
            "achievements":[
                "Built large scale web scraping tool using Python to gather and index data from over 150k ecommerce sites that monitor sales of 27 Million products. This data is used to predict sales patterns to help build effective business strategies for online retailer.",
                "Build tool to monitor sales of competitor's site, and if a set products are found to be working, use the same marketing keywords at lower price to gain sales.",
                "Implemented automated pricing strategy that helps the user become the default seller of a product in an e-commerce platform."
            ] 
        }])

RB.add_education([{"timeframe":"Aug 2015 - Jun 2019", "degree": "B.Tech. Computer Science", "university": "Dibrugarh University"}])
RB.render("test_1.pdf")
