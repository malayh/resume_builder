# Testing some shit

data = {
    "username": "Malay Hazarika",
    "title": "SDE 1",
    "jobprofile": "Fullstack Developer",
    "profilesummary": None,
    "subsections": [
        {
            "title": "Projects",
            "id": 66,
            "position": 2,
            "skills": [],
            "contacts": [],
            "educations": [],
            "projects": [
                {
                    "template_prop": None,
                    "map_id": 17,
                    "id": 4,
                    "title": "Shopify Crawler",
                    "story": "- Many people use shopify as their host and CMS\n- Shopify hosts most thier sites behind only a handful public IP. Meaning most of the domains are mapped to a range of IPs and they redirect\ntraffic based on the domain name.\n- So I collected IP addresses of a few such domains that I know was using shopify as CMS, and I found only a few IP addresses for about 50 sites.\n- I made a guess of range of IP from that, of about a 1000 IP addresses.\n- Then I took a reverse dns look up site. Wrote a simple API for it to get reverse dns lookup data. \nUnfortunatly that site had a limit on number of consecutive requests, which was only about 10. So I used a bunch of free proxies and successfully queried all\nthe IPs that I guessed.\n- Most of the IPs had nothing mapped to them. But I got lucky. Just 5 of them had total of about 300 thousand domain mapped to them. It was crazy.\n- Now I have 300k domains which are probably e-commerse sites.\n\n- Now I need to find: a) Which of these sites are functional b) How do I monitor them\n\n- Shopify CMS exposes an endpoint which if you call will return you all the product that it is selling in a nice json object.\n- If any site was not alive at the moment that endpoint doesnot work. So I just ran a script with proxies to filter out about 150k alive sites using Shopify\n\n- How do I monitor them?\n- That endpoint that sends products listed also sends the stock remaining of each product. So I can can take a snapshot of the stocks of products at some\ninterval and compare them to to see the sales happening.\n\n- I created a table for all the sites. And gave them an id.\n- For each site I created product table, with shop id and date as a suffix eg. products_56_02112020, 56 is shop id. Each such table contain product id, \nstock level,price, category, and desciption texts\n- And I run the snapshoot at different intervals and record the difference in stock levels in sales_56 table\n- I can keep snapshot of three dates and drop the other tables\n\n- How to take the snapshoot?\n- Fist I used some free proxies to send the requests and started launching hundreds of parallel request to the shopify servers. They filed a complaint of a DoS attack\nand the VPS was taken down by digital ocean\n- Later, I added a expensive proxy service. And DoSed them anyways. LOL\n- I kept the interval to be 7 days, and I reduced the rate to request to about few hundred request per minute\n\n- Query interface\n- see sales of products over last week, accross all the sites.\n- sort by highest sales\n- sort by most sold category of products\n- sort by best selling product in a category etc\n\n- It tracked about 27 million products and thier sales. The uses can look at these matrices and decide which product to sell online, how to price them\ncompetetively, which category of product to sell etc.\n- keywords:\n- Python, System design, data gathering, large scale web scraping, SQL, data modeling, web scraping, web crawling, multiprocessing\ndigitalocean vps, linux",
                    "keywords": "Python, System design, data gathering, large scale web scraping, SQL, data modeling, web scraping, web crawling, multiprocessing, digitalocean vps, linux"
                },
                {
                    "template_prop": None,
                    "map_id": 18,
                    "id": 13,
                    "title": "Personal Blog",
                    "story": "Build a blog from scratch using python in the backend and HTML/CSS/JS/Bootstrap in UI",
                    "keywords": "Python, Django, HTML, CSS, Bootstrap, Javascript, SQLite, SQL"
                }
            ],
            "xps": [],
            "projectsummaries": [
                {
                    "template_prop": "projectmap_17",
                    "map_id": 11,
                    "id": 16,
                    "project_fk": 4,
                    "summary": "Built large scale web scraping tool using Python\nto gather and index data from over 150k ecommerce\nsites that monitor sales of 27 Million\nproducts. This data is used to predict sales\npatterns to help build effective business strategies\nfor online retailer."
                },
                {
                    "template_prop": "projectmap_18",
                    "map_id": 12,
                    "id": 21,
                    "project_fk": 13,
                    "summary": "Used Django, HTML, CSS, JS, Bootstrap to create a blog with added CMS"
                }
            ]
        },
        {
            "title": "Work History",
            "id": 67,
            "position": 3,
            "skills": [],
            "contacts": [],
            "educations": [],
            "projects": [],
            "xps": [
                {
                    "template_prop": None,
                    "map_id": 21,
                    "id": 30,
                    "profile": "Freelance Developer",
                    "company": None,
                    "location": None,
                    "start_time": "2017-12-29",
                    "end_time": None,
                    "is_current": True
                },
                {
                    "template_prop": None,
                    "map_id": 22,
                    "id": 59,
                    "profile": "Software Engineer",
                    "company": "Subex",
                    "location": "Banglore,KA",
                    "start_time": "2019-06-30",
                    "end_time": "2020-10-31",
                    "is_current": False
                }
            ],
            "projectsummaries": [
                {
                    "template_prop": "xpmap_22",
                    "map_id": 14,
                    "id": 16,
                    "project_fk": 4,
                    "summary": "Built large scale web scraping tool using Python\nto gather and index data from over 150k ecommerce\nsites that monitor sales of 27 Million\nproducts. This data is used to predict sales\npatterns to help build effective business strategies\nfor online retailer."
                },
                {
                    "template_prop": "xpmap_22",
                    "map_id": 15,
                    "id": 18,
                    "project_fk": 4,
                    "summary": "Created multithreaded web crawler to catalogue product information across multiple shopping sites to mine product pricing and demand insights for an online retail seller."
                },
                {
                    "template_prop": "xpmap_21",
                    "map_id": 16,
                    "id": 16,
                    "project_fk": 4,
                    "summary": "Built large scale web scraping tool using Python\nto gather and index data from over 150k ecommerce\nsites that monitor sales of 27 Million\nproducts. This data is used to predict sales\npatterns to help build effective business strategies\nfor online retailer."
                },
                {
                    "template_prop": "xpmap_21",
                    "map_id": 17,
                    "id": 21,
                    "project_fk": 13,
                    "summary": "Used Django, HTML, CSS, JS, Bootstrap to create a blog with added CMS"
                }
            ]
        },
        {
            "title": "Education",
            "id": 68,
            "position": 4,
            "skills": [],
            "contacts": [],
            "educations": [
                {
                    "template_prop": None,
                    "map_id": 11,
                    "id": 22,
                    "degree": "B.Tech Computer Science",
                    "provider": "Dibrugarh University",
                    "start_time": "2015-07-30",
                    "end_time": "2019-06-26",
                    "is_current": False
                }
            ],
            "projects": [],
            "xps": [],
            "projectsummaries": []
        },
        {
            "title": "Portfolio",
            "id": 63,
            "position": 102,
            "skills": [],
            "contacts": [
                {
                    "template_prop": "glob_icon",
                    "map_id": 44,
                    "id": 21,
                    "label": "Website",
                    "value": "thehazarika.com"
                },
                {
                    "template_prop": "github_icon",
                    "map_id": 45,
                    "id": 17,
                    "label": "Github",
                    "value": "github.com/malayh"
                }
            ],
            "educations": [],
            "projects": [],
            "xps": [],
            "projectsummaries": []
        },
        {
            "title": "Contacts",
            "id": 64,
            "position": 103,
            "skills": [],
            "contacts": [
                {
                    "template_prop": "phone_icon",
                    "map_id": 46,
                    "id": 20,
                    "label": "Phone",
                    "value": "+91 7896290374"
                },
                {
                    "template_prop": "mail_icon",
                    "map_id": 47,
                    "id": 24,
                    "label": "Email",
                    "value": "malay.hazarika@gmail.com"
                },
                {
                    "template_prop": "linkdin_icon",
                    "map_id": 48,
                    "id": 16,
                    "label": "LinkdIn",
                    "value": "linkedin.com/in/malay-hazarika/"
                }
            ],
            "educations": [],
            "projects": [],
            "xps": [],
            "projectsummaries": []
        },
        {
            "title": "Skills",
            "id": 65,
            "position": 104,
            "skills": [
                {
                    "template_prop": None,
                    "map_id": 22,
                    "id": 53,
                    "name": "Python",
                    "score": 95
                },
                {
                    "template_prop": None,
                    "map_id": 23,
                    "id": 57,
                    "name": "C++",
                    "score": 75
                },
                {
                    "template_prop": None,
                    "map_id": 24,
                    "id": 58,
                    "name": "Javascript",
                    "score": 60
                },
                {
                    "template_prop": None,
                    "map_id": 25,
                    "id": 60,
                    "name": "OO Design",
                    "score": 70
                },
                {
                    "template_prop": None,
                    "map_id": 26,
                    "id": 68,
                    "name": "ReactJS",
                    "score": 70
                },
                {
                    "template_prop": None,
                    "map_id": 27,
                    "id": 69,
                    "name": "Django",
                    "score": 100
                }
            ],
            "contacts": [],
            "educations": [],
            "projects": [],
            "xps": [],
            "projectsummaries": []
        }
    ]
}


from .zhong import TemplateZhong

if __name__ == "__main__":
    tz = TemplateZhong()
    tz.build_context(data)
    tz.render("/mnt/c/Code/resume_builder/jinjaout.pdf")
    