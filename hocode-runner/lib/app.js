const express = require('express')
const app = express()
const port = 8080
var run = require('./runner').run


app.get('/', (req, res) => {
    run({

        language: 'java',
        code: `
          package hello;

          import org.springframework.boot.autoconfigure.*;
          import org.springframework.stereotype.Controller;
          import org.springframework.web.bind.annotation.RequestMapping;
          import org.springframework.web.bind.annotation.ResponseBody;

          @Controller
          @EnableAutoConfiguration
          public class HomeController {

              @RequestMapping("/")
              public @ResponseBody String greeting() {
                  return "Hello World";
              }

          }`,
        setup: `
          // @config: reference spring-boot

          package hello;

          import org.springframework.boot.SpringApplication;
          import org.springframework.boot.autoconfigure.SpringBootApplication;

          @SpringBootApplication
          public class Application {

              public static void main(String[] args) {
                  SpringApplication.run(Application.class, args);
              }
          }
        `,
        fixture: `
          package hello;
          import static org.assertj.core.api.Assertions.assertThat;

          import org.junit.Test;
          import org.junit.runner.RunWith;
          import org.springframework.beans.factory.annotation.Autowired;
          import org.springframework.boot.test.context.SpringBootTest;
          import org.springframework.test.context.junit4.SpringRunner;

          @RunWith(SpringRunner.class)
          @SpringBootTest
          public class SmokeTest {

              @Autowired
              private HomeController controller;

              @Test
              public void contexLoads() throws Exception {                 
                  assertThat(controller).isNotNull();
              }
          }`
    }, function (buffer) {
        console.log(buffer.stdout);
        console.log(buffer.stderr);
        // expect(buffer.stdout).to.contain('<LOG::-Startup Logs>');
        // expect(buffer.stdout).to.contain('<PASSED::>Test Passed\n');
        // done();
        res.send(buffer.stdout);

    });
    // res.send('Got a POST request')

})

app.post('/', function (req, res) {
    res.send('Got a POST request')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))