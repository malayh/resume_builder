
import os
from jinja2 import Template
import pdfkit

TEMPLATE_DIR = os.path.join(os.path.dirname(__file__),"templates")

class BaseRenderer:
    def __init__(self,path_to_template,css=[]):
        """
        :args: path to main template file
        :args: css : path to css files. Order is maintained.
        
        All paths are considered to be reletive to TEMPLARE_DIR
        """
        self.template = open(os.path.join(TEMPLATE_DIR,path_to_template),"r").read()
        self.context = {
            "css" : [os.path.join(TEMPLATE_DIR,i) for i in css]
        }

    def update_context(self,**kwargs):
        self.context.update(kwargs)

    def build_context(self, data):
        """
        data is an json returned by coreapi.views.RenderService.get
        Assuming subsections are sorted by position
        """
        raise NotImplementedError("Implement this in the template")

    def render(self,out_path):
        options = {
            'page-size':'A4',
            'margin-top': '0',
            'margin-right': '0',
            'margin-bottom': '0',
            'margin-left': '0',
            'encoding': "UTF-8",
            "enable-local-file-access": None
        }
        pdfkit.from_string(Template(self.template).render(self.context),out_path,options=options)
