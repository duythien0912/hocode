const str = `Dependencies:<:LF:><:LF:>junit:junit:4.12<:LF:>org.projectlombok:lombok:1.16.18<:LF:>org.mockito:mockito-core:2.7.19<:LF:>org.assertj:assertj-core:3.8.0<:LF:>org.xerial:sqlite-jdbc:3.19.3<:LF:><:LF:>Tasks:<:LF:><:LF:>To honour the JVM settings for this build a new JVM will be forked. Please consider using the daemon: https://docs.gradle.org/5.4.1/userguide/gradle_daemon.html.<:LF:>Daemon will be stopped at the end of the build stopping after processing<:LF:>> Task :compileJava<:LF:>> Task :classes<:LF:>> Task :compileTestJava<:LF:>> Task :testClasses<:LF:><:LF:>> Task :test<:LF:><:LF:><:LF:><:LF:>BUILD<:LF:> SUCCESSFUL in 9s<:LF:>3 actionable tasks: 3 executed<:LF:>\n`;

const fms = str.replace(/<:LF:>/gm, "\n");

console.log(fms);