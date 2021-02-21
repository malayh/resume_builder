
from .renderer import BaseRenderer
from typing import List, Dict
from datetime import datetime
import json


class TemplateZhong(BaseRenderer):
    def __init__(self):
        css = [
            # Hardcoding these for dev

            'zhong/bootstrap.min.css',
            'zhong/resume_base.css',
            'zhong/Zhong.css',
            'zhong/render.css'
        ]
        super(TemplateZhong,self).__init__('zhong/Zhong.jinja',css=css)

    def _parse_project_summaries(self, projectsummaries : List) -> Dict:
        """
        Project summaries are mapped to other mappings using template_props
        template_prop = <which type of mapping>_<mapping_id>. 
        Eg. projectmap_15 => map this project summary to a project mapping with map_id=15
        """
        _ret = {
            # "projectmap" : {
            #     "<map_id>" : ["summarues"]
            # }
        }
        for ps in projectsummaries:
            if not ps["template_prop"]:
                continue

            map_type, map_id = ps["template_prop"].split("_")
            if map_type not in _ret:
                _ret[map_type] = {}

            map_id = int(map_id)
            if map_id in _ret[map_type]:
                _ret[map_type][map_id].append(ps["summary"])
            else:
                 _ret[map_type][map_id] = [ps["summary"]]

        return _ret


    def _build_subsec_main(self, subsection: dict):
        """
        args: subsection : 
            keys: title(text), skills(list of skill obj), contacts(list of contact_detail obj), 
            educations(list of educations obj), projects(list of project object), xps(list of job_profile objs)
            projectsummaries(list of project summaries)

            Each such object will have a map_id prop and a template_prop prop

        returns: dict: title(text), labelled-descs(list of dict): each dict contains (label,sub-label,timeframe, and a list of descs)
        """
        _ret = {
            # "title": "",
            # "labelled-descs": [
            #     {
            #         "label": "",
            #         "sub-label":"",
            #         "timeframe":"",
            #         "descs": ["desc 1", "desc 2"]                
            #     }
            # ]
        }

        summaries = self._parse_project_summaries(subsection["projectsummaries"])
        _ret["title"] = subsection["title"]

        labelled_desc = []

        for project in subsection["projects"]:
            _d = {}
            _d["label"] = project["title"]
            if "projectmap" in summaries and project["map_id"] in summaries["projectmap"]:
                _d["descs"] = [i for i in summaries["projectmap"][project["map_id"]] ]
            labelled_desc.append(_d)

        for xp in subsection["xps"]:
            _d = {}
            _d["label"] = xp["profile"]

            if xp["company"]:
                _d["sub-label"] = xp["company"]
                if xp["location"]:
                    _d["sub-label"] += ", "+ xp["location"]

            start_time = datetime.strptime(xp["start_time"],'%Y-%m-%d').strftime('%b %Y') if xp["start_time"] else None
            end_time = datetime.strptime(xp["end_time"],'%Y-%m-%d').strftime('%b %Y') if xp["end_time"] else None
            if(xp["is_current"]):
                end_time = "Present"

            if start_time and end_time:
                _d["timeframe"] = start_time + " - " + end_time

            if "xpmap" in summaries and xp["map_id"] in summaries["xpmap"]:
                _d["descs"] = [i for i in summaries["xpmap"][xp["map_id"]] ]

            labelled_desc.append(_d)       

        for edu in subsection["educations"]:
            _d = {}
            _d["label"] = edu["degree"]
            if edu["provider"]:
                _d["sub-label"] = edu["provider"]

            start_time = datetime.strptime(edu["start_time"],'%Y-%m-%d').strftime('%b %Y') if edu["start_time"] else None
            end_time = datetime.strptime(edu["end_time"],'%Y-%m-%d').strftime('%b %Y') if edu["end_time"] else None
            if(edu["is_current"]):
                end_time = "Present"

            if start_time and end_time:
                _d["timeframe"] = start_time + " - " + end_time

            if "edumap" in summaries and edu["map_id"] in summaries["edumap"]:
                _d["descs"] = [i for i in summaries["edumap"][edu["map_id"]] ]

            labelled_desc.append(_d) 


        _ret["labelled-descs"] = labelled_desc

        return _ret


    def _buid_subsec_sidebar(self,subsection: dict):
        _ret = {
            # title:""
            # contacts : [
            #     {label:"", value:""}
            # ],
            # skills : [ "name "]
        }

        _ret["title"] = subsection["title"]
        contacts = []
        for i in subsection["contacts"]:
            _d = {}
            _d["label"] = i["label"]
            _d["value"] = i["value"]
            if i["template_prop"]:
                _d["label"] = i["template_prop"]
            contacts.append(_d)
        
        _ret["contacts"] = contacts
        
        skills = []
        for i in subsection["skills"]:
            skills.append(i["name"])

        _ret["skills"] = skills

        return _ret


    def build_context(self, data : dict):
        """
        override
        """
        self.update_context(username=data["username"], jobprofile=data["jobprofile"], profilesummary=data["profilesummary"])

        main_section = []
        sidebar = []
        for ss in data["subsections"]:
            if ss["position"] < 100:
                main_section.append(self._build_subsec_main(ss))
            else:
                sidebar.append(self._buid_subsec_sidebar(ss))

        self.update_context(main_section=main_section)
        self.update_context(sidebar=sidebar)
                

