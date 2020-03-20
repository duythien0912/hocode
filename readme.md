
![alt text](https://github.com/duythien0912/hocode/blob/master/Design/Home%20-%202.png?raw=true)

## Video Demo:
https://www.youtube.com/watch?v=KbNG9_9nBGU&feature=youtu.be

## Link Web: 

https://hocode-11412.web.app/ (dead)

## Link Server: 

https://hocode.appspot.com (dead)

## Link Server Chạy code test với junit4: 

https://hocodevn.com/runner (dead)

Lưu ý: Chạy post tới https://hocodevn.com/runner với body có khi truy cập vào trang trên

Body ở trên tương đương với code dưới đây

code file
```java
public class Solution {

    public Solution() {}

    public int testthing() {
        return 3;
    }

}
```

test file
```java
import static org.junit.Assert.assertEquals;
import org.junit.Test;
import org.junit.runners.JUnit4;

public class TestFixture {

    public TestFixture() {}

    @Test
    public void myTestFunction() {
        Solution s = new Solution();
        assertEquals("wow", 3, s.testthing());
    }
}
```

Format trả về

```json
{
    "stdout": "<LOG::-Build Output>Dependencies:<:LF:><:LF:>junit:junit:4.12<:LF:>org.projectlombok:lombok:1.16.18<:LF:>org.mockito:mockito-core:2.7.19<:LF:>org.assertj:assertj-core:3.8.0<:LF:>org.xerial:sqlite-jdbc:3.19.3<:LF:><:LF:>Tasks:<:LF:><:LF:>To honour the JVM settings for this build a new JVM will be forked. Please consider using the daemon: https://docs.gradle.org/5.4.1/userguide/gradle_daemon.html.<:LF:>Daemon will be stopped at the end of the build stopping after processing<:LF:>> Task :compileJava<:LF:>> Task :classes<:LF:>> Task :compileTestJava UP-TO-DATE<:LF:>> Task :testClasses<:LF:><:LF:>> Task :test<:LF:><:LF:><:LF:><:LF:>BUILD<:LF:> SUCCESSFUL in 11s<:LF:>3 actionable tasks: 2 executed, 1 up-to-date<:LF:>\n<DESCRIBE::>Test Suite\n<IT::>myTestFunction(TestFixture)\n<PASSED::>Test Passed\n<COMPLETEDIN::>\n<COMPLETEDIN::>34ms\n",
    "stderr": "",
    "exitCode": 0,
    "exitSignal": null,
    "wallTime": 11911,
    "outputType": "pre"
}
```

stdout:
```
<LOG::-Build Output>Dependencies:<:LF:><:LF:>junit:junit:4.12<:LF:>org.projectlombok:lombok:1.16.18<:LF:>org.mockito:mockito-core:2.7.19<:LF:>org.assertj:assertj-core:3.8.0<:LF:>org.xerial:sqlite-jdbc:3.19.3<:LF:><:LF:>Tasks:<:LF:><:LF:>To honour the JVM settings for this build a new JVM will be forked. Please consider using the daemon: https://docs.gradle.org/5.4.1/userguide/gradle_daemon.html.<:LF:>Daemon will be stopped at the end of the build stopping after processing<:LF:>> Task :compileJava<:LF:>> Task :classes<:LF:>> Task :compileTestJava UP-TO-DATE<:LF:>> Task :testClasses<:LF:><:LF:>> Task :test<:LF:><:LF:><:LF:><:LF:>BUILD<:LF:> SUCCESSFUL in 11s<:LF:>3 actionable tasks: 2 executed, 1 up-to-date<:LF:>
<DESCRIBE::>Test Suite
<IT::>myTestFunction(TestFixture)
<PASSED::>Test Passed
<COMPLETEDIN::>
<COMPLETEDIN::>34ms
```

## Ví Dụ:
API Cộng 2 số

body:
```json
{
  "code": "public class Solution {\n public Solution() {}\n public int conghaiso(int x,int y) { return x+y; }\n }",
  "test": "import static org.junit.Assert.assertEquals;\nimport org.junit.Test;\nimport org.junit.runners.JUnit4;\npublic class TestFixture {\npublic TestFixture() {}\n@Test\npublic void myTestFunction() {\nSolution s = new Solution();\nassertEquals(\"sum 4\", 4, s.conghaiso(2,2));\nassertEquals(\"sum 3\", 3, s.conghaiso(1,2));\n}\n}"
}
```

code:
```java
public class Solution {
    public Solution() {}
    public int conghaiso(int x,int y) { return x+y; }
}
```

test:
```java
import static org.junit.Assert.assertEquals;
import org.junit.Test;
import org.junit.runners.JUnit4;

public class TestFixture {
    public TestFixture() {}
    @Test
    public void myTestFunction() {
        Solution s = new Solution();
        assertEquals("conghaiso 2,2", 4, s.conghaiso(2, 2));
        assertEquals("conghaiso 1,2", 3, s.conghaiso(1, 2));
        assertEquals("conghaiso 100,101", 201, s.conghaiso(100, 101));
    }
}
```

## Link GitHub: 

https://github.com/duythien0912/hocode

## Tuần 1 ( 13/9 - 19/9 ):
Lên plan kế hoạch lại:

https://docs.google.com/spreadsheets/d/15fLh8EV1-FEmtVXt-gmmS7Qgmgjk7qxVKV0NmrrfWTU/edit?usp=sharing

## Vẽ database:

https://drive.google.com/file/d/1bxAf-DkMB73kY1Pk1cd5VJl3A9Rh-nRl/view


## Thiết kế màng hình trang chủ, trang chọn bài, trang làm bài:
- Trong thư mục Design
