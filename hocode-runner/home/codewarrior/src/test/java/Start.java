
    import org.junit.runner.JUnitCore;
    import org.junit.Test;
    

    public class Start {
        @Test
        public void start(){
            JUnitCore runner = new JUnitCore();
            runner.addListener(new CwRunListener());
            runner.run(TestFixture.class);

        }
    }
  