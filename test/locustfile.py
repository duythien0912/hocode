from locust import HttpLocust, TaskSet, task, between

class WebsiteTasks(TaskSet):    
    @task
    def index(self):
        self.client.get("/health_check")

class WebsiteUser(HttpLocust):
    task_set = WebsiteTasks
    host = "https://hocodevn.com/"
    wait_time = between(5, 15)

