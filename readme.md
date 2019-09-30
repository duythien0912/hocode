![alt text](https://github.com/duythien0912/hocode/blob/master/Design/Home%20-%202.png?raw=true)

## Link Web: 

https://hocode-11412.web.app/

## Link Server: 

https://hocode.appspot.com

## Link Server Chạy code test với junit4: 

http://34.70.250.155

Lưu ý: Chạy post tới http://34.70.250.155 với body có khi truy cập vào trang trên

code
```java
public class Solution {

 public Solution() {}

 public int testthing() {
  return 3;
 }

}
```

test
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

## Link GitHub: 

https://github.com/duythien0912/hocode

## Tuần 1 ( 13/9 - 19/9 ):
Lên plan kế hoạch lại:

https://docs.google.com/spreadsheets/d/15fLh8EV1-FEmtVXt-gmmS7Qgmgjk7qxVKV0NmrrfWTU/edit?usp=sharing

## Vẽ database:

https://drive.google.com/file/d/1bxAf-DkMB73kY1Pk1cd5VJl3A9Rh-nRl/view


## Thiết kế màng hình trang chủ, trang chọn bài, trang làm bài:
- Trong thư mục Design

## Khó khăn: 
- Chưa chắc chắn về database
- Plan chưa rõ ràng

## Tuần 2 ( 20/9 - 26/9 ) : 
- Làm trang danh sách course và trang danh sách task
