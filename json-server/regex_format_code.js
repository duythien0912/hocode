// https://regex101.com/r/n2J7tR/1

const regex = /<LOG::-Build Output>(.*)<DESCRIBE::>(.*)<IT::>(.*)<PASSED::>(.*)<COMPLETEDIN::>(.*)/gm;
const str = `<LOG::-Build Output>Dependencies:<:LF:><:LF:>junit:junit:4.12<:LF:>org.projectlombok:lombok:1.16.18<:LF:>org.mockito:mockito-core:2.7.19<:LF:>org.assertj:assertj-core:3.8.0<:LF:>org.xerial:sqlite-jdbc:3.19.3<:LF:><:LF:>Tasks:<:LF:><:LF:>To honour the JVM settings for this build a new JVM will be forked. Please consider using the daemon: https://docs.gradle.org/5.4.1/userguide/gradle_daemon.html.<:LF:>Daemon will be stopped at the end of the build stopping after processing<:LF:>> Task :compileJava<:LF:>> Task :classes<:LF:>> Task :compileTestJava<:LF:>> Task :testClasses<:LF:><:LF:>> Task :test<:LF:><:LF:><:LF:><:LF:>BUILD<:LF:> SUCCESSFUL in 9s<:LF:>3 actionable tasks: 3 executed<:LF:>\\n<DESCRIBE::>Test Suite\\n<IT::>myTestFunction(TestFixture)\\n<PASSED::>Test Passed\\n<COMPLETEDIN::>\\n<COMPLETEDIN::>16ms\\n`;
const subst1 = `$1`;
const subst2 = `$2`;
const subst3 = `$3`;
const subst4 = `$4`;
const subst5 = `$5`;

// The substituted value will be contained in the result variable
const result1 = str.replace(regex, subst1);
const result2 = str.replace(regex, subst2);
const result3 = str.replace(regex, subst3);
const result4 = str.replace(regex, subst4);
const result5 = str.replace(regex, subst5);

console.log('Substitution result1: ', result1);
console.log('Substitution result2: ', result2);
console.log('Substitution result3: ', result3);
console.log('Substitution result4: ', result4);
console.log('Substitution result5: ', result5);
