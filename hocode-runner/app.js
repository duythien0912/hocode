const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const port = 8080
var run = require('./lib/runner').run
const router = express.Router()

var code = `
public class Solution {
  public Solution(){}
  public int testthing(){return 3;}
}`;

var test = `
import static org.junit.Assert.assertEquals;
import org.junit.Test;
import org.junit.runners.JUnit4;
public class TestFixture {
    public TestFixture(){}
    @Test
    public void myTestFunction(){
        Solution s = new Solution();
        assertEquals("wow", 3, s.testthing());
}}`;

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));

})

router.post('/', function (req, res) {
    run({
        language: 'java',
        code: req.body.code,
        fixture: req.body.test,
    }, function (buffer) {
        res.json(buffer);
    });
})
// app.use(cookieParser())
app.use(bodyParser.json())

app.use(router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))