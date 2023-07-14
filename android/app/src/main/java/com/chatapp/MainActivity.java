import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; 

public class MainActivity extends ReactActivity {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ChatApp";
  }

  /**
   * Called during onCreate of the main activity to check if a splash screen should be displayed.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this); 
    super.onCreate(savedInstanceState);
  }

  /**
   * Returns the name of the bundle in the assets folder.
   * This is used to provide a custom splash screen.
   * Uncomment this method if you want to use a custom splash screen.
   */
  // @Override
  // protected String getBundleAssetName() {
  //   return "splashscreen.bundle";
  // }
}
